import Script from 'next/script';
import { JSDOM } from 'jsdom';
import dynamic from 'next/dynamic';

import '@/styles/common.css';
import '@/styles/codemirror.css';

import ButtonGroup from '../common/button/ButtonGroup';
import JavaScriptScripts from '@/components/javaScriptScripts';

function replaceCodeWithJsRepl(htmlString) {
  const dom = new JSDOM(htmlString);

  const codeElements = dom.window.document.querySelectorAll(
    'pre.weniv-light[data-language="javascript-exec"]',
  );

  let deleteElements = dom.window.document.querySelectorAll(
    'pre.weniv-dark[data-language="javascript-exec"]',
  );

  deleteElements.forEach((el) => {
    el.remove();
  });

  codeElements.forEach((el) => {
    const content = el.textContent;
    const jsReplElement = dom.window.document.createElement('js-repl');
    jsReplElement.textContent = content;
    el.replaceWith(jsReplElement);
  });

  return dom.serialize();
}

export default function JavaScriptContent({
  htmlContent,
  title,
  markdownContent,
}) {
  const processedHtml = replaceCodeWithJsRepl(htmlContent);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <ButtonGroup markdownContent={markdownContent} />
          <div
            dangerouslySetInnerHTML={{
              __html: processedHtml,
            }}
          />
        </>
      )}
      <link rel="stylesheet" href={`${basePath}/codeblocks/codemirror.css`} />

      {/* 클라이언트 스크립트 컴포넌트 */}
      <JavaScriptScripts basePath={basePath} />
    </>
  );
}

//   return (
//     <>
//       {htmlContent && (
//         <>
//           <h3 className="title">{title}</h3>
//           <ButtonGroup markdownContent={markdownContent} />
//           <div
//             dangerouslySetInnerHTML={{
//               __html: replaceCodeWithJsRepl(htmlContent),
//             }}
//           />
//         </>
//       )}
//       <link rel="stylesheet" href={`${basePath}/codeblocks/codemirror.css`} />
//
//       {/* basePath 적용된 JavaScript 파일들 */}
//       <Script src={`${basePath}/codeblocks/codemirror.js`} />
//       <Script defer src={`${basePath}/codeblocks/javascript/js-repl.js`} />
//       <Script defer src={`${basePath}/codeblocks/javascript/javascript.js`} />
//       <Script defer src={`${basePath}/codeblocks/codemirror/active-line.js`} />
//     </>
//   );
// }
