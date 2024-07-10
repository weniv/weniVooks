'use client';
import '@/styles/sub.scss';

import { useEffect, useState } from 'react';
import useWindowSize from '@/utils/useWindowSize';
import BtnCopy from '@/components/common/button/BtnCopy';
import AsidePC from '@/components/layouts/aside/AsidePC';
import AsideMobile from '@/components/layouts/aside/AsideMobile';

export default function ContentLayout({ children }) {
  const { windowWidth } = useWindowSize();
  const [isHeading, setIsHeading] = useState(0);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));
    setIsHeading(headingElements.length);
  }, []);
  return (
    <>
      {windowWidth <= 1024 && isHeading ? <AsideMobile /> : null}

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
