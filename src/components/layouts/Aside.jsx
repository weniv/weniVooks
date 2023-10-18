'use client';

import { useState } from 'react';
import Link from 'next/link';

import BtnIcon from '../common/button/BtnIcon';
import SVGList from '../svg/SVGList';
import SVGListClose from '../svg/SVGListClose';

import styles from './Aside.module.scss';
import SubBanner from './aside/SubBanner';

export default function Aside() {
  const [isMenuShow, setIsMenuShow] = useState(true);
  const [isSlide, setIsSlide] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
    setIsSlide(!isSlide);
  };

  return isMenuShow ? (
    <aside className={`${styles.aside} ${styles.show}`}>
      <div className={styles.sublist}>
        <h3>연산과 구문</h3>
        <ol>
          <li>
            <Link href="">연산과 구문이란?</Link>
            <ol>
              <li>
                <Link href="">1.1 가르키는것</Link>
                <ol>
                  <li>
                    <Link href="">저희 집에는 아이가 있습니다.</Link>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <Link href="">2. 변수 이름의 규칙</Link>
            <ol>
              <li>
                <Link href="">2.1 변수 이름 짓기</Link>
              </li>
              <li>
                <Link href="">2.2 올바른 변수 이름의 예</Link>
              </li>
              <li>
                <Link href="">2.2 잘못된 변수 이름의 예</Link>
              </li>
            </ol>
          </li>
        </ol>

        <BtnIcon
          className={`${styles.btnClose}`}
          onClick={toggleMenu}
          children={<SVGListClose alt="접기" color="grayLv3" />}
          bordernone={true}
        />
      </div>
      <SubBanner />
    </aside>
  ) : (
    <aside className={`${styles.aside} ${styles.hide}`}>
      <BtnIcon
        className={`${styles.btnOpen}`}
        onClick={toggleMenu}
        children={<SVGList alt="열기" color="grayLv3" />}
      />
    </aside>
  );
}
