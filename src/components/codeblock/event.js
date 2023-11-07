// localStorage에서 코드 초기값 불러오기
export const getSaveCode = (lang) => {
  const pyCode = window.localStorage.getItem('pythonCode');
  const jsCode = window.localStorage.getItem('javascriptCode');

  if (lang === 'python') {
    const ex = `def solution():\n  return None`;
    return pyCode ? pyCode : ex;
  } else {
    const ex = `function solution() {\n  return undefined;\n}`;
    return jsCode ? jsCode : ex;
  }
};

// 코드 복사
export const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    alert('코드가 클립보드에 복사되었습니다.');
  } catch (err) {
    alert('코드 복사에 실패하였습니다.');
  }
};

import PythonREPL from './PythonREPL';
// 코드 실행
import runJavascript from './runJavaScript';
import { runPython } from './runPython';

export const runCode = async (lang, code, setResult) => {
  window.localStorage.setItem(`${lang}Code`, code);
  if (lang === 'javascript') {
    runJavascript(code, setResult);
  } else {
    // const regex = /def\s+([^\s(]+)\s*\(\)/; // 정규 표현식 패턴
    // const match = code.match(regex);
    // const title = match && match[1];
    // runPython(code, title, setResult);
  }
};
