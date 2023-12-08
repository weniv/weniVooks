'use client';
import { useEffect, useState } from 'react';
import BtnIcon from '../common/button/BtnIcon';
import SubBanner from './aside/SubBanner';
import Toc from './aside/Toc';
import SVGUpArrow from '../svg/SVGUpArrow';
import SVGDownArrow from '../svg/SVGDownArrow';

import styles from './AsideMobile.module.scss';
import classNames from 'classnames';

export default function AsideMobile() {
  const [isMenuShow, setIsMenuShow] = useState(false);

  const toggleMenu = () => {
    setIsMenuShow((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const isAside = e.target.closest('aside');
      if (isMenuShow && !isAside) {
        toggleMenu(false);
      }
    };
    const handleESC = (e) => {
      if (isMenuShow && e.key === 'Escape') {
        toggleMenu(false);
      }
    };

    if (isMenuShow) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);
      }, 100);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isMenuShow]);

  return (
    <aside className={classNames(styles.aside, isMenuShow && styles.active)}>
      <div className={styles.inner}>
        {!isMenuShow ? (
          <div className={styles.titleWrap}>
            <h3>목차</h3>
            <BtnIcon
              type="button"
              onClick={toggleMenu}
              children={<SVGDownArrow alt="열기" color="grayLv3" />}
              bordernone="true"
            />
          </div>
        ) : (
          <>
            <h3>목차</h3>

            <Toc mobile toggleMenu={toggleMenu} />

            <SubBanner />
            <BtnIcon
              onClick={toggleMenu}
              children={<SVGUpArrow alt="목차 닫기" color="grayLv3" />}
              bordernone="true"
              className={styles.btnClose}
            />
          </>
        )}
      </div>
    </aside>
  );
}
