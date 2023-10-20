import styles from './layout.module.scss';

import Aside from '@/components/layouts/Aside';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import LayoutMain from '@/components/layouts/LayoutMain';

export default function Layout({ children, params }) {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <div className={styles.subContent}>
        <Breadcrumb slug={params.slug} data={pythonMenu} />
        <LayoutMain>{children}</LayoutMain>
        {/* <main>{children}</main> */}
      </div>
      <Aside />
    </>
  );
}
