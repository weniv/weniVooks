import React from 'react';
import styles from '@/components/codeblock/CodeBlock.module.scss';

export default function Layout({ children, event }) {
  return (
    <div
      className={styles.editor}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault();
          // event();
        }
      }}
    >
      {children}
    </div>
  );
}
