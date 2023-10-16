import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/card/BookList';

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
