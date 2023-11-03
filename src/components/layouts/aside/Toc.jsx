'use client';
import { head } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
  });
  return observer;
};

// https://thisyujeong.dev/blog/toc-generator

export default function Toc() {
  const [currentId, setCurrentId] = useState('');
  const [headingEls, setHeadingEls] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5, h6'));
    const result = [];

    let h4Obj = null;
    let h5Obj = null;

    headingElements.forEach((heading) => {
      const title = heading.textContent;
      const tagName = heading.tagName.toLowerCase();
      let currentIndex = 0;

      if (tagName === 'h4') {
        h4Obj = { title, section: [] };
        result.push(h4Obj);
      } else if (tagName === 'h5') {
        h5Obj = { title, section: [] };
        h4Obj.section.push(h5Obj);
      } else if (tagName === 'h6') {
        h5Obj.section.push({ title, section: [] });
      }
    });
    setHeadingEls(result);
  }, []);

  return (
    <ol>
      {headingEls &&
        headingEls.map((heading, index) => (
          <li key={index}>
            {heading.title}
            {/* {heading.section.length > 0 && ()} */}
          </li>
        ))}
    </ol>
  );
}
