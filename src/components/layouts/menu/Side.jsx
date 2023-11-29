'use client';
import styles from './Side.module.scss';

import { useContext, useEffect, useState } from 'react';

import useWindowSize from '@/utils/useWindowSize';
import { SettingContext } from '@/context/SettingContext';
import Nav from '../side/Nav';
import BtnIcon from '../../common/button/BtnIcon';
import Footer from '../Footer';
import SVGList from '../../svg/SVGList';
import classNames from 'classnames';
import SVGListClose from '../../svg/SVGListClose';
import { usePathname } from 'next/navigation';

export default function Side(props) {
  const path = usePathname();
  const { windowWidth } = useWindowSize();
  const { menu, setMenu } = useContext(SettingContext);
  const [slide, setSlide] = useState(null);
  const [isDOM, setIsDOM] = useState(menu === 'close' ? false : true);

  const slideIn = () => {
    setIsDOM(true);
    setMenu('open');
    setSlide('slideIn');

    localStorage.removeItem('menu');
  };

  const slideOut = () => {
    setMenu('close');
    setSlide('slideOut');
    setTimeout(() => {
      setIsDOM(false);
    }, 300);
    localStorage.setItem('menu', 'close');
  };

  useEffect(() => {
    if (windowWidth !== null && windowWidth <= 1024) {
      setMenu('close');
      setIsDOM(false);
      localStorage.setItem('menu', 'close');
    }
  }, [windowWidth, path]);

  useEffect(() => {
    if (menu === 'open' && windowWidth <= 1024) {
      document.body.style.cssText = `
      overflow: hidden;
      position: relative;
      height: 100%;`;
    } else {
      document.body.removeAttribute('style');
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, [menu, windowWidth]);

  return (
    <>
      {isDOM ? (
        <>
          <div
            className={classNames(
              'layout-side',
              styles.side,
              slide === null
                ? ''
                : slide === 'slideIn'
                ? styles.menuShow
                : styles.menuHide,
            )}
          >
            <Nav {...props} />
            <BtnIcon
              className={styles.btnClose}
              children={<SVGListClose color="grayLv3" />}
              onClick={slideOut}
              bordernone="true"
            />
            {windowWidth >= 1024 && <Footer />}
          </div>
          {menu === 'open' && windowWidth < 1024 && (
            <div
              className={classNames(
                'dim',
                slide === 'slideIn' ? styles.dimShow : styles.dimHide,
              )}
              onClick={slideOut}
            ></div>
          )}
        </>
      ) : (
        <BtnIcon
          className={classNames(
            styles.openBtn,
            menu == 'close' ? styles['openBtn-show'] : styles['openBtn-hide'],
          )}
          children={<SVGList color="grayLv3" />}
          onClick={slideIn}
          bordernone="true"
        />
      )}
    </>
  );
}
