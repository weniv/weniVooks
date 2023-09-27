'use client';

import { useRef, useState } from 'react';
import Footer from './Footer';
import BtnIcon from '../common/button/BtnIcon';
import SVGList from '../svg/SVGList';
import SVGListClose from '../svg/SVGListClose';

import styles from './Side.module.scss';
import classNames from 'classnames';
import Nav from './side/Nav';

export default function Side(props) {
  const [isMenuShow, setIsMenuShow] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow((prev) => !prev);
  };

  return (
    <>
      {isMenuShow ? (
        <div className={classNames(styles.side)}>
          <Nav {...props} />
          <BtnIcon
            className={styles.btnClose}
            children={<SVGListClose color="grayLv3" />}
            onClick={toggleMenu}
          />
          <Footer />
        </div>
      ) : (
        <BtnIcon
          className={classNames(
            styles.btnOpen,
            isMenuShow ? styles.btnHide : styles.btnShow,
          )}
          children={<SVGList color="grayLv3" />}
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
