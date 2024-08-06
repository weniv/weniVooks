import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
import Header from './Header';
import ResultBar from './ResultBar';
import { getInitJavascriptCode, runJavascript, copyCode } from './event';
import initEditor from './editor';

export default function JavascriptCodeblock() {
  const lang = 'javascript';
  const codeMirrorRef = useRef(null);
  const [editor, setEditor] = useState(null); // CodeMirror 인스턴스를 관리
  const [code, setCode] = useState(getInitJavascriptCode);
  const [result, setResult] = useState('결과값');

  // CodeMirror 초기화
  useEffect(() => {
    initEditor(editor, lang, code, setCode, setEditor, codeMirrorRef);
  }, [code, editor]);

  const event = () => {
    return runJavascript(lang, code, setResult);
  };
  

  const copy = () => {
    copyCode(code);
  };

  return (
    <Layout event={event}>
      <Header event={event} copyCode={copy} />
      <textarea id="codeeditor" ref={codeMirrorRef}></textarea>
      <ResultBar result={result} />
    </Layout>
  );
}
