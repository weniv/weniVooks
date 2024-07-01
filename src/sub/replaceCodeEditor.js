import React from 'react';
import { JSDOM } from 'jsdom';
import dynamic from 'next/dynamic';

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
export default function replaceCodeEditor(htmlString) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const darkElements = document.querySelectorAll(
    'pre.weniv-dark[data-language="javascript-exec"]',
  );
  darkElements?.forEach((el) => el.remove());

  const elements = Array.from(document.body.childNodes)
    .map((node, index) => {
      if (node.nodeType === 1) {
        if (node.classList.contains('htmlPlay')) {
          const html =
            node.querySelector('[data-language="html"]')?.textContent || '';
          const css =
            node.querySelector('[data-language="css"]')?.textContent || '';

          return (
            <React.Fragment key={`editor-${index}`}>
              <HtmlCssEditor initialHtml={html} initialCss={css} />
            </React.Fragment>
          );
        } else if (node.querySelector('[data-language="javascript-exec"]')) {
          const code = node.textContent || '';

          return (
            <React.Fragment key={`js-editor-${index}`}>
              <JavaScriptEditor initialCode={code} />
            </React.Fragment>
          );
        } else if (node.querySelector('[data-language="python-exec"]')) {
          const code = node.textContent || '';
          return (
            <React.Fragment key={`js-python-${index}`}>
              <PythonEditor initialCode={code} />
            </React.Fragment>
          );
        } else {
          return (
            <div
              key={`other-${index}`}
              dangerouslySetInnerHTML={{ __html: node.outerHTML }}
            />
          );
        }
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        return (
          <React.Fragment key={`text-${index}`}>
            {node.textContent}
          </React.Fragment>
        );
      }
      return null;
    })
    .filter(Boolean);

  return elements;
}
