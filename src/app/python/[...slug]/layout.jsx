'use client';
import styles from './layout.module.scss';

import useWindowSize from '@/context/useWindowSize';

import Breadcrumb from '@/components/layouts/Breadcrumb';

export default function Layout({ children, params }) {
  const windowSize = useWindowSize();
  const pythonMenu = require('public/data/pythonMenu.json');

  return (
    <div className={styles.subContent}>
      {windowSize > 1024 && <Breadcrumb slug={params.slug} data={pythonMenu} />}

      {children}
    </div>
  );
}
