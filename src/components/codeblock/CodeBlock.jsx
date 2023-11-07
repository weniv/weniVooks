'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/codeblock/CodeBlock.module.scss';
import ExecutionIcon from '../svg/ExecutionIcon';
import CopyIcon from '../svg/CopyIcon';
import HelpCircleIcon from '../svg/HelpCircleIcon';
import initEditor from '@/components/codeblock/editor';
import { getSaveCode, copyCode, getResultPython, getCode } from './event';
import PythonREPL from './PythonREPL';

export default function codeBlock({ lang = 'python' }) {
  const codeMirrorRef = useRef(null);
  const [editor, setEditor] = useState(null); // CodeMirror 인스턴스를 관리
  const [code, setCode] = useState(getSaveCode(lang));
  const [result, setResult] = useState('결과값');

  // CodeMirror 초기화
  // useEffect(() => {
  //   initEditor(editor, lang, code, setCode, setEditor, codeMirrorRef);
  // }, [code, editor]);

  return (
    <>
      <div
        className={styles.editor}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            getResultPython(setResult);
            // runCode(lang, code, setResult);
          }
        }}
      >
        <div className={styles.taskbar}>
          <button
            id="btn-run"
            onClick={async () => {
              getResultPython(setResult);
              getCode();
              // runCode(lang, code, setResult);
            }}
          >
            <ExecutionIcon alt="코드 실행 버튼" />
          </button>
          <div>
            <button
              onClick={() => {
                const content = getCode();
                copyCode(content && content);
              }}
              className={styles.tooltip}
            >
              <CopyIcon alt="코드 복사 버튼" />
              <span className={styles.tooltipText}>복사하기</span>
            </button>
            <button className={styles.tooltip}>
              <HelpCircleIcon alt="코드 블록 사용법 알림" />
              <span className={styles.tooltipText}>
                Shift-ENTER 또는
                <br /> 왼쪽 플레이 버튼을 누르면 실행됩니다.
              </span>
            </button>
          </div>
        </div>
        <PythonREPL>{code}</PythonREPL>
        <div className={styles.resultbar}>
          <p id="result">{result}</p>
          <div id="output" class="p-4"></div>
        </div>
        {/* <textarea id="codeeditor" ref={codeMirrorRef}></textarea> */}
      </div>
    </>
  );
}
