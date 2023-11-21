'use client';

import { DEFAULT_PATH, MENU_DATA } from '../data';

import '@/styles/subpage.scss';
import useWindowSize from '@/context/useWindowSize';
import Breadcrumb from '@/components/layouts/Breadcrumb';

export default function Layout({ children, params }) {
  const windowSize = useWindowSize();

  return (
    <div className="subContent">
      {windowSize > 1024 && (
        <Breadcrumb
          slug={params.slug}
          data={MENU_DATA}
          DEFAULT_PATH={DEFAULT_PATH}
        />
      )}

      {children}
    </div>
  );
}
