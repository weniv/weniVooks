import axios from 'axios';

export const runPython = async (code, title, setResult) => {
  try {
    const result = await axios.post('/api/executePython', {
      code: code,
      title: title,
    });
    setResult(result.data.result);
  } catch (err) {
    console.log(err);
  }
};
