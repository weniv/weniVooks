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
  return function (tree) {
    // NEXT_PUBLIC_BASE_PATH 환경변수 사용 (없으면 빈 문자열)
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    visit(tree, 'image', (node) => {
      // 이미지 URL이 절대경로(/images로 시작)이고 basePath가 없는 경우
      if (node.url && node.url.startsWith('/images') && !node.url.startsWith(basePath)) {
        node.url = `${basePath}${node.url}`;
      }
    });
  };
}
export const convertMarkdownToHtml = async (markdown) => {
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
      const width = attributes.match(/width="([^"]*)"/)?.[1] || '';
      const src = attributes.match(/src="([^"]*)"/)?.[1] || '';

      if (!src) return match; // src가 없으면 원래 텍스트 유지

      // 여기서 중요한 변경: 슬래시로 시작하는 이미지 경로에 basePath 추가하되
      // 이미 basePath가 있는 경우는 추가하지 않음
      const fullSrc = src.startsWith('/') && !src.startsWith(basePath)
        ? basePath + src
        : src;

      return `<img width="${width}" src="${fullSrc}" alt="" />`;
    }
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
  return function (tree) {
    visit(tree, function (node) {
      // 불필요한 디버깅 로그 제거

      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});

        // img 지시문 특별 처리
        if (node.name === 'img') {
          data.hName = 'img';
          // 속성이 있는지 확인하고 src 경로 처리
          const attrs = node.attributes || {};
          const src = attrs.src || '';
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

          data.hProperties = {
            ...attrs,
            // 여기서도 같은 로직 적용: /images로 시작하고 basePath가 없는 경우에만 추가
            src: (src.startsWith('/images') && !src.startsWith(basePath))
              ? basePath + src
              : src
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