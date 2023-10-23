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

// 코드 복사
export const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    alert('코드가 클립보드에 복사되었습니다.');
  } catch (err) {
    alert('코드 복사에 실패하였습니다.');
  }
};
