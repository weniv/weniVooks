import React from 'react';
import Script from 'next/script';

export default function PythonREPL({ children }) {
  const basePath = process.env.NODE_ENV === 'dev' ? '/services/wenivooks' : '';
  return (
    <div>
      <link rel="stylesheet" href={`${basePath}/pyscript/pyscript_init.css`} />
      <Script defer src={`${basePath}/pyscript/pyscript_init.js`} />
      <py-repl>{children}</py-repl>
    </div>
  );
}
