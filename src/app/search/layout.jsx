'use client';
import Header from '@/components/layouts/Header';
import BtnTop from '@/components/feature/BtnTop';

import styles from '../search/layout.module.scss';
import searchStyles from '../search/search.module.scss';
import classNames from 'classnames';
import Footer from '@/components/layouts/Footer';
import Btn from '@/components/common/button/Btn';
import SVGPrevArrow from '@/components/svg/SVGPrevArrow';
import SVGNextArrow from '@/components/svg/SVGNextArrow';
import useWindowSize from '@/context/useWindowSize';

export default function Layout({ children }) {
  const windowSize = useWindowSize();
  const prev = true;
  const next = true;

  return (
    <>
      <div className={classNames('layout-grow', styles.wrapper)}>
        <Header />
        <div className={styles.content}>
          <main className={searchStyles.main}>{children}</main>
        </div>
        <Footer intro={true} />
      </div>

      <div className={styles.btnWrap}>
        <Btn className={styles.btnPrev} disabled={!prev}>
          <SVGPrevArrow color="grayLv3" />
          {windowSize > 1024 && <span>{'이전'}</span>}
        </Btn>
        <Btn className={styles.btnNext} disabled={!next}>
          {windowSize > 1024 && <span>{'다음'}</span>}
          <SVGNextArrow color="grayLv3" />
        </Btn>
      </div>
      <BtnTop />
    </>
  );
}
