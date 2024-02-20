import Footer from '@/components/layouts/footer/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/book/BookList';
import Header from '@/components/layouts/header/Header';
import BtnTop from '@/components/common/button/BtnTop';

export default function Home() {
  return (
    <>
      <Header type="intro" />
      <div className="layout-grow">
        <Banner />
        <h1>test444</h1>
        <BookList />
      </div>
      <Footer intro={true} />
      <BtnTop />
    </>
  );
}
