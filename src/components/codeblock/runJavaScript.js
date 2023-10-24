export default function runJavascript(code, setResult) {
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
}
