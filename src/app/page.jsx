import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Banner from '@/components/banner/Banner';
import BookList from '@/components/card/BookList';
import dynamic from 'next/dynamic';
const Codeblock = dynamic(() => import('../components/feature/CodeBlock'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />
      <div className="layout-grow">
        <Banner />
        <BookList />
      </div>
      <Footer intro={true} />
    </>
  );
}
