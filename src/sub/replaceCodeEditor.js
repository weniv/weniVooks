import React from 'react';
import { JSDOM } from 'jsdom';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';

const HtmlCssEditor = dynamic(() => import('@/components/sub/HtmlCssEditor'), {
  ssr: false,
});
const JavaScriptEditor = dynamic(
  () => import('@/components/sub/JavaScriptEditor'),
  {
    ssr: false,
  },
);
const PythonEditor = dynamic(() => import('@/components/sub/PythonEditor'), {
  ssr: false,
});

export default function replaceCodeEditor(htmlString, Editor) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const darkElements = document.querySelectorAll(
    'pre.weniv-dark[data-language="javascript-exec"]',
  );
  darkElements?.forEach((el) => el.remove());

  const elements = Array.from(document.body.childNodes)
    .map((node, index) => {
      if (node.nodeType === 1) {
        if (
          Editor.includes('HTML/CSS') &&
          node.classList.contains('htmlPlay')
        ) {
          const html =
            node.querySelector('[data-language="html"]')?.textContent || '';
          const css =
            node.querySelector('[data-language="css"]')?.textContent || '';

          return (
            <HtmlCssEditor
              key={`editor-${index}`}
              initialHtml={html}
              initialCss={css}
            />
          );
        } else if (
          Editor.includes('JavaScript') &&
          node.querySelector('[data-language="javascript-exec"]')
        ) {
          const code = node.textContent || '';

          return (
            <JavaScriptEditor key={`js-editor-${index}`} initialCode={code} />
          );
        } else if (
          Editor.includes('Python') &&
          node.querySelector('[data-language="python-exec"]')
        ) {
          const code = node.textContent || '';
          return (
            <PythonEditor key={`python-editor-${index}`} initialCode={code} />
          );
        } else {
          return <React.Fragment>{parse(node.outerHTML)}</React.Fragment>;
        }
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // 텍스트 노드는 그대로 반환
        return node.textContent;
      }
      return null;
    })
    .filter(Boolean);

  return elements;
}
