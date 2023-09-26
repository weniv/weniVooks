'use client';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

import styles from './ScrollBar.module.scss';

export default function ScrollBar() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage = Math.floor(
        (scrollTop / (scrollHeight - clientHeight)) * 100,
      );

      setPercentage(scrollPercentage);
    }, 100);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.scroll}>
      <div
        style={{
          transform: `translateX(${-100 + percentage}%)`,
        }}></div>
    </div>
  );
}
