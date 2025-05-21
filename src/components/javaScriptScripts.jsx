'use client';

import Script from 'next/script';

export default function JavaScriptScripts({ basePath }) {
  return (
    <>
      <Script src={`${basePath}/codeblocks/codemirror.js`} />
      <Script defer src={`${basePath}/codeblocks/javascript/js-repl.js`} />
      <Script defer src={`${basePath}/codeblocks/javascript/javascript.js`} />
      <Script defer src={`${basePath}/codeblocks/codemirror/active-line.js`} />
    </>
  );
}