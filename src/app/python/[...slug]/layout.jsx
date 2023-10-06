import Breadcrumb from '@/components/layouts/Breadcrumb';

export default function Layout({ children, params }) {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <Breadcrumb slug={params.slug} data={pythonMenu} />
      {children}
    </>
  );
}
