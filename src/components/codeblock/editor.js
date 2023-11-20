import CodeMirror from 'codemirror';
import '@/components/codeblock/codemirror.css';
import '@codemirror/mode/javascript/javascript.js';
import '@codemirror/mode/python/python.js';
import '@codemirror/theme/dracula.css';
import '@codemirror/theme/ayu-dark.css';
import '@codemirror/addon/selection/active-line.js';

// CodeMirror 초기화
export default function initEditor(
  editor,
  lang,
  code,
  setCode,
  setEditor,
  codeMirrorRef,
) {
  if (!editor) {
    const cm = CodeMirror.fromTextArea(codeMirrorRef.current, {
      mode: lang,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      indentUnit: 2,
      theme: 'default',
      styleActiveLine: true,
    });

    cm.setValue(code);
    cm.on('change', (instance) => {
      const value = instance.getValue();
      setCode(value);
    });

    setEditor(cm); // CodeMirror 인스턴스 저장
  }
}
