import React, { useCallback, useRef, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

import './CodeMirrorEditor.scss';

export default function CodeMirrorEditor({
  mode,
  inputText,
  setInputText,
  ...rest
}) {
  const editor = useRef(null);
  const wrapper = useRef(null);

  useEffect(() => {
    return () => {
      if (editor.current?.display?.wrapper) {
        editor.current.display.wrapper.remove();
      }
      if (wrapper.current) {
        wrapper.current.hydrated = false;
      }
    };
  }, []);

  const handleBeforeChange = useCallback(
    (_, __, value) => {
      setInputText(value);
    },
    [setInputText],
  );

  return (
    <CodeMirror
      ref={wrapper}
      value={inputText}
      options={{
        mode: mode,
        theme: 'custom',
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        indentUnit: 2,
        styleActiveLine: true,
        lineWiseCopyCut: true,
        autofocus: false, // 자동 포커스
        inputStyle: 'contenteditable', //한글 자모음 깨짐
      }}
      onBeforeChange={handleBeforeChange}
      editorDidMount={(e) => (editor.current = e)}
      {...rest}
    />
  );
}
