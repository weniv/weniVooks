import { unified } from 'unified';
import fs from 'fs';

import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkBehead from 'remark-behead';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeTitleFigure from 'rehype-title-figure';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import rehypePrettyCode from 'rehype-pretty-code';

/**
 * 마크다운을 HTML로 변환
 * - HTML 태그(<br>)를 직접 사용하여 개행 처리 가능
 * - <color=#HEX>텍스트</color> 형식으로 텍스트 색상 지정 가능
 * - <toggle>제목::내용</toggle> 형식으로 토글(접기/펼치기) 기능 사용 가능
 */
function remarkBasePath() {
  return function(tree) {
    visit(tree, 'image', (node) => {
      if (node.url) {
        node.url = getFullImagePath(node.url);
      }
    });
  };
}

export const convertMarkdownToHtml = async (markdown) => {
  // 원본 마크다운 확인
  console.log("원본 마크다운:", markdown.slice(0, 500)); // 처음 500자만 표시

  // 변환 전에 ::img 패턴이 있는지 확인
  const imgMatches = markdown.match(/::img\{([^}]*)\}/g);
  console.log("::img 매칭 결과:", imgMatches);
  // Windows 줄바꿈을 표준화
  let normalizedMarkdown = markdown.replace(/\r\n/g, '\n');

  // <color=#HEX>텍스트</color> 태그를 <span style="color:#HEX">텍스트</span>으로 변환
  normalizedMarkdown = normalizedMarkdown.replace(
    /<color=(#[0-9A-Fa-f]{3,8})>(.*?)<\/color>/g,
    '<span style="color:$1">$2</span>',
  );

  // <toggle>제목::내용</toggle> 태그를 HTML details/summary 요소로 변환
  normalizedMarkdown = normalizedMarkdown.replace(
    /<toggle>(.*?)::([\s\S]*?)<\/toggle>/g,
    '<details class="custom-toggle"><summary class="toggle-summary">$1</summary><div class="toggle-content">$2</div></details>',
  );

  // ::img 지시문을 HTML <img> 태그로 직접 변환
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  normalizedMarkdown = normalizedMarkdown.replace(
    /::img\{([^}]*)\}/g,
    (match, attributes) => {
      console.log("매치된 ::img:", match);
      console.log("추출된 속성:", attributes);

      const width = attributes.match(/width="([^"]*)"/)?.[1] || '';
      const src = attributes.match(/src="([^"]*)"/)?.[1] || '';

      console.log("추출된 width:", width);
      console.log("추출된 src:", src);

      if (!src) return match;

      const fullSrc = getFullImagePath(src);
      console.log("변환된 src:", fullSrc);

      return `<img width="${width}" src="${fullSrc}" alt="" />`;
    },
  );

  const file = await unified()
    .use(remarkParse) // 마크다운을 파싱
    .use(remarkDirective) // 확장구문 사용
    .use(myRemarkPlugin)
    .use(remarkBasePath) // 이미지 경로 basePath 추가 플러그인
    .use(remarkGfm) // GFM 지원(자동링크 리터럴, 각주, 취소선, 표, 작업 목록)
    .use(remarkBehead, { minDepth: 4 })
    .use(remark2rehype, {
      allowDangerousHtml: true, // HTML 태그 허용
    }) // 파싱된 마크다운을 Rehype로 변환
    .use(rehypeRaw) // HTML 문자열을 실제 HTML 요소로 변환
    .use(rehypeTitleFigure)
    .use(rehypePrettyCode, {
      theme: {
        light: JSON.parse(fs.readFileSync(`public/theme/light.json`, 'utf-8')),
        dark: JSON.parse(fs.readFileSync(`public/theme/dark.json`, 'utf-8')),
      },
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true, // HTML 태그 허용
    }) // HTML로 변환
    .process(normalizedMarkdown);
  const finalHtml = String(file);
  console.log("최종 HTML에 이미지 태그 포함 여부:", finalHtml.includes("<img"));
  // 최종 HTML에서 남아있을 수 있는 색상 태그와 토글 태그 처리
  let htmlResult = String(file)
    .replace(
      /<color=(#[0-9A-Fa-f]{3,8})>(.*?)<\/color>/g,
      '<span style="color:$1">$2</span>',
    )
    .replace(
      /<toggle>(.*?)::([\s\S]*?)<\/toggle>/g,
      '<details><summary>$1</summary>$2</details>',
    );

  return htmlResult;
};

// function myRemarkPlugin() {
//   return function (tree) {
//     visit(tree, function (node) {
//       if (
//         node.type === 'containerDirective' ||
//         node.type === 'leafDirective' ||
//         node.type === 'textDirective'
//       ) {
//         const data = node.data || (node.data = {});
//         const hast = h(node.name, node.attributes || {});
//
//         data.hName = hast.tagName;
//         data.hProperties = hast.properties;
//       }
//     });
//   };
// }
function myRemarkPlugin() {
  return function(tree) {
    visit(tree, function(node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});

        if (node.name === 'img') {
          data.hName = 'img';
          const attrs = node.attributes || {};
          const src = attrs.src || '';

          data.hProperties = {
            ...attrs,
            src: getFullImagePath(src),
          };
        } else {
          const hast = h(node.name, node.attributes || {});
          data.hName = hast.tagName;
          data.hProperties = hast.properties;
        }
      }
    });
  };
}

function getFullImagePath(src) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // 이미 https://로 시작하는 완전한 URL이면 그대로 반환
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // /images로 시작하고 basePath가 없는 경우 전체 도메인 포함 URL 구성
  if (src.startsWith('/images') && !src.startsWith(basePath)) {
    return `https://dev.wenivops.co.kr${basePath}${src}`;
  }
  // 기타 경우 그대로 반환
  return src;
}
function testDirective() {
  const result = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .parse("::img{width=\"400\" src=\"/images/test.png\"}");

  console.log("파싱 결과:", JSON.stringify(result, null, 2));
}
testDirective();