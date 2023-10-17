'use client';

import styles from './Banner.module.scss';
import BannerItem from './BannerItem';
import { useState } from 'react';

export default function Banner() {
  const CONTROLL_ID = 'slide_ctrl';
  const [page, setPage] = useState(0);
  const bannerData = require('/public/data/mainBannerData.json');

  const onClick = (e) => {
    setPage(Number(e.target.value));
  };

  return (
    <section className={styles.banner}>
      <h2 className="a11y-hidden">배너 모음</h2>
      <ul
        id={CONTROLL_ID}
        className={styles.bannerList}
        aria-live="polite"
        style={{ transform: `translateX(${-100 * page}vw)` }}
      >
        {bannerData.map((banner, index) => (
          <BannerItem
            key={index}
            data={banner}
            ariaHidden={page === index ? true : false}
          />
        ))}
      </ul>

      <ul className={styles.bannerPager}>
        {bannerData.map((_, index) => (
          <li key={index}>
            <button
              type="button"
              data-slide-index={index}
              aria-controls={CONTROLL_ID}
              aria-current={page === index ? true : false}
              aria-label={`배너${index}`}
              value={index}
              className={page === index ? styles.active : styles.default}
              onClick={onClick}
            >
              <span className="a11y-hidden">{`배너${index}`}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
