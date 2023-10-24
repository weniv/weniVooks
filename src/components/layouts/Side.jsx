'use client';

import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import BtnIcon from '../common/button/BtnIcon';
import SVGList from '../svg/SVGList';
import SVGListClose from '../svg/SVGListClose';

import styles from './Side.module.scss';
import classNames from 'classnames';
import Nav from './side/Nav';

export default function Side(props) {
  const [isMenuShow, setIsMenuShow] = useState(true);
  const [isSlide, setIsSlide] = useState(true);

  const slideIn = () => {
    setIsMenuShow(true);
    setIsSlide(true);
  };

  const slideOut = () => {
    setIsSlide(false);
    setTimeout(() => {
      setIsMenuShow(false);
    }, 300);
  };

  return (
    <>
      {isMenuShow ? (
        <div
          className={classNames(
            styles.side,
            isSlide ? styles.show : styles.hide,
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
            styles.btnOpen,
            isMenuShow ? styles.btnHide : styles.btnShow,
          )}
          children={<SVGList color="grayLv3" />}
          onClick={slideIn}
          bordernone="true"
        />
      )}
    </>
  );
}
