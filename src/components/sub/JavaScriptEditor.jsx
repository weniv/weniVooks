'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

import './common/Editor.scss';
import styles from './common/Editor.module.scss';

import CodeCopyBtn from './common/CodeCopyBtn';
import CodeResetBtn from './common/CodeResetBtn';
import CodeExecuteBtn from './common/CodeExecuteBtn';

const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const JavaScriptEditor = ({ initialCode }) => {
  const [javaScript, setJavaScript] = useState(initialCode);
  const [result, setResult] = useState(null);

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
      return `<span class=${styles.null}>null</span>`;
    }
    if (value === undefined) {
      return `<span class=${styles.undefined}>undefined</span>`;
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
      return `<span class=${styles.green}>${key}</span>`;
    } else {
      return `<span  class=${styles.string}>"${key}"</span>`;
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

  return (
    <div className={styles.editor_container}>
      <div className="editor_top">
        <CodeExecuteBtn onClick={executeCode} />

        <div className="btn-group">
          <CodeCopyBtn code={javaScript} />
          <CodeResetBtn
            onClick={() => {
              setJavaScript(initialCode);
              setResult(null);
            }}
          />
        </div>
      </div>
      <CodeMirrorEditor
        mode="javascript"
        inputText={javaScript}
        setInputText={setJavaScript}
      />
      <div className={styles.result}>
        <p className={styles.result_title}>결과값</p>

        {result !== null && (
          <div dangerouslySetInnerHTML={{ __html: result }} />
        )}
      </div>
    </div>
  );
};

export default JavaScriptEditor;
