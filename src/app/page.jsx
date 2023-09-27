import Header from '@/components/layouts/Header';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
const Codeblock = dynamic(() => import('../components/feature/CodeBlock'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />
      {/* <div style={{ height: '200vh' }}>WeniVooks</div> */}
      <Codeblock lang="python" />
    </>
  );
}
