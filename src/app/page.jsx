import Header from '@/components/layouts/Header';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      {/* 임시 컨텐츠 */}
      <div style={{ height: '200vh' }}>
        <Link href="/python">python 링크이동</Link>
      </div>
    </>
  );
}
