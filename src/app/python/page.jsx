import Breadcrumb from '@/components/layouts/Breadcrumb';
import LayoutMain from '@/components/layouts/LayoutMain';

export default function Home() {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <Breadcrumb data={pythonMenu} />
      <LayoutMain>파이썬 부트캠프 메인</LayoutMain>
    </>
  );
}
