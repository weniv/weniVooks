import Header from '@/components/layouts/Header';
import styles from './page.module.scss';
import Footer from '@/components/layouts/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="layout-grow">WeniVooks</div>
      <Footer intro={true} />
    </>
  );
}
