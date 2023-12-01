'use client';

import { useState, useEffect } from 'react';

import BtnIcon from '../../common/button/BtnIcon';
import SVGList from '../../svg/SVGList';
import SVGListClose from '../../svg/SVGListClose';
import styles from './Aside.module.scss';
import SubBanner from './SubBanner';

import Toc from './Toc';

export default function Aside() {
  const [isMenuShow, setIsMenuShow] = useState(true);
  const [isMinHeight, setIsMinHeight] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  // MEMO:: 최소 높이 확인하여 토글 메뉴 노출
  let timer;
  const resizeWindow = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsMinHeight(window.innerHeight >= 700 ? true : false);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [isMinHeight]);

  return (
    <>
      {isMinHeight &&
        (isMenuShow ? (
          <aside className={`${styles.aside} ${styles.show}`}>
            <div className={styles.sublist}>
              <h3>목차</h3>
              <Toc />

              <BtnIcon
                className={`${styles.btnClose}`}
                onClick={toggleMenu}
                children={<SVGListClose alt="접기" color="grayLv3" />}
                bordernone="true"
              />
            </div>
            <SubBanner />
          </aside>
        ) : (
          <aside className={`${styles.aside} ${styles.hide}`}>
            <BtnIcon
              className={`${styles.btnOpen}`}
              onClick={toggleMenu}
              children={<SVGList alt="열기" color="grayLv4" />}
            />
          </aside>
        ))}
    </>
  );
}
