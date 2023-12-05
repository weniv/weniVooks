import BtnIcon from '@/components/common/button/BtnIcon';
import { useEffect, useState } from 'react';
import Toc from './Toc';
import SubBanner from './SubBanner';
import SVGUpArrow from '@/components/svg/SVGUpArrow';

import styles from './AsideMobile.module.scss';
import SVGDownArrow from '@/components/svg/SVGDownArrow';
import classNames from 'classnames';

export default function AsideMobile() {
  const [isMenuShow, setIsMenuShow] = useState(false);

  const toggleMenu = () => {
    setIsMenuShow((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const isToc = e.target.closest('.toc');

      console.log(isToc);
      if (isMenuShow && !isToc) {
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
    <div className={classNames(isMenuShow ? styles.active : '', styles.toc)}>
      <div className={`toc ${styles.toc__wrap}`}>
        {!isMenuShow ? (
          <button
            className={styles.toc__open}
            type="button"
            onClick={toggleMenu}
          >
            목차
            <SVGDownArrow alt="열기" color="grayLv3" />
          </button>
        ) : (
          <>
            <h3 className={styles.toc__title}>목차</h3>
            <Toc toggleMenu={toggleMenu} />
            <SubBanner />
            <button
              type="button"
              className={styles.toc__close}
              onClick={toggleMenu}
            >
              <SVGUpArrow color="grayLv3" />
              <span className="a11y-hidden">목차 닫기</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
