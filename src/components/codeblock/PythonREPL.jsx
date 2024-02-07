import React from 'react';
import Script from 'next/script';

export default function PythonREPL({ children }) {
  return (
    <div>
      <link rel="stylesheet" href="./pyscript/pyscript.css" />
      <Script defer src="./pyscript/pyscript_init.js" />
      <py-repl>{children}</py-repl>
    </div>
  );
}
