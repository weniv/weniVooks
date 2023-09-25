import { useState } from 'react';

import styles from './FontSizeRange.module.scss';

export default function FontSizeRange() {
  const MAX = 60;
  const [progress, setProgress] = useState(50);
  const onInput = (e) => {
    const target = e.target;
    setProgress((target.value / target.max) * 100);
  };

  return (
    <div className={styles.rangeFont}>
      <label htmlFor="fontSize" className="a11y-hidden">
        폰트사이즈
      </label>
      <input
        id="fontSize"
        type="range"
        name="fontSize"
        man="0"
        max={MAX}
        step="10"
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
