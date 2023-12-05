'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import BtnIcon from '../common/button/BtnIcon';
import SVGList from '../svg/SVGList';
import SVGListClose from '../svg/SVGListClose';
import styles from './Aside.module.scss';
import SubBanner from './aside/SubBanner';
import Script from 'next/script';
import Toc from './aside/Toc';

export default function Aside() {
  const [isMenuShow, setIsMenuShow] = useState(true);
  const [isMinHeight, setIsMinHeight] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  // MEMO:: 최소 높이 확인하여 토글 메뉴 노출
  let timer;
  const resizeWindow = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsMinHeight(window.innerHeight >= 700 ? true : false);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [isMinHeight]);

  return (
    <>
      {isMinHeight &&
        (isMenuShow ? (
          <aside className={`${styles.aside} ${styles.show}`}>
            <div className={styles.sublist}>
              <h3>목차</h3>
              <Toc />

              <BtnIcon
                className={`${styles.btnClose}`}
                onClick={toggleMenu}
                children={<SVGListClose alt="접기" color="grayLv3" />}
                bordernone="true"
              />
            </div>
            <SubBanner />
          </aside>
        ) : (
          <aside className={`${styles.aside} ${styles.hide}`}>
            <BtnIcon
              className={`${styles.btnOpen}`}
              onClick={toggleMenu}
              children={<SVGList alt="열기" color="grayLv4" />}
            />
          </aside>
        ))}
      {/* <Script strategy="afterInteractive">{`(${String(script)})()`}</Script> */}
    </>
  );
}

const script = () => {
  const pageList = document.querySelector('#pageList');
  const main = document.querySelector('main');
  const headings = main.querySelectorAll('h4, h5, h6');
  let toc = '';
  let currentLevel = 4;

  headings.forEach((heading) => {
    let title = heading.innerHTML;
    let tagname = heading.tagName.toLowerCase();
    const level = parseInt(tagname[1]);

    if (level > currentLevel) {
      toc += '<ol>';
    } else if (level < currentLevel) {
      const levelDifference = currentLevel - level;
      toc += '</li>'.repeat(levelDifference) + '</ol>';
    } else {
      toc += '</li>';
    }

    // 내부 URL 생성
    const href = encodeURI(`${tagname}-${title}`);
    heading.id = href;
    toc += `<li class="${tagname}"><a href="#${href}">${title}</a>`;

    currentLevel = level;
  });

  if (currentLevel > 4) {
    toc += '</li>'.repeat(currentLevel - 1) + '</ol>';
  } else {
    toc += '</li>';
  }

  pageList.innerHTML = `<ol>${toc}</ol>`;
};
