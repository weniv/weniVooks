import Footer from '@/components/layouts/footer/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/book/BookList';
import Header from '@/components/layouts/header/Header';
import BtnTop from '@/components/common/button/BtnTop';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src="/analytics/analytics-click.js"></Script>

      <Header type="intro" />
      <div className="layout-grow">
        <Banner />
        <BookList />
      </div>
      <Footer intro={true} />
      <BtnTop />
    </>
  );
}
