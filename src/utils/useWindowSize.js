'use client';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const resizeWindow = throttle(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, 300);

    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  return { windowWidth, windowHeight };
}
