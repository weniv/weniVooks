'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './HtmlCssEditor.module.scss';
import classNames from 'classnames';
import CodeCopyBtn from './common/CodeCopyBtn';
import CodeResetBtn from './common/CodeResetBtn';

const CodeMirrorEditor = dynamic(() => import('./CodeMirrorEditor'), {
  ssr: false,
});

const HtmlCssEditor = ({ initialHtml, initialCss }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [activeTab, setActiveTab] = useState('html');

  const previewContent = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;
  }, [html, css]);

  return (
    <div className={styles.editor_container}>
      <div className={styles.editor_wrap}>
        <div className={styles.editor_header}>
          <div className={styles.editor_tab}>
            {['html', 'css'].map((tab) => (
              <button
                key={tab}
                className={classNames(
                  styles.tab_btn,
                  activeTab === tab ? styles.active : '',
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="btn-group">
            <CodeCopyBtn code={activeTab === 'html' ? html : css} />
            <CodeResetBtn
              onClick={() => {
                setHtml(initialHtml);
                setCss(initialCss);
              }}
            />
          </div>
        </div>

        <CodeMirrorEditor
          mode={activeTab === 'html' ? 'htmlmixed' : 'css'}
          inputText={activeTab === 'html' ? html : css}
          setInputText={activeTab === 'html' ? setHtml : setCss}
          className={
            activeTab === 'html' ? styles.html_editor : styles.css_editor
          }
        />
      </div>
      <div className={styles.preview_wrap}>
        <p className={styles.preview_title}>Preview</p>
        <iframe
          className={styles.htmlcssPreview}
          title="preview"
          sandbox="allow-scripts"
          srcDoc={previewContent}
        ></iframe>
      </div>
    </div>
  );
};

export default HtmlCssEditor;
