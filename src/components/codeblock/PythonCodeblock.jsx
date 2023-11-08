'use client';

import React, { useState } from 'react';
import {
  getResultPython,
  getInitPythonCode,
  getPythonCode,
  copyCode,
} from './event';
import PythonREPL from './PythonREPL';
import Header from './Header';
import ResultBar from './ResultBar';
import Layout from './Layout';

export default function PythonCodeblock() {
  const [code, setCode] = useState(getInitPythonCode);
  const [result, setResult] = useState('결과값');

  const event = () => {
    getResultPython(setResult);
    getPythonCode();
  };

  const copy = () => {
    const content = getPythonCode();
    copyCode(content && content);
  };

  return (
    <Layout event={event}>
      <Header event={event} copyCode={copy} />
      <PythonREPL>{code}</PythonREPL>
      <ResultBar result={result} />
    </Layout>
  );
}
