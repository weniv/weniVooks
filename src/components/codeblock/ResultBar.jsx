import React from 'react';
import styles from '@/components/codeblock/CodeBlock.module.scss';

export default function ResultBar({ result }) {
  return (
    <div className={styles.resultbar}>
      <p id="result">{result}</p>
      <div id="output" class="p-4"></div>
    </div>
  );
}
