'use client';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import LayoutMain from '@/components/layouts/LayoutMain';
import useWindowSize from '@/context/useWindowSize';

export default function Home() {
  const pythonMenu = require('public/data/pythonMenu.json');
  const windowSize = useWindowSize();

  return (
    <>
      {windowSize > 1024 && <Breadcrumb data={pythonMenu} />}
      <LayoutMain>파이썬 부트캠프 메인</LayoutMain>
    </>
  );
}
