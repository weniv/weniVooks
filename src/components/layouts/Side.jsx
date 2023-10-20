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
  const { position, setPosition } = useContext(SettingContext);
  const [slide, setSlide] = useState(null);
  const windowSize = useWindowSize();

  const slideIn = () => {
    setMenu('open');
    setSlide('slideIn');

    localStorage.removeItem('menu');
  };

  const slideOut = () => {
    setMenu('close');
    setSlide('slideOut');
    localStorage.setItem('menu', 'close');
  };

  return (
    <>
      <div
        className={classNames(
          'layout-side',
          styles.side,
          menu === 'close' ? 'side-close' : 'side-open',
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
        {windowSize >= 1024 && <Footer />}
      </div>

      <BtnIcon
        className={classNames(
          styles.btnOpen,
          menu == 'close' ? styles['openBtn-show'] : styles['openBtn-hide'],
        )}
        children={<SVGList color="grayLv3" />}
        onClick={slideIn}
        bordernone="true"
      />
    </>
  );
}
