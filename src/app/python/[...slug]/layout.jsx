import Breadcrumb from '@/components/layouts/Breadcrumb';
import LayoutMain from '@/components/layouts/LayoutMain';

export default function Layout({ children, params }) {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <Breadcrumb slug={params.slug} data={pythonMenu} />
      <LayoutMain>{children}</LayoutMain>
    </>
  );
}
