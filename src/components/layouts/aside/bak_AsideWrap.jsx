'use client';
import { useEffect, useState } from 'react';

import useWindowSize from '@/utils/useWindowSize';

import Aside from './AsidePC';
import AsideMobile from './bak_AsideMobile';

export default function AsideWrap() {
  const [headings, setHeadings] = useState([]);
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));

    setHeadings(headingElements);
  }, []);

  console.log();

  return (
    <>
      {headings.length > 0 &&
        (windowWidth > 1024 ? <Aside /> : <AsideMobile />)}
    </>
  );
}
