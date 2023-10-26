'use client';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export default function useWindowSize() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    setSize(window.innerWidth);
  }, []);

  useEffect(() => {
    const resizeWindow = throttle(() => {
      setSize(window.innerWidth);
    }, 1000);

    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [size]);
  return size;
}
