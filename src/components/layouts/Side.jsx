'use client';
import styles from './Side.module.scss';

import { useContext, useEffect, useState } from 'react';

import useWindowSize from '@/context/useWindowSize';
import { SettingContext } from '@/context/SettingContext';
import Nav from './side/Nav';
import BtnIcon from '../common/button/BtnIcon';
import Footer from './Footer';
import SVGList from '../svg/SVGList';
import classNames from 'classnames';
import SVGListClose from '../svg/SVGListClose';

export default function Side(props) {
  const { menu, setMenu } = useContext(SettingContext);
  const [slide, setSlide] = useState(null);
  const [isDOM, setIsDOM] = useState(menu === 'close' ? false : true);

  const windowSize = useWindowSize();

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

  return (
    <>
      {isDOM ? (
        <div
          className={classNames(
            'layout-side',
            styles.side,
            // menu === 'close' ? 'side-close' : 'side-open',
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
          <Footer />
        </div>
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
