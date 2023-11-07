import React from 'react';
import Script from 'next/script';
import './pyscript/pyscript.css';
import styles from '@/components/codeblock/PythonREPL.module.scss';

export default function PythonREPL({ children }) {
  return (
    <div>
      <Script defer src="./pyscript/pyscript.js" />
      <py-repl id="my-repl">{children}</py-repl>
    </div>
  );
}
