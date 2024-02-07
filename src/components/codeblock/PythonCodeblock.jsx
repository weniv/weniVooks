import React, { useState, useCallback } from 'react';
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

function PythonCodeblock() {
  const [code, setCode] = useState(getInitPythonCode);
  const [result, setResult] = useState('결과값');

  const event = useCallback(() => {
    getResultPython(setResult);
    getPythonCode();
  }, []);

  const copy = () => {
    const content = getPythonCode();
    copyCode(content && content);
  };

  return (
    <Layout event={event}>
      <Header event={event} copyCode={copy} />
      <PythonREPL>{code}</PythonREPL>
    </Layout>
  );
}

export default React.memo(PythonCodeblock);
