'use client';
import { useState } from 'react';
import BtnIcon from '../common/button/BtnIcon';
import SubBanner from './aside/SubBanner';
import Toc from './aside/Toc';
import SVGUpArrow from '../svg/SVGUpArrow';
import SVGDownArrow from '../svg/SVGDownArrow';

import styles from './AsideMobile.module.scss';
import classNames from 'classnames';

export default function AsideMobile() {
  const [isMenuShow, setIsMenuShow] = useState(false);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };
  return (
    <aside className={classNames(styles.aside, isMenuShow && styles.active)}>
      {!isMenuShow ? (
        <div className={styles.titleWrap}>
          <h3>목차</h3>
          <BtnIcon
            onClick={toggleMenu}
            children={<SVGDownArrow alt="열기" color="grayLv3" />}
            bordernone="true"
          />
        </div>
      ) : (
        <div className={styles.inner}>
          <h3>목차</h3>

          <Toc />

          <SubBanner />
          <BtnIcon
            onClick={toggleMenu}
            children={<SVGUpArrow alt="닫기" color="grayLv3" />}
            bordernone="true"
            className={styles.btnClose}
          />
        </div>
      )}
    </aside>
  );
}
