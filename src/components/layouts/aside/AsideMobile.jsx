import BtnIcon from '@/components/common/button/BtnIcon';
import { useState } from 'react';
import Toc from './Toc';
import SubBanner from './SubBanner';
import SVGUpArrow from '@/components/svg/SVGUpArrow';

import styles from './AsideMobile.module.scss';

export default function AsideMobile() {
  const [isMenuShow, setIsMenuShow] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  return (
    <div className={styles.toc__wrap}>
      {isMenuShow ? (
        <button type="button" onClick={toggleMenu}>
          목차
        </button>
      ) : (
        <>
          <h3>목차</h3>
          <Toc />
          <SubBanner />
          <BtnIcon
            onClick={toggleMenu}
            children={<SVGUpArrow alt="목차 닫기" color="grayLv3" />}
            bordernone="true"
            className={styles.btnClose}
          />
        </>
      )}
    </div>
  );
}
