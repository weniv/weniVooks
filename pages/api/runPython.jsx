import { spawnSync } from 'child_process';

export default (req, res) => {
  try {
    let formattingCode;

    const code = req.query.code
      .split('):')[1]
      .replace('\r', '')
      .replace(/^\s+/gm, '');

    // return은 실행이 안되므로 print로 실행가능하도록 포맷팅
    if (code.split('return').length !== 1) {
      const regex = /return\s+(.*?)\s*(?:,|$)/g;
      const returnVal = code.split('return')[1].trim();
      formattingCode = code.replace(regex, `print(${returnVal})`);
    } else {
      formattingCode = code;
    }

    const color = '#121314';
    const pythonProcess = spawnSync('python', ['-c', formattingCode]);
    const pythonResult = pythonProcess.stdout
      .toString()
      .replace(/[\r\n]+/g, '');

    const obj = typeCheck(pythonResult, color);

    if (!pythonResult) {
      throw new Error();
    }

    res.status(200).json(obj);
  } catch (err) {
    res
      .status(200)
      .json({ result: 'Python 결과가 에러입니다.', color: '#C93864' });
  }
};

const typeCheck = (result, color) => {
  let typeResult = result;
  let typeColor = color;
  if (/^\d+$/.test(result)) {
    // 숫자 타입인지 확인
    typeColor = '#328026';
  } else if (/\[[^\]]*\]|\([^)]*\)|\{[^}]*\}|{[^}]*}/g.test(result)) {
    // list, set, tuple, dict 타입인지 확인
    typeColor = '#121314';
  } else if (result === 'True' || result === 'False') {
    // boolean 타입인지 확인
    typeColor = '#C93864';
  } else {
    // 문자열 타입의 경우
    typeResult = `'${result}'`;
    typeColor = '#2E5DD6';
  }

  const resultObj = { result: typeResult, color: typeColor };
  return resultObj;
};
