import { spawnSync } from 'child_process';

export default (req, res) => {
  try {
    const code = req.body.code;
    const title = req.body.title;

    const pythonCode = title ? code + `\nprint(${title}())` : code;
    const pythonProcess = spawnSync('python', ['-c', pythonCode], {
      encoding: 'utf-8',
    });

    if (pythonProcess.stderr && pythonProcess.stderr.length > 0) {
      const errmsg = pythonProcess.stderr.toString().split('Error:')[1];
      res.status(200).json({ result: 'Error:' + decodeUnicodeEscapes(errmsg) });
    } else {
      const result = pythonProcess.stdout.toString();
      if (result) {
        res.status(200).json({ result: pythonProcess.stdout.toString() });
      } else {
        res.status(200).json({ result: 'None' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const decodeUnicodeEscapes = (input) => {
  return input.replace(/\\u([\d\w]{4})/gi, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16));
  });
};
