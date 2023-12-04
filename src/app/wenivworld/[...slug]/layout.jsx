'use client';

import { DEFAULT_PATH, MENU_DATA } from '../data';

import '@/styles/subpage.scss';
import useWindowSize from '@/utils/useWindowSize';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';
import BtnCopy from '@/components/common/button/BtnCopy';
import AsideWrap from '@/components/layouts/aside/AsideWrap';

export default function Layout({ children, params }) {
  const { windowWidth } = useWindowSize();

  return (
    <div className="subContent">
      {windowWidth > 1024 && (
        <Breadcrumb
          slug={params.slug}
          data={MENU_DATA}
          DEFAULT_PATH={DEFAULT_PATH}
        />
      )}

      <div className="container">
        <main className="bookContent">
          <div className="inner">{children}</div>
        </main>
        {windowWidth > 640 && <AsideWrap />}
      </div>
      <BtnCopy />
    </div>
  );
}
