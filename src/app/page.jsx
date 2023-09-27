import Link from 'next/link';
import styles from './page.module.scss';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="layout-grow">
        WeniVooks
        <Link href="/python">python 링크이동</Link>
      </div>
      <Footer intro={true} />
    </>
  );
}
