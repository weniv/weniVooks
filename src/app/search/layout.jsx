import Header from '@/components/layouts/Header';
import BtnTop from '@/components/feature/BtnTop';

import styles from '../search/layout.module.scss';
import searchStyles from '../search/search.module.scss';
import classNames from 'classnames';
import Footer from '@/components/layouts/Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className={classNames('layout-grow', styles.wrapper)}>
        <Header />
        <div className={styles.content}>
          <main className={searchStyles.main}>{children}</main>
        </div>
        <Footer intro={true} />
      </div>

      <BtnTop />
    </>
  );
}
