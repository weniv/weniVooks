'use client';

import React, { useState } from 'react';
import styles from './Tooltip.module.scss';

export default function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
}
