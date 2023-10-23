// localStorage에서 코드 초기값 불러오기
export const getSaveCode = (lang) => {
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
