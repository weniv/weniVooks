import styles from './layout.module.scss';

import Aside from '@/components/layouts/Aside';
import Breadcrumb from '@/components/layouts/Breadcrumb';

export default function Layout({ children, params }) {
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <>
      <div className={styles.subContent}>
        <Breadcrumb slug={params.slug} data={pythonMenu} />
        <main>{children}</main>
      </div>
      <Aside />
    </>
  );
}
