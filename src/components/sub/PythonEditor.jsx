'use client';
import './common/Editor.scss';
import styles from './common/Editor.module.scss';
import React, { useCallback, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import CodeCopyBtn from './common/CodeCopyBtn';
import CodeResetBtn from './common/CodeResetBtn';
import CodeExecuteBtn from './common/CodeExecuteBtn';
import { usePyScript } from '@/context/PyScriptContext';

const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const PythonEditor = ({ initialCode }) => {
  const [pythonCode, setPythonCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const outputRef = useRef(null);
  const { isPyScriptReady, loadingError } = usePyScript();

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

  if (loadingError) {
    return <div>Error: {loadingError}</div>;
  }

  return (
    <div className={styles.editor_container}>
      <div className="editor_top">
        <CodeExecuteBtn onClick={executeCode} disabled={!isPyScriptReady} />

        <div className="btn-group">
          <CodeCopyBtn code={pythonCode} />
          <CodeResetBtn
            onClick={() => {
              setPythonCode(initialCode);
              setResult(null);
            }}
          />
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
