import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/book/BookList';

export default function Home() {
  return (
    <>
      <Header scroll="false" />
      <div className="layout-grow">
        <Banner />
        <BookList />
      </div>
      <Footer intro={true} />
    </>
  );
}
