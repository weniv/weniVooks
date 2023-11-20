/*
npm i unified remark-parse remark-rehype remark-directive remark-gfm remark-behead
npm i rehype-stringify rehype-figure rehype-highlight
npm i gray-matter
*/

import { unified } from 'unified';

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkBehead from 'remark-behead';

import rehypeStringify from 'rehype-stringify';
import rehypeFigure from 'rehype-figure';

import rehypeHighlight from 'rehype-highlight';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export const convertMarkdownToHtml = async (markdown) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective) // 확장구문 사용
    .use(myRemarkPlugin)
    .use(remarkGfm) //  GFM 지원(자동링크 리터럴, 각주, 취소선, 표, 작업 목록)
    .use(remarkBehead, { minDepth: 4 })
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(rehypeFigure, { className: 'my-figure' })

    .process(markdown);

  return String(file);
};

function myRemarkPlugin() {
  return function (tree) {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
