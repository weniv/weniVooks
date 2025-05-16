import React from 'react';
import Script from 'next/script';

export default function PythonREPL({ children }) {
  const basePath = process.env.NODE_ENV === 'dev' ? '/services/wenivooks' : '';
  console.log(basePath);
  return (
    <div>
      {/* PyScript CSS */}
      <link
        rel="stylesheet"
        href={`${basePath}/pyscript/pyscript_init.css`}
      />

      {/* PyScript JS - Script 태그에 strategy 추가 */}
      <Script
        src={`${basePath}/pyscript/pyscript_init.js`}
        strategy="beforeInteractive"
        onLoad={() => console.log('PyScript loaded')}
        onError={() => console.error('PyScript failed to load')}
      />

      <py-repl>{children}</py-repl>
    </div>
  );
}
