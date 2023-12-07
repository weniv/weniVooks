'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import styles from './Toc.module.scss';
import ScrollWrap from '../menu/ScrollWrap';

const getIntersectionObserver = (setState) => {
  let direction = '';
  let prevYposition = 0;

  // 스크롤 방향 체크
  const checkScrollDirection = (prevY) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = 'down';
    else direction = 'up';

    prevYposition = window.scrollY;
  };

  // observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        checkScrollDirection(prevYposition);
        if (
          (direction === 'down' && !entry.isIntersecting) ||
          (direction === 'up' && entry.isIntersecting)
        ) {
          const index = entry.target.id.split('-')[1] * 1;
          setState(index);
        }
      });
    },
    {
      threshold: 0.8,
      rootMargin: '-30px 0px 0px 0px',
    },
  );
  return observer;
};

// https://thisyujeong.dev/blog/toc-generator

export default function Toc() {
  const [currentId, setCurrentId] = useState(0);
  const [headingEls, setHeadingEls] = useState([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));
    const result = [];

    let h4Obj = null;
    let h5Obj = null;

    headingElements.map((heading, index) => {
      const title = heading.textContent;
      const tagName = heading.tagName.toLowerCase();
      const href = `title-${index}`;

      heading.id = href;
      if (tagName === 'h4') {
        h4Obj = { title, href, section: [] };
        result.push(h4Obj);
      } else if (tagName === 'h5') {
        h5Obj = { title, href, section: [] };
        h4Obj.section.push(h5Obj);
      } else if (tagName === 'h6') {
        h5Obj.section.push({ title, href, section: [] });
      }

      observer.observe(heading);
    });

    setHeadingEls(result);
    return () => {
      observer.disconnect();
    };
  }, []);

  const renderToc = (sections) => {
    return (
      <ol className={styles.toc}>
        {sections.map((section, index) => (
          <li key={index}>
            <Link
              href={`#${section.href}`}
              // className={currentId === index ? `active ${styles.active}` : ''}
            >
              {section.title}
            </Link>
            {section.section.length > 0 && renderToc(section.section)}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <ScrollWrap className={styles.wrap}>{renderToc(headingEls)}</ScrollWrap>
  );
}
