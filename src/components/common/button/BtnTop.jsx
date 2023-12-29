'use client';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

import styles from './BtnTop.module.scss';

import SVGTop from '../../svg/SVGTop';

export default function BtnTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, 100);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (show) {
    return (
      <button
        className={styles.topBtn}
        onClick={scrollToTop}
        children={<SVGTop alt="상단으로" color="grayLv3" />}
      />
    );
  }
}
