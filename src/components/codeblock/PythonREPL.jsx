import React, { useReducer, useRef } from 'react';
import Script from 'next/script';
// import './pyscript/pyscript.css';

export default function PythonREPL({ children }) {
  // console.log('children', children);
  return (
    <div>
      <link rel="stylesheet" href="./pyscript/pyscript.css" />
      <Script defer src="./pyscript/pyscript.js" />
      <py-repl>{children}</py-repl>
    </div>
  );
}
