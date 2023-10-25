import { useContext, useEffect, useState } from 'react';

import styles from './FontSizeRange.module.scss';
import { SettingContext } from '@/context/SettingContext';

export default function FontSizeRange() {
  const { fontSize, setFontSize } = useContext(SettingContext);
  const MAX = 4;

  const [progress, setProgress] = useState(50);
  const onInput = (e) => {
    const target = e.target;
    localStorage.setItem('fontSize', target.value);
    setProgress((target.value / MAX) * 100);
    setFontSize(target.value);
  };

  useEffect(() => {
    setProgress((fontSize / MAX) * 100);
  }, []);

  return (
    <div className={styles.rangeFont}>
      <label htmlFor="fontSize" className="a11y-hidden">
        폰트사이즈
      </label>
      <input
        id="fontSize"
        type="range"
        name="fontSize"
        min="0"
        max={MAX}
        step="1"
        value={fontSize}
        onInput={onInput}
        style={{
          background: `linear-gradient(to right, var(--primary) ${progress}%, var(--grayLv2) ${progress}%)`,
        }}
      />
      <p className={styles.text}>
        <span>작게</span>
        <span>기본</span>
        <span>크게</span>
      </p>
    </div>
  );
}
