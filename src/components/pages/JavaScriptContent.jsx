import Script from 'next/script';
import { JSDOM } from 'jsdom';
import dynamic from 'next/dynamic';

import '@/styles/common.css';
import '@/styles/codemirror.css';

import ButtonGroup from '../common/button/ButtonGroup';

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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <ButtonGroup markdownContent={markdownContent} />
          <div
            dangerouslySetInnerHTML={{
              __html: replaceCodeWithJsRepl(htmlContent),
            }}
          />
        </>
      )}
      {/* basePath 적용된 CSS */}
      <link rel="stylesheet" href={`${basePath}/codeblocks/codemirror.css`} />
      {/* CodeMirror 코어 먼저 로드 - strategy 변경 */}
      <Script
        src={`${basePath}/codeblocks/codemirror.js`}
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('CodeMirror loaded successfully');
          // 코어 스크립트 로드 완료 후 종속 스크립트 로드
          const loadDependentScripts = () => {
            const jsRepl = document.createElement('script');
            jsRepl.src = `${basePath}/codeblocks/javascript/js-repl.js`;
            document.body.appendChild(jsRepl);

            const jsScript = document.createElement('script');
            jsScript.src = `${basePath}/codeblocks/javascript/javascript.js`;
            document.body.appendChild(jsScript);

            const activeLine = document.createElement('script');
            activeLine.src = `${basePath}/codeblocks/codemirror/active-line.js`;
            document.body.appendChild(activeLine);
          };

          loadDependentScripts();
        }}
      />
      {/* basePath 적용된 JavaScript 파일들 */}
      {/*<Script*/}
      {/*  src={`${basePath}/codeblocks/codemirror.js`}*/}
      {/*  strategy="beforeInteractive"*/}
      {/*  onLoad={() => console.log('CodeMirror loaded')}*/}
      {/*  onError={(e) => console.error('CodeMirror failed to load:', e)}*/}
      {/*/>*/}
      {/*<Script defer src={`${basePath}/codeblocks/javascript/js-repl.js`} />*/}
      {/*<Script defer src={`${basePath}/codeblocks/javascript/javascript.js`} />*/}
      {/*<Script defer src={`${basePath}/codeblocks/codemirror/active-line.js`} />*/}
    </>

  );
}
