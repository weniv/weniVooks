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

  // HTML 특수 문자를 이스케이프 처리하는 함수
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (Array.isArray(obj)) {
      return obj.map(deepClone);
    }

    if (obj instanceof Map) {
      return new Map(
        Array.from(obj.entries()).map(([key, value]) => [
          deepClone(key),
          deepClone(value),
        ]),
      );
    }

    if (obj instanceof Set) {
      return new Set(Array.from(obj.values()).map(deepClone));
    }

    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  };

  const executeCode = useCallback(async () => {
    let output = [];
    const originalLog = console.log;
    let htmlOutput = null;

    const editorResult = (element) => {
      htmlOutput = element;
    };

    console.log = async (...args) => {
      // 각 인자의 깊은 복사본을 만들어 저장 (함수 보존)
      output.push(args.map(deepClone));
    };

    try {
      const executeFunction = new Function('editorResult', javaScript);
      await executeFunction(editorResult);
      if (output.length > 0) {
        setResult(output.map(formatOutput).join('<br>'));
      } else if (htmlOutput) {
        setResult((prev) =>
          prev !== null
            ? prev + formatHtmlElement(htmlOutput)
            : formatHtmlElement(htmlOutput),
        );
      } else {
        setResult('실행 완료 (출력 없음)');
      }
    } catch (error) {
      setResult(
        `<span style="color: red;">${escapeHtml(error.toString())}</span>`,
      );
    } finally {
      console.log = originalLog;
    }
  }, [javaScript]);

  // 출력 포맷팅 함수
  const formatOutput = (values) => {
    return values.map(formatValue).join(' ');
  };

  // 값 포맷팅 함수
  const formatValue = (value) => {
    if (value === null) {
      return `<span class=${styles.null}>null</span>`;
    }
    if (value === undefined) {
      return `<span class=${styles.undefined}>undefined</span>`;
    }
    if (value instanceof Date) {
      return `<span class=${styles.string}>'${value.toISOString()}'</span>`;
    }
    switch (typeof value) {
      case 'string':
        return `<span class=${styles.string}>'${escapeHtml(value)}'</span>`;
      case 'number':
        return `<span class=${styles.number}>${value}</span>`;
      case 'boolean':
        return `<span class=${styles.boolean}>${value}</span>`;
      case 'function':
        return `<span class=${styles.function}>[Function: ${
          value.name || 'anonymous'
        }]</span>`;
      case 'object':
        if (value instanceof Map) {
          return formatMap(value);
        }
        if (value instanceof Set) {
          return formatSet(value);
        }
        return formatObject(value);
      default:
        return `<span>${escapeHtml(String(value))}</span>`;
    }
  };
  // 객체 키 포맷팅 함수
  const formatKey = (key) => {
    const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
    if (isValidIdentifier) {
      return `<span class=${styles.green}>${escapeHtml(key)}</span>`;
    } else {
      return `<span class=${styles.string}>'${escapeHtml(key)}'</span>`;
    }
  };

  // 객체 포맷팅 함수
  const formatObject = (obj) => {
    if (Array.isArray(obj)) {
      const formattedItems = obj
        .map((item) => formatValue(item))
        .join('<span>, </span>');
      return `<span class=${styles.array}>[</span>${formattedItems}<span class=${styles.array}>]</span>`;
    }

    const entries = Object.entries(obj);
    const formattedEntries = entries
      .map(([key, value]) => {
        return `${formatKey(key)}<span>: </span>${formatValue(value)}`;
      })
      .join('<span>, </span>');

    return `<span class=${styles.object}>{</span>${formattedEntries}<span class=${styles.object}>}</span>`;
  };

  const formatMap = (map) => {
    const entries = Array.from(map.entries());
    const formattedEntries = entries
      .map(([key, value]) => `${formatValue(key)} => ${formatValue(value)}`)
      .join('<span>, </span>');
    return `<span class=${styles.object}>Map(${map.size}) {</span>${formattedEntries}<span class=${styles.object}>}</span>`;
  };
  const formatSet = (set) => {
    const values = Array.from(set.values());
    const formattedValues = values
      .map((value) => formatValue(value))
      .join('<span>, </span>');
    return `<span class=${styles.object}>Set(${set.size}) {</span>${formattedValues}<span class=${styles.object}>}</span>`;
  };

  const formatHtmlElement = (element) => {
    let html = `<${element.tagName.toLowerCase()}`;

    // 속성 추가
    for (let attr of element.attributes) {
      html += ` ${attr.name}="${escapeHtml(attr.value)}"`;
    }

    html += '>';

    // 자식 요소 추가
    for (let child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        html += escapeHtml(child.textContent);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        html += formatHtmlElement(child);
      }
    }

    html += `</${element.tagName.toLowerCase()}>`;
    return html;
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
