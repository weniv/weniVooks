'use client';

import { useEffect, useState } from 'react';
import styles from './BtnCopy.module.scss';
import Btn from './Btn';
import { handleClipBoard } from '@/utils/handleClipBoard';

export default function BtnCopy() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const codes = Array.from(
      document.querySelectorAll('[data-rehype-pretty-code-fragment]'),
    );

    codes.forEach((code) => {
      const button = document.createElement('button');
      const span = document.createElement('span');
      span.textContent = 'copy';
      span.classList.add('a11y-hidden');
      button.type = 'button';
      button.classList.add(styles.copyBtn);
      button.append(span);
      button.addEventListener('click', (e) => {
        const text = code.querySelector('pre').textContent;

        handleClipBoard(text);
      });

      if (code.querySelector('pre.weniv-light')) {
        code.append(button);
      }
    });
  }, []);
}
