'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

import styles from './JavaScriptEditor.module.scss';

const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const JavaScriptEditor = ({ initialCode }) => {
  const [javaScript, setJavaScript] = useState(initialCode);
  const [result, setResult] = useState('결과값');

  const executeCode = useCallback(() => {
    let output = [];
    const originalLog = console.log;

    console.log = (...args) => {
      output.push(args);
    };

    try {
      const executeFunction = new Function(javaScript);
      const returnValue = executeFunction();
      if (output.length > 0) {
        setResult(output.map(formatOutput).join('\n'));
      } else if (returnValue !== undefined) {
        setResult(formatOutput([returnValue]));
      } else {
        setResult('실행 완료 (출력 없음)');
      }
    } catch (error) {
      setResult(`<span style="color: red;">Error: ${error.message}</span>`);
    } finally {
      console.log = originalLog;
    }
  }, [javaScript]);

  const formatOutput = (value) => {
    if (Array.isArray(value)) {
      return value.map(formatOutput).join(', ');
    }
    return formatValue(value);
  };

  const formatValue = (value) => {
    if (value === null) {
      return '<span style="color: gray;">null</span>';
    }
    if (value === undefined) {
      return '<span style="color: gray;">undefined</span>';
    }
    switch (typeof value) {
      case 'string':
        return `<span class=${styles.string}>'${value}'</span>`;
      case 'number':
        return `<span class=${styles.number}>${value}</span>`;
      case 'boolean':
        return `<span class=${styles.boolean}>${value}</span>`;
      case 'object':
        return formatObject(value);
      default:
        return `<span>${String(value)}</span>`;
    }
  };

  const formatKey = (key) => {
    // 키가 유효한 JavaScript 식별자인지 확인
    const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
    if (isValidIdentifier) {
      return `<span style="color: #a52a2a;">${key}</span>`;
    } else {
      return `<span style="color: #a52a2a;">"${key}"</span>`;
    }
  };

  const formatObject = (obj) => {
    if (Array.isArray(obj)) {
      const formattedItems = obj
        .map((item) => formatValue(item))
        .join('<span>, </span>');
      return `<span>[</span>${formattedItems}<span>]</span>`;
    }

    const entries = Object.entries(obj);
    const formattedEntries = entries
      .map(([key, value]) => {
        return `${formatKey(key)}<span>: </span>${formatValue(value)}`;
      })
      .join('<span>, </span>');

    return `<span>{</span>${formattedEntries}<span>}</span>`;
  };

  const a = [{ 1: 1 }, { 'dfjfjf djfj': '문자자자', ddd: '1' }];
  const copyCode = useCallback(() => {
    navigator.clipboard
      .writeText(javaScript)
      .then(() => alert('코드가 클립보드에 복사되었습니다.'))
      .catch((err) => console.error('복사 실패:', err));
  }, [javaScript]);

  return (
    <div className={styles.editor_container}>
      <div className={styles.top}>
        <button type="button" onClick={executeCode}>
          실행
        </button>
        <button type="button" onClick={copyCode}>
          복사
        </button>
      </div>
      <CodeMirrorEditor
        mode="javascript"
        inputText={javaScript}
        setInputText={setJavaScript}
      />
      <div
        className={styles.result}
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default JavaScriptEditor;
