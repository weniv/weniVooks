'use client';

import { DEFAULT_PATH, MENU_DATA } from '../data';

import '@/styles/sub.scss';
import useWindowSize from '@/utils/useWindowSize';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';
import BtnCopy from '@/components/common/button/BtnCopy';

import AsidePC from '@/components/layouts/aside/AsidePC';
import AsideMobile from '@/components/layouts/aside/AsideMobile';
import { useEffect, useState } from 'react';

export default function Layout({ children, params }) {
  const { windowWidth } = useWindowSize();
  const [isHeading, setIsHeading] = useState(0);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));

    setIsHeading(headingElements.length);
  }, []);

  return (
    <>
      {windowWidth > 1024 ? (
        <Breadcrumb
          slug={params.slug}
          data={MENU_DATA}
          DEFAULT_PATH={DEFAULT_PATH}
        />
      ) : isHeading ? (
        <AsideMobile />
      ) : null}

      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">{children}</div>
        </main>
        {windowWidth > 1024 && isHeading ? <AsidePC /> : null}
      </div>
      <BtnCopy />
    </>
  );
}
