import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './CodeMirrorEditor.scss';

const CodeMirror = dynamic(
  () => {
    return import('react-codemirror2').then((mod) => mod.UnControlled);
  },
  { ssr: false },
);

export default function CodeMirrorEditor({
  mode,
  inputText,
  setInputText,
  minHeight = '300px',
  maxHeight = '500px',
  ...rest
}) {
  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState('auto');

  const debouncedSetInputText = useCallback(
    debounce((newValue) => {
      setInputText(newValue);
    }, 300),
    [setInputText],
  );

  const updateEditorHeight = useCallback(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      const contentHeight = editor.display.sizer.offsetHeight;
      const newHeight = Math.max(
        Math.min(contentHeight, parseInt(maxHeight)),
        parseInt(minHeight),
      );
      setEditorHeight(`${newHeight}px`);
    }
  }, [maxHeight, minHeight]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      const currentValue = editor.getValue();
      if (currentValue !== inputText) {
        const scrollInfo = editor.getScrollInfo();
        const cursor = editor.getCursor();
        editor.operation(() => {
          editor.setValue(inputText);
          editor.setCursor(cursor);
          editor.scrollTo(scrollInfo.left, scrollInfo.top);
        });
        updateEditorHeight();
      }
    }
  }, [inputText, updateEditorHeight]);

  const handleChange = useCallback(
    (editor, data, newValue) => {
      debouncedSetInputText(newValue);
      updateEditorHeight();
    },
    [debouncedSetInputText, updateEditorHeight],
  );

  const handleEditorDidMount = useCallback(
    (editor) => {
      editorRef.current = { editor };
      updateEditorHeight();
      // 초기 포커스 방지
      setTimeout(() => {
        editor.getInputField().blur();
      }, 100);
    },
    [updateEditorHeight],
  );

  return (
    <div
      style={{
        height: editorHeight,
        minHeight,
        maxHeight,
        overflow: 'auto',
      }}
      {...rest}
    >
      <CodeMirror
        editorDidMount={handleEditorDidMount}
        options={{
          mode: mode, // 코드의 언어 모드 설정 ('javascript', 'python')
          theme: 'custom', // 사용자 정의 테마 사용
          smartIndent: true, // 새 줄에서 자동으로 적절한 들여쓰기를 적용
          lineNumbers: true, // 줄 번호 표시
          matchBrackets: true, // 괄호 쌍 매칭 하이라이트
          indentUnit: 2, // 들여쓰기 단위 (스페이스 개수)
          styleActiveLine: true, // 현재 커서가 있는 줄 하이라이트
          lineWiseCopyCut: true, // 줄 단위로 복사/잘라내기 활성화
          autofocus: false, // 자동으로 에디터에 포커스
          inputStyle: 'textarea', // 입력 방식 설정
        }}
        onChange={handleChange}
      />
    </div>
  );
}
