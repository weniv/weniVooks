import Breadcrumb from '@/components/layouts/Breadcrumb';

export default function Home() {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <Breadcrumb data={pythonMenu} />
      파이썬 부트캠프 메인
    </>
  );
}
