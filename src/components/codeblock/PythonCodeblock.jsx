import React, { useState, useCallback } from 'react';
import {
  getResultPython,
  getInitPythonCode,
  getPythonCode,
  copyCode,
  simulateShiftEnter,
} from './event';
import PythonREPL from './PythonREPL';
import Header from './Header';
import ResultBar from './ResultBar';
import Layout from './Layout';

function PythonCodeblock({ id, code, setPython }) {
  // const [code, setCode] = useState(getInitPythonCode);
  // const [result, setResult] = useState('결과값');

  // const event = useCallback((id) => {
  //   getResultPython(id, setPython);
  //   getPythonCode(id);
  // }, []);

  const copy = () => {
    const content = code;
    copyCode(content && content);
  };

  return (
    <Layout>
      <Header copyCode={copy} event={simulateShiftEnter} />
      <PythonREPL>{code}</PythonREPL>
    </Layout>
  );
}

export default React.memo(PythonCodeblock);
