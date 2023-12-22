'use client';
import styles from './Side.module.scss';

import { useContext, useEffect, useRef, useState } from 'react';

import useWindowSize from '@/utils/useWindowSize';
import { SettingContext } from '@/context/SettingContext';
import Nav from './Nav';
import BtnIcon from '../../common/button/BtnIcon';
import Footer from '../footer/Footer';
import SVGList from '../../svg/SVGList';
import classNames from 'classnames';
import SVGListClose from '../../svg/SVGListClose';
import { usePathname } from 'next/navigation';

export default function Side(props) {
  const path = usePathname();

  const { windowWidth } = useWindowSize();
  const { isSavedClose, setIsSavedClose } = useContext(SettingContext);
  const [isShowMenu, setIsShowMenu] = useState(isSavedClose ? false : true);
  const slideRef = useRef(null);

  const handleFocusFirst = (e) => {
    if (windowWidth <= 1024 && !e.shiftKey && e.key === 'Tab') {
      e.preventDefault();

      const firstItem = slideRef.current.querySelector('a, button');
      firstItem.focus();
    }
  };

  const handleFocusLast = (e) => {
    if (e.shiftKey && e.key === 'Tab') {
      e.preventDefault();

      const clickItems = slideRef.current.querySelectorAll('a, button');
      const lastItem = clickItems[clickItems.length - 1];
      lastItem.focus();
    }
  };

  const toggleMenu = () => {
    if (isShowMenu) {
      // SlideOut(닫힘)
      slideRef.current.classList.add(styles.slideOut);
      setTimeout(() => {
        setIsShowMenu(false);
        if (windowWidth > 1024) {
          localStorage.setItem('menu', 'close');
          setIsSavedClose(true);
        }
      }, 300);
    } else {
      // SlideIn(열림)
      setIsShowMenu(true);
      setTimeout(() => {
        slideRef.current.classList.add(styles.slideIn);

        const firstItem = slideRef.current.querySelector('a, button');
        firstItem.focus();

        if (windowWidth > 1024) {
          localStorage.removeItem('menu');
          setIsSavedClose(false);
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (windowWidth !== null && windowWidth <= 1024) {
      // 모바일
      setIsShowMenu(false);
    } else {
      // PC
      setIsShowMenu(isSavedClose ? false : true);
    }
  }, [windowWidth, path]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!slideRef.current.contains(e.target)) {
        setIsShowMenu(false);
      }
    };
    const handleESC = (e) => {
      if (e.key === 'Escape') {
        toggleMenu();
      }
    };

    if (isShowMenu && windowWidth !== null && windowWidth < 1024) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);

        const firstItem = slideRef.current.querySelector('a, button');
        firstItem.addEventListener('keydown', handleFocusLast);
      });
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isShowMenu]);

  return (
    <>
      {isShowMenu && (
        <>
          <div ref={slideRef} className={classNames(styles.side)}>
            <Nav {...props} />
            <Footer />
            <BtnIcon
              className={styles.btnClose}
              children={<SVGListClose color="grayLv3" />}
              bordernone="true"
              onClick={toggleMenu}
              onKeyDown={handleFocusFirst}
            />
          </div>
          {windowWidth !== null && windowWidth < 1024 && (
            <>
              <div className="dim"></div>
            </>
          )}
        </>
      )}
      <button
        type="button"
        className={classNames(
          styles.btnOpen,
          isShowMenu ? styles.hide : styles.show,
        )}
        onClick={toggleMenu}
        disabled={isShowMenu ? true : false}
      >
        <SVGList color="grayLv3" />
        <span className="a11y-hidden">메뉴 열기</span>
      </button>
    </>
  );
}
