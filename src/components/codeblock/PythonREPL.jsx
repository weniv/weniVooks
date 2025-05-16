import React from 'react';
import Script from 'next/script';

export default function PythonREPL({ children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div>
      <link
        rel="stylesheet"
        href={`${basePath}/pyscript/pyscript_init.css`}
      />
      <Script
        src={`${basePath}/pyscript/pyscript_init.js`}
        strategy="beforeInteractive"
        onLoad={() => console.log('PyScript loaded')}
        onError={(e) => console.error('PyScript failed to load:', e)}
      />
      <py-repl>{children}</py-repl>
    </div>
  );
}
