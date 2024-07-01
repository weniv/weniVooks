'use client';

import styles from './JavaScriptEditor.module.scss';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Icon from '../icon/Icon';
import ExecutionIcon from '../svg/ExecutionIcon';
import Loading from '@/app/loading';

const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const PythonEditor = ({ initialCode }) => {
  const [pythonCode, setPythonCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [isPyScriptReady, setIsPyScriptReady] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const loadPyScript = () => {
      const script = document.createElement('script');
      script.src = 'https://pyscript.net/latest/pyscript.js';
      script.async = true;
      script.onload = () => {
        const checkPyScriptReady = () => {
          if (window.pyscript && window.pyscript.interpreter) {
            setIsPyScriptReady(true);
          } else {
            setTimeout(checkPyScriptReady, 100);
          }
        };
        checkPyScriptReady();
      };
      script.onerror = () => {
        setLoadingError('Failed to load PyScript');
      };
      document.body.appendChild(script);
    };

    loadPyScript();

    // PyScript 스타일 제어
    const style = document.createElement('style');
    style.textContent = `
      #output-container { display: none !important; }
      py-terminal { display: none !important; }
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
      if (outputRef.current) {
        outputRef.current.textContent = '';
      }
      const pyElement = document.createElement('py-script');
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const output = outputRef.current
        ? outputRef.current.textContent
        : 'No output';
      setResult(output);

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

  if (loadingError) {
    return <div>Error: {loadingError}</div>;
  }

  return (
    <div className={styles.editor_container}>
      <div className={styles.top}>
        <button type="button" onClick={executeCode} disabled={!isPyScriptReady}>
          {isPyScriptReady ? (
            <ExecutionIcon />
          ) : (
            <ExecutionIcon color="grayLv2" />
          )}
          <span className="a11y-hidden">실행</span>
        </button>

        <div>
          <button
            type="button"
            onClick={() => {
              setPythonCode(initialCode);
              setResult(null);
            }}
          >
            <Icon name="reset" color="grayLv3" />
            <span className="a11y-hidden">초기화</span>
          </button>
          <button type="button" onClick={copyCode}>
            <Icon name="copy" color="grayLv3" />
            <span className="a11y-hidden">복사</span>
          </button>
        </div>
      </div>
      <CodeMirrorEditor
        mode="python"
        inputText={pythonCode}
        setInputText={setPythonCode}
      />

      <div className={styles.result}>
        <p className={styles.result_title}>결과값</p>
        {result && <div>{result}</div>}
      </div>
      <div id="python-output" ref={outputRef} style={{ display: 'none' }}></div>
    </div>
  );
};

export default PythonEditor;
