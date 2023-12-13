import '@/styles/sub.scss';

import styles from './layout.module.scss';

import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export const metadata = {
  title: '파이썬 코드 실행 | 위니북스',
};

export default function Layout({ children }) {
  return (
    <>
      <Header type="border" />

      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
