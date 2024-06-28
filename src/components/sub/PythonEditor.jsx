'use client';

import styles from './JavaScriptEditor.module.scss';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const PythonEditor = ({ initialCode }) => {
  const [pythonCode, setPythonCode] = useState(initialCode);
  const [result, setResult] = useState('결과값');
  const [isPyScriptReady, setIsPyScriptReady] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    const checkPyScriptReady = () => {
      if (window.pyscript) {
        setIsPyScriptReady(true);
        console.log('PyScript object:', window.pyscript);
      } else {
        setTimeout(checkPyScriptReady, 100);
      }
    };

    checkPyScriptReady();

    // PyScript 스타일 제어
    const style = document.createElement('style');
    style.textContent = `
      #output-container { display: none !important; }

    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const executeCode = useCallback(async () => {
    if (!isPyScriptReady) {
      setResult('PyScript is not ready yet. Please wait.');
      return;
    }

    try {
      setResult('실행 중...');

      // Clear previous output
      if (outputRef.current) {
        outputRef.current.textContent = '';
      }

      // Create a new Python element
      const pyElement = document.createElement('py-script');

      // Wrap the user's code to capture print outputs
      const wrappedCode = `
import sys
from js import document

class CustomOutput:
    def write(self, text):
        element = document.getElementById("python-output")
        if element:
            element.textContent += text

    def flush(self):
        pass

sys.stdout = CustomOutput()
sys.stderr = CustomOutput()

try:
${pythonCode}
except Exception as e:
    print(f"Error: {str(e)}")
      `;

      pyElement.textContent = wrappedCode;
      document.body.appendChild(pyElement);

      // Wait for the code to execute
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the output
      const output = outputRef.current
        ? outputRef.current.textContent
        : 'No output';
      setResult(output);

      // Remove the temporary py-script element
      document.body.removeChild(pyElement);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  }, [pythonCode, isPyScriptReady]);

  const copyCode = useCallback(() => {
    navigator.clipboard
      .writeText(pythonCode)
      .then(() => alert('코드가 클립보드에 복사되었습니다.'))
      .catch((err) => console.error('복사 실패:', err));
  }, [pythonCode]);

  return (
    <div className={styles.editor_container}>
      <Script
        src="https://pyscript.net/latest/pyscript.js"
        strategy="beforeInteractive"
      />
      <div className={styles.top}>
        <button type="button" onClick={executeCode} disabled={!isPyScriptReady}>
          실행
        </button>
        <button type="button" onClick={copyCode}>
          복사
        </button>
      </div>
      <CodeMirrorEditor
        mode="python"
        inputText={pythonCode}
        setInputText={setPythonCode}
      />
      <div className={styles.result}>{result}</div>
      <div id="python-output" ref={outputRef} style={{ display: 'none' }}></div>
    </div>
  );
};

export default PythonEditor;
