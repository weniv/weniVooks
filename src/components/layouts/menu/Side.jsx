'use client';
import styles from './Side.module.scss';

import { useContext, useEffect, useState } from 'react';

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

  const [isMenuOpen, setIsMesuOpen] = useState(false);
  const [isInDOM, setIsInDOM] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // 열림 -> 닫힘
      setIsMesuOpen(false);

      windowWidth > 1024 && localStorage.setItem('menu', 'close');
    } else {
      // 닫힘 -> 열림
      setIsMesuOpen(true);

      windowWidth > 1024 && localStorage.removeItem('menu');
    }
  };
  return (
    <>
      {isMenuOpen ? (
        <div className={classNames(styles.side)}>
          <Nav {...props} />
          <BtnIcon
            className={styles.btnClose}
            children={<SVGListClose color="grayLv3" />}
            bordernone="true"
            onClick={toggleMenu}
          />
        </div>
      ) : (
        <button type="button" className={styles.btnOpen} onClick={toggleMenu}>
          <SVGList color="grayLv3" />
          <span className="a11y-hidden">메뉴 열기</span>
        </button>
      )}
    </>
  );
}
