import axios from 'axios';

// 개행문자 통일, 각 줄을 배열의 요소로 변환
const normalize = (markdown) => {
  return markdown
    .replace(/\r\n?/g, '\n')
    .replace(/\n{2,}/g, '\n\n')
    .split('\n');
};

const parse = (token, { regex, tagName, replace }) => {
  return token.replace(regex, replace ?? `<${tagName}>$1</${tagName}>`);
};

// 코드블럭 시작(```)
const codeBlockStart = {
  regex: /^\s*`{3}(.+)/,
  replace: '<pre><code>$1',
};

// 코드블럭 끝(```)
const codeBlockEnd = {
  regex: /(.*)`{3}\s*$/,
  replace: '$1</code></pre>',
};

// "-"로 시작하는 리스트
const unorderedListItem = {
  regex: /^\s*(-\s.+)$/,
  replace: '<p>$1</p>',
};

// "숫자. "으로 시작하는 리스트
const orderedListItem = {
  regex: /^\s*(\d+\.\s.+)$/,
  replace: '<p>$1</p>',
};

// 제목태그
const heading = {
  regex: /^\s*(#+)\s(.+)/,
  replace: (_, mark, group) => {
    const tagName = `h${mark.length + 1}`;
    // return `<${tagName} id="${group.replace(
    //   /(\*{2})|`/g,
    //   '',
    // )}">${group}</${tagName}>`;

    return `<${tagName}>${group}</${tagName}>`;
  },
};

// 이미지 제거
const figure = {
  regex: /^\s*!\[(.*)\]\((.+)\)/,
  replace: '',
};

// br태그
const lineBreak = {
  regex: /^<br\s*\/>$/,
  replace: '<br />',
};

// 콜아웃
const callout = {
  regex: /^\s*>+\s?(.+)/,
  tagName: 'p',
};

// 텍스트 p태그로 감싸기
const paragraph = {
  regex: /(?:^|\n)(.+)$/,
  tagName: 'p',
  replace: (matched, group) =>
    /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img|code)/.test(matched)
      ? matched
      : '<p>' + group + '</p>',
};

// 링크 제거
const link = {
  regex: /\[(.+?)\]\(.+?\)/g,
  replace: '$1',
};

// 볼드체
const strong = {
  regex: /\*{2}(.+?)\*{2}/g,
  replace: '$1',
};

// 인라인 코드(벡틱)
const code = {
  regex: /`(.+?)`/g,
  replace: '$1',
};

// 블럭 컨텐츠 규칙
const blockRules = [
  codeBlockStart,
  unorderedListItem,
  orderedListItem,
  heading,
  figure,
  lineBreak,
  callout,
];

// 인라인 컨텐츠 규칙
const inlineRules = [link, strong, code];

const parseMarkdown = (markdown) => {
  const tokens = normalize(markdown);
  let isEditor = false;
  let codeBlockStartIndex = -1;
  const listStack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // 코드블럭 내부가 아닌 경우
    if (codeBlockStartIndex === -1) {
      // 위에서 정의한 블럭 컨텐츠 규칙 적용
      const rule =
        blockRules.find(({ regex }) => regex.test(token)) ?? paragraph;
      tokens[i] = parse(token, rule);

      switch (rule) {
        case codeBlockStart:
          codeBlockStartIndex = i;
          const codeType = tokens[i].match(/<code>(.+)$/)?.[1];
          if (codeType === 'editor') {
            isEditor = true;
            tokens[i] = '';
          } else {
            tokens[i] = tokens[i].replace(codeType, '');
          }
          break;

        case unorderedListItem:
        case orderedListItem:
          tokens[i] = parse(token, rule);
          break;

        default:
          if (token.trim() === '') {
            if (listStack.length) {
              while (listStack.length) {
                tokens[i - 1] += listStack.pop();
              }
            }
            isEditor = false;
          }
      }
      // 코드블럭 내부인 경우
    } else {
      // 현재 줄이 빈줄일 경우 개행
      if (token.trim() === '') {
        tokens[i] = '\n\n';
      }
      // editor모드가 아닌 경우 "<>" 기호, 공백 유지
      if (!isEditor) {
        tokens[i] = token
          .replaceAll('<', '&#60;')
          .replaceAll('>', '&#62;')
          .replaceAll(' ', '&nbsp;');
      }
      // 코드블럭 종료될 때
      if (codeBlockEnd.regex.test(token)) {
        tokens[i] = parse(token, codeBlockEnd);
        codeBlockStartIndex = -1;
        isEditor = false;
      } else {
        tokens[i] += '\n';
      }
    }
  }

  // 위에서 정의한 인라인 컨텐츠 규칙 적용
  tokens.forEach((_, index) => {
    inlineRules.forEach((rule) => {
      if (rule.regex.test(tokens[index])) {
        tokens[index] = parse(tokens[index], rule);
      }
    });
  });

  // 빈 요소 일 경우 제거
  return tokens.filter(Boolean);
};

// 로컬의 md파일 가져오기. 이후에 경로 수정 필요
const oldfetchMarkdown = async () => {
  const response = await fetch('/data/python.md');
  const markdown = await response.text();

  return markdown;
};

const fetchMarkdown = async (query) => {
  try {
    const searchQuery = query;
    const response = await axios.get(`/api/search?keyword=${searchQuery}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const searchInMd = async (query, setSearchResults) => {
  try {
    const searchQuery = query;
    // const markdown = await oldfetchMarkdown();
    // const htmlContent = parseMarkdown(markdown);

    const markdown = await fetchMarkdown(query);
    const htmlContent = parseMarkdown(markdown.join());

    const processedResults = {};

    htmlContent.forEach((value, i) => {
      // 검색어와 일치하는지 확인 "i" => 대소문자 구분없이 확인
      if (value.match(new RegExp(searchQuery, 'i'))) {
        let currentDesc = '';
        let currentTitle = '';

        // p태그일 경우 내용으로 간주
        if (value.includes('<p>')) {
          currentDesc = value;

          // p태그 이전에 제목태그가 있을 경우 해당 태그를 제목으로 간주
          for (let j = i - 1; j >= 0; j--) {
            if (
              htmlContent[j].includes('h2') ||
              htmlContent[j].includes('h3') ||
              htmlContent[j].includes('h4')
            ) {
              currentTitle = htmlContent[j];
              break;
            }
          }
        } else if (
          value.includes('h2') ||
          value.includes('h3') ||
          value.includes('h4')
        ) {
          currentTitle = value;

          // 제목에 검색쿼리와 일치하는 결과물이 있을 때 하위 p태그를 설명으로 간주
          for (let j = i + 1; j < htmlContent.length; j++) {
            if (htmlContent[j].includes('<p>')) {
              currentDesc = htmlContent[j];
              break;
            }
          }
        }

        // 현재 제목 중 HTML 태그, 숫자와 점 제거
        currentTitle = currentTitle
          .replace(/<\/?[^>]+(>|$)/g, '')
          .replace(/^\d+(\.\d+)*\.\s*/, '');
        currentDesc = currentDesc.replace(/<\/?[^>]+(>|$)/g, '');

        if (currentTitle) {
          // currentTitle을 키로 하는 항목이 없다면 새로운 배열 할당
          if (!processedResults[currentTitle]) {
            processedResults[currentTitle] = [];
          }
          // 동일한 타이틀에 대한 중복설명이 저장되지 않도록 방지
          if (!processedResults[currentTitle].includes(currentDesc)) {
            processedResults[currentTitle].push(currentDesc);
          }
        }
      }
    });

    // 후에 각 결괏값에 적합하게 브래드크럼과 링크 변경 필요
    const finalResults = Object.entries(processedResults).map(
      ([title, contents]) => ({
        title,
        breadCrumb:
          '파이썬과 인사하기 > 파이썬과 파이썬을 만든 사람들 > 1. 파이썬',
        content: contents,
        link: '/',
      }),
    );
    setSearchResults(finalResults);
  } catch (error) {
    console.error(error);
  }
};
