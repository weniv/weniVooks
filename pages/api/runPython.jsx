import { spawnSync } from 'child_process';

export default (req, res) => {
  // 파이썬 코드 실행
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

  try {
    const pythonProcess = spawnSync('python', ['-c', formattingCode]);
    const pythonResult = pythonProcess.stdout
      .toString()
      .replace(/[\r\n]+/g, '');

    console.log('Python 결과:', pythonResult);

    if (!pythonResult) {
      throw new Error();
    }

    res.status(200).json({ result: pythonResult });
  } catch (err) {
    res.status(200).json({ result: 'Python 결과가 에러입니다.' });
  }
};
