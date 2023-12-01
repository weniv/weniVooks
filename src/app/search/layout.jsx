import Header from '@/components/layouts/header/Header';
import BtnTop from '@/components/common/button/BtnTop';

import styles from '../search/layout.module.scss';
import searchStyles from '../search/search.module.scss';
import classNames from 'classnames';
import Footer from '@/components/layouts/footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className={classNames('layout-grow', styles.wrapper)}>
        <Header scroll="false" border="true" />
        <div className={styles.content}>
          <main className={searchStyles.main}>{children}</main>
        </div>
        <Footer intro={true} />
      </div>

      <BtnTop />
    </>
  );
}
