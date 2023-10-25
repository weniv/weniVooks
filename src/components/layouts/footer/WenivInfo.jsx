'use client';
import { useState } from 'react';

import styles from './WenivInfo.module.scss';

export default function WenivInfo() {
  const [info, setInfo] = useState(false);

  return (
    <div className={styles.wenivInfo}>
      <button
        type="button"
        className={`${styles.infoBtn} ${info ? styles.on : null}`}
        onClick={() => {
          setInfo(!info);
        }}
      >
        (주)위니브 사업자 정보
      </button>

      <ul className={`${styles.info} ${info ? styles.on : null}`}>
        <li>(주)위니브</li>
        <li>대표: 이호준</li>
        <li>사업자 번호: 546-86-01737</li>
        <li>정보통신업</li>
        <li>
          주소:{' '}
          <address>제주 제주시 첨단로 330 세미양빌딩 A동 1층 106호</address>
        </li>
      </ul>
    </div>
  );
}
