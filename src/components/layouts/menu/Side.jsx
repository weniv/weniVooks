'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

import styles from './Side.module.scss';

import { SettingContext } from '@/context/SettingContext';

import useWindowSize from '@/utils/useWindowSize';
import { handleAllowScroll, handlePreventScroll } from '@/utils/handleScroll';

import Nav from './Nav';
import BtnIcon from '../../common/button/BtnIcon';
import Footer from '../footer/Footer';
import SVGList from '../../svg/SVGList';
import SVGListClose from '../../svg/SVGListClose';

export default function Side(props) {
  const path = usePathname();

  const { windowWidth } = useWindowSize();
  const { isSavedClose, setIsSavedClose } = useContext(SettingContext);
  const [isMenuShow, setIsMenuShow] = useState(
    isSavedClose ? false : windowWidth <= 1024 ? false : true,
  );
  const slideRef = useRef(null);

  const handleFocusFirst = (e) => {
    if (windowWidth <= 1024 && !e.shiftKey && e.key === 'Tab') {
      e.preventDefault();

      const firstItem = slideRef?.current.querySelector('a, button');
      firstItem.focus();
    }
  };

  const handleFocusLast = (e) => {
    if (e.shiftKey && e.key === 'Tab') {
      e.preventDefault();

      const clickItems = slideRef?.current.querySelectorAll('a, button');
      const lastItem = clickItems[clickItems.length - 1];
      lastItem.focus();
    }
  };

  const toggleMenu = () => {
    if (isMenuShow) {
      // SlideOut(닫힘)
      slideRef?.current.classList.add(styles.slideOut);
      handleAllowScroll();
      setTimeout(() => {
        setIsMenuShow(false);
        if (windowWidth > 1024) {
          localStorage.setItem('menu', 'close');
          setIsSavedClose(true);
        }
      }, 300);
    } else {
      // SlideIn(열림)
      setIsMenuShow(true);

      if (windowWidth <= 1024) {
        handlePreventScroll();
      }

      setTimeout(() => {
        slideRef?.current.classList.add(styles.slideIn);

        const firstItem = slideRef?.current.querySelector('a, button');
        if (firstItem) {
          firstItem.focus();
        }

        if (windowWidth > 1024) {
          localStorage.removeItem('menu');
          setIsSavedClose(false);
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (windowWidth <= 1024 && isMenuShow) {
      setIsMenuShow(false);
    } else if (windowWidth > 1024) {
      setIsMenuShow(isSavedClose ? false : true);
      handleAllowScroll();
    }
  }, [windowWidth, path]);

  useEffect(() => {
    document.body.removeAttribute('style');
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!slideRef?.current.contains(e.target)) {
        toggleMenu();
      }
    };
    const handleESC = (e) => {
      if (e.key === 'Escape') {
        toggleMenu();
      }
    };

    if (isMenuShow && windowWidth !== null && windowWidth <= 1024) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);

        const firstItem = slideRef.current?.querySelector('a, button');
        firstItem?.addEventListener('keydown', handleFocusLast);
      });
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isMenuShow, slideRef]);

  return (
    <>
      {isMenuShow && (
        <>
          <div ref={slideRef} className={classNames(styles.side)}>
            <Nav {...props} />
            {windowWidth !== null && windowWidth > 1024 && <Footer />}
            <BtnIcon
              className={styles.btnClose}
              bordernone="true"
              onClick={toggleMenu}
              onKeyDown={handleFocusFirst}
            >
              <SVGListClose color="grayLv3" />
              <span className="a11y-hidden">메뉴 닫기</span>
            </BtnIcon>
          </div>
          {windowWidth !== null && windowWidth <= 1024 && (
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
          isMenuShow ? styles.hide : styles.show,
        )}
        onClick={toggleMenu}
        disabled={isMenuShow ? true : false}
      >
        <SVGList color="grayLv3" />
        <span className="a11y-hidden">메뉴 열기</span>
      </button>
    </>
  );
}
