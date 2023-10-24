'use client';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export default function useWindowSize() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const resizeWindow = throttle(() => {
      setSize(window.innerWidth);
    }, 1000);
    setSize(window.innerWidth);
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [size]);
  return size;
}
