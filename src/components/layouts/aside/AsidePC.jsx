import { useState } from 'react';

import styles from './AsidePC.module.scss';

// component
import BtnIcon from '@/components/common/button/BtnIcon';
import Toc from './Toc';
import SVGListClose from '@/components/svg/SVGListClose';
import SubBanner from './SubBanner';
import useWindowSize from '@/utils/useWindowSize';
import SVGList from '@/components/svg/SVGList';

export default function AsidePC() {
  const { windowHeight } = useWindowSize();
  const [isMenuShow, setIsMenuShow] = useState(true);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  if (windowHeight > 640) {
    return isMenuShow ? (
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
    );
  }
}
