'use client';

import { useContext, useEffect, useState } from 'react';
import Footer from './Footer';
import BtnIcon from '../common/button/BtnIcon';
import SVGList from '../svg/SVGList';
import SVGListClose from '../svg/SVGListClose';

import styles from './Side.module.scss';
import classNames from 'classnames';
import Nav from './side/Nav';
import useWindowSize from '@/context/useWindowSize';
import { SettingContext } from '@/context/SettingContext';

export default function Side(props) {
  const windowSize = useWindowSize();
  const { isOpenMenu, setIsOpenMenu } = useContext(SettingContext);
  const [isSlide, setIsSlide] = useState(isOpenMenu);

  const slideIn = () => {
    setIsOpenMenu(true);
    setIsSlide(true);
    localStorage.removeItem('isOpenMenu');
  };

  const slideOut = () => {
    setIsSlide(false);
    setTimeout(() => {
      setIsOpenMenu(false);
      localStorage.setItem('isOpenMenu', 'false');
    }, 300);
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.cssText = `
      overflow: hidden;
      position: relative;
      height: 100%;`;
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, [isOpenMenu]);

  return (
    <>
      {isOpenMenu ? (
        <div
          className={classNames(
            styles.side,
            isSlide === null
              ? styles.default
              : isSlide
              ? styles.show
              : styles.hide,
          )}
        >
          <Nav {...props} />
          <BtnIcon
            className={styles.btnClose}
            children={<SVGListClose color="grayLv3" />}
            onClick={slideOut}
            bordernone="true"
          />
          {windowSize >= 1024 && <Footer />}
        </div>
      ) : (
        <BtnIcon
          className={classNames(
            styles.btnOpen,
            isOpenMenu ? styles.btnHide : styles.btnShow,
          )}
          children={<SVGList color="grayLv3" />}
          onClick={slideIn}
          bordernone="true"
        />
      )}

      {isOpenMenu && windowSize < 1024 && (
        <div
          className={classNames(
            'dim',
            isSlide ? styles.dimShow : styles.dimHide,
          )}
          onClick={slideOut}
        ></div>
      )}
    </>
  );
}
