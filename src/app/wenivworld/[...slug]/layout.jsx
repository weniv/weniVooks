'use client';

import { DEFAULT_PATH, MENU_DATA } from '../data';

import '@/styles/subpage.scss';
import useWindowSize from '@/utils/useWindowSize';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';
import BtnCopy from '@/components/common/button/BtnCopy';

import AsidePC from '@/components/layouts/aside/AsidePC';
import AsideMobile from '@/components/layouts/aside/AsideMobile';

export default function Layout({ children, params }) {
  const { windowWidth } = useWindowSize();

  return (
    <>
      {windowWidth > 1024 ? (
        <Breadcrumb
          slug={params.slug}
          data={MENU_DATA}
          DEFAULT_PATH={DEFAULT_PATH}
        />
      ) : (
        <AsideMobile />
      )}

      {/* <div className="container"> */}
      {/* <main className="bookContent"> */}

      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">{children}</div>
        </main>
        {windowWidth > 1024 && <AsidePC />}
      </div>
      <BtnCopy />
    </>
  );
}
