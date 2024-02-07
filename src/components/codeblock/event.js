import { useEffect } from 'react';

// localStorage에서 코드 초기값 불러오기
export const getSaveCode = (lang) => {
  const pyCode = window.localStorage.getItem('pythonCode');
  const jsCode = window.localStorage.getItem('javascriptCode');

  if (lang === 'python') {
    const ex = `def solution():\n  return "Hello World"\nsolution()`;
    return pyCode ? pyCode : ex;
  } else {
    const ex = `function solution() {\n  return undefined;\n}`;
    return jsCode ? jsCode : ex;
  }
};

// localStorage에서 파이썬 코드 초기값 불러오기
export const getInitPythonCode = () => {
  const code = window.localStorage.getItem('pythonCode');
  const initCode = `def solution():\n  return "Hello World"\nsolution()`;
  return code && code !== '\n' ? code : initCode;
};

// localStorage에서 자바스크립트 코드 초기값 불러오기
export const getInitJavascriptCode = () => {
  const code = window.localStorage.getItem('javascriptCode');
  const initCode = `function solution() {\n  return undefined;\n}`;
  return code ? code : initCode;
};

// 코드 복사
export const copyCode = async (code) => {
  console.log('code', code);
  try {
    await navigator.clipboard.writeText(code);
    alert('코드가 클립보드에 복사되었습니다.');
  } catch (err) {
    alert('코드 복사에 실패하였습니다.');
  }
};

// shift enter 키보드 이벤트 발생
export const simulateShiftEnter = (button) => {
  const e = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    shiftKey: true,
  });

  console.log('shift enter clicked!');
  // button.dispatchEvent(e);
};

// 파이썬 결과값 출력
export const getResultPython = async (id, setPython) => {
  try {
    const pyResult = document.querySelector('.py-repl-output');
    const error = document.querySelector('.py-repl-output .py-error');

    const updateResult = (id, newResult) => {
      setPython((prev) =>
        prev.map((el) =>
          Number(el.id) === Number(id) ? { ...el, result: newResult } : el,
        ),
      );
    };

    if (error) {
      const errMsg = 'Error:' + error.innerText.toString().split('Error:')[1];
      console.log('errMsg', errMsg);
      updateResult(
        id,
        'Error:' + error.innerText.toString().split('Error:')[1],
      );
      // setResult('Error:' + error.innerText.toString().split('Error:')[1]);
    } else {
      if (pyResult.innerText) {
        updateResult(id, pyResult.innerText);

        // setResult(pyResult.innerText);
      } else if (pyResult.innerText === '') {
        updateResult(id, 'None');

        // setResult('None');
      } else {
        updateResult(id, '결과값');

        // setResult('결과값');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// 파이썬 입력 컨텐츠 가져오기 및 저장
export const getPythonCode = (id) => {
  const content = document.querySelectorAll('.cm-content .cm-line');
  const list = [];

  content.forEach((el) => list.push(el.innerText));
  localStorage.setItem('pythonCode', list.join('\n'));

  console.log('list', list);

  console.log('id', id);
  return list.join('\n');
};

// 자바스크립트 코드 실행
export const runJavascript = async (lang, code, setResult) => {
  window.localStorage.setItem(`${lang}Code`, code);

  const regex = /{([\s\S]*)}/;

  try {
    if (code.match(regex)) {
      const returnVal = code.match(regex)[1].toString();
      const result = new Function(returnVal)();
      setResult(result);

      if (Object.prototype.toString.call(result) === '[object Object]') {
        setResult('Error: object is not iterable');
      } else if (result instanceof Set) {
        setResult(JSON.stringify(Array.from(result)));
      } else if (result === undefined) {
        setResult('undefined');
      } else if (result === null) {
        setResult('null');
      } else if (Array.isArray(result)) {
        setResult(JSON.stringify(result));
      } else if (typeof result === 'string') {
        setResult(`"${result}"`);
      } else if (typeof result === 'boolean') {
        setResult(JSON.stringify(result));
      }
    } else {
      const result = new Function(code)();
    }
  } catch (error) {
    setResult('Error:' + error.message);
  }
};
