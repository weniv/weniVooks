import classNames from 'classnames';
import styles from './ScrollWrap.module.scss';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from '@/utils/useWindowSize';
import { throttle } from 'lodash';

export default function ScrollWrap({ children, className, id }) {
  const wrapRef = useRef();
  const { windowHeight } = useWindowSize();
  const [scrollPosition, seScrollPosition] = useState(null);

  const scrollHandler = throttle((e) => {
    const target = e.target;

    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    const scrollTop = target.scrollTop;
    const scrollPercentage = (
      scrollTop /
      (scrollHeight - clientHeight)
    ).toFixed(1);
    seScrollPosition(scrollPercentage);
  }, 300);

  useEffect(() => {
    const scrollWrap = wrapRef?.current;

    scrollWrap.addEventListener('scroll', scrollHandler);
    return () => {
      scrollWrap.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    const scrollWrap = wrapRef?.current;

    const scrollHeight = scrollWrap?.scrollHeight;
    const clientHeight = scrollWrap?.clientHeight;

    if (clientHeight < scrollHeight) {
      if (scrollPosition > 0) {
        scrollWrap.classList.add(styles.maskTop);
      } else {
        scrollWrap.classList.remove(styles.maskTop);
      }

      if (scrollPosition < 1) {
        scrollWrap.classList.add(styles.maskBottom);
      } else {
        scrollWrap.classList.remove(styles.maskBottom);
      }
    } else {
      scrollWrap.classList.remove(styles.maskTop);
      scrollWrap.classList.remove(styles.maskBottom);
    }
  }, [scrollPosition, windowHeight]);

  return (
    <div
      id={id}
      className={classNames(styles.scrollWrap, className)}
      ref={wrapRef}
    >
      {children}
    </div>
  );
}
