import { useEffect } from 'react';
import Script from 'next/script';
import { JSDOM } from 'jsdom';
import '@/styles/common.css';
import '@/styles/codemirror.css';
import PrintButton from './PrintButton';

function replaceCodeBlocks(htmlString) {
  const dom = new JSDOM(htmlString);
  
  // Java 실행 블록 처리
  const javaCodeElements = dom.window.document.querySelectorAll(
    'pre.weniv-light[data-language="java-exec"]'
  );
  let deleteElements = dom.window.document.querySelectorAll(
    'pre.weniv-dark[data-language="java-exec"]'
  );
  
  deleteElements.forEach((el) => {
    el.remove();
  });
  
  // 각 코드블록을 java-repl 웹 컴포넌트로 변환
  javaCodeElements.forEach((el) => {
    const content = el.textContent;
    const javaReplElement = dom.window.document.createElement('java-repl');
    javaReplElement.textContent = content;
    el.replaceWith(javaReplElement);
  });

  return dom.serialize();
}

export default function JavaContentComponent({ htmlContent, title }) {
  return (
    <>
      {htmlContent && (
        <>
          <PrintButton />
          <h3 className="title">{title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: replaceCodeBlocks(htmlContent),
            }}
          />
        </>
      )}
      
      <link rel="stylesheet" href="/codeblocks/codemirror.css" />
      
      <Script
        src="/codeblocks/codemirror.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="/codeblocks/javascript/javascript.js"
        strategy="afterInteractive"
      />
      <Script 
        src="/codeblocks/codemirror/active-line.js"
        strategy="afterInteractive"
      />
      
      {/* Java REPL 웹 컴포넌트 */}
      <Script 
        src="/codeblocks/java-repl.js"
        strategy="afterInteractive"
      />
      
      {/* TeaVM 컴파일된 JavaScript */}
      <Script 
        src="/classes.js"
        strategy="afterInteractive"
      />
    </>
  );
}