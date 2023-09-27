'use client';

// *문제* codemirror.css 수정사항 반영 안됨
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '@codemirror/lib/codemirror.css';
import styles from '@/components/feature/CodeBlock.module.scss';
import CodeMirror from 'codemirror';
import '@codemirror/mode/javascript/javascript.js';
import '@codemirror/mode/python/python.js';
import '@codemirror/theme/dracula.css';
import '@codemirror/theme/ayu-dark.css';
import '@codemirror/addon/selection/active-line.js';
import ExecutionIcon from '../svg/ExecutionIcon';
import CopyIcon from '../svg/CopyIcon';
import HelpCircleIcon from '../svg/HelpCircleIcon';
import { SettingContext } from '@/context/SettingContext';

export default function codeBlock({ lang = 'javascript' }) {
  const getSaveCode = () => {
    const pyCode = window.localStorage.getItem('pythonCode');
    const jsCode = window.localStorage.getItem('javascriptCode');

    if (lang === 'python') {
      const ex = `def solution(data): 
    return None`;
      return pyCode ? pyCode : ex;
    } else {
      const ex = `function solution() {
    return undefined;
}`;
      return jsCode ? jsCode : ex;
    }
  };

  const codeMirrorRef = useRef(null);
  const [code, setCode] = useState(getSaveCode());
  const [editor, setEditor] = useState(null); // CodeMirror 인스턴스를 관리
  const [result, setResult] = useState('결과 값');
  const [theme, setTheme] = useState('default');

  const { codeTheme } = useContext(SettingContext);
  const themeList = ['default', 'dracula', 'ayu-dark'];

  useEffect(() => {
    setTheme(themeList[parseInt(codeTheme) - 1]);
  }, [codeTheme]);

  useEffect(() => {
    if (!editor) {
      // CodeMirror 초기화
      const cm = CodeMirror.fromTextArea(codeMirrorRef.current, {
        mode: lang,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        indentUnit: 4,
        theme: theme,
        styleActiveLine: true,
      });

      cm.setValue(code);
      cm.on('change', (instance) => {
        const value = instance.getValue();
        setCode(value);
      });

      setEditor(cm); // CodeMirror 인스턴스 저장
    } else {
      // CodeMirror 인스턴스가 이미 초기화되어 있으면 theme만 변경
      editor.setOption('theme', theme ? theme : 'default');
    }
  }, [theme, code, editor]);

  const printCode = async (e) => {
    e.preventDefault();
    window.localStorage.setItem(`${lang}Code`, code);
    if (lang === 'python') {
      try {
        const result = await axios.get('/api/runPython', {
          params: {
            code: code && code,
          },
        });
        setResult(result.data.result);
      } catch (err) {
        console.log(err);
      }
    } else {
      const regex = /{([\s\S]*)}/;
      const returnVal = code && code.match(regex)[1].toString();
      try {
        const result = new Function(returnVal)();
        if (result instanceof Set) {
          setResult(Array.from(result).join('\n'));
        } else if (
          Object.prototype.toString.call(result) === '[object Object]'
        ) {
          setResult('object is not iterable');
        } else {
          setResult(Array.isArray(result) ? result.join('\n') : String(result));
        }
      } catch (err) {
        setResult(err.toString());
      }
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('코드가 클립보드에 복사되었습니다.');
    } catch (err) {
      alert('코드 복사에 실패하였습니다.');
    }
  };

  return (
    <>
      <div
        className={styles.editor}
        onKeyDown={(e) =>
          e.keyCode === 13 && e.shiftKey ? printCode(e) : null
        }
      >
        <div className={styles.taskbar}>
          <button onClick={(e) => printCode(e)}>
            <ExecutionIcon alt="코드 실행 버튼" />
          </button>
          <div>
            <button onClick={copyCode}>
              <CopyIcon alt="코드 복사 버튼" />
            </button>
            <button>
              <HelpCircleIcon alt="코드 블록 사용법 알림" />
            </button>
          </div>
        </div>
        <textarea ref={codeMirrorRef}></textarea>
        <div className={styles.resultbar}>
          {(result && result === undefined) || result == null
            ? 'undefined'
            : result}
        </div>
      </div>
    </>
  );
}

// 툴팁
// https://inpa.tistory.com/entry/CSS-%F0%9F%92%8D-%ED%88%B4%ED%8C%81-%EB%94%94%EC%9E%90%EC%9D%B8-%F0%9F%96%8C%EF%B8%8F-%EB%AA%A8%EC%9D%8C
