import Footer from '@/components/layouts/footer/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/book/BookList';
import Header from '@/components/layouts/header/Header';

export default function Home() {
  return (
    <>
      <Header type="intro" />
      <div className="layout-grow">
        <Banner />
        <BookList />
      </div>
      <Footer intro={true} />
    </>
  );
}
