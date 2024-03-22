import React from 'react';
import styles from '@/components/codeblock/CodeBlock.module.scss';

export default function Layout({ children }) {
  return (
    <div
      className={styles.editor}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}
