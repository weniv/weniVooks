'use client';
import { useEffect, useState } from 'react';

import useWindowSize from '@/context/useWindowSize';

import Aside from './Aside';
import AsideMobile from './AsideMobile';

export default function AsideWrap() {
  const [headings, setHeadings] = useState([]);
  const windowSize = useWindowSize();

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));

    setHeadings(headingElements);
  }, []);

  console.log();

  return (
    <>
      {headings.length > 0 && (windowSize > 1024 ? <Aside /> : <AsideMobile />)}
    </>
  );
}
