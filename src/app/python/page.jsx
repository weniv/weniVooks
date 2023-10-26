'use client';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import useWindowSize from '@/context/useWindowSize';

import dynamic from 'next/dynamic';
const CodeBlock = dynamic(
  () => import('../../components/codeblock/CodeBlock'),
  {
    ssr: false,
  },
);

export default function Home() {
  const pythonMenu = require('public/data/pythonMenu.json');
  const windowSize = useWindowSize();

  return (
    <div>
      {windowSize > 1024 && <Breadcrumb data={pythonMenu} />}
      <main>파이썬 부트캠프 메인</main>
    </div>
  );
}
