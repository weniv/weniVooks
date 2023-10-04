import styles from '@/components/layouts/Footer.module.scss';

import Logo from '../svg/Logo';

import ListSNS from './footer/ListSNS';
import WenivInfo from './footer/WenivInfo';

export default function Footer({ intro }) {
  return (
    <footer
      className={intro ? styles.introFooter : styles.footer}
      role="contentinfo"
    >
      {intro ? (
        <div className={styles.maxWidth}>
          <div className={styles.flex}>
            <h2>
              <Logo color="grayLv3" />
            </h2>
            <p>Copyright © 2023 WENIV All Rights Reserved</p>
          </div>

          <WenivInfo />
          <ListSNS color="grayLv3" />
        </div>
      ) : (
        <>
          <p>Copyright © 2023 WENIV All Rights Reserved</p>
          <ListSNS />
        </>
      )}
    </footer>
  );
}
