'use client';
import Link from 'next/link';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import styles from './Nav.module.scss';
import SVGNavArrow from '@/components/svg/SVGNavArrow';

const MenuItem = (props) => {
  const { title, link, sections } = props;
  const [fold, setFold] = useState(false);
  const path = usePathname();

  const toggleList = () => {
    setFold(!fold);
  };

  if (sections && sections.length > 0) {
    return (
      <li className={styles.fold}>
        <div className={link === path ? styles.active : null}>
          <Link href={link ? link : ''}>{title}</Link>
          <button
            className={`${styles.chapterBtn} ${fold ? styles.close : null}`}
            onClick={toggleList}
          >
            <SVGNavArrow alt="접기" color="grayLv4" />
          </button>
        </div>
        <ol className={fold ? styles.hide : null}>
          {sections.map((data, index) => (
            <MenuItem key={index} {...data} />
          ))}
        </ol>
      </li>
    );
  } else {
    return (
      <li
        className={`${styles.notFold} ${link === path ? styles.active : null}`}
      >
        <Link href={link ? link : ''}>{title}</Link>
      </li>
    );
  }
};

export default function Nav({ data }) {
  const { title, link, sections } = data;
  return (
    <>
      <h2 className={styles.title}>
        <Link href={link}>{title}</Link>
      </h2>

      <nav className={styles.nav}>
        <ol className={styles.menu}>
          {sections.map((data, index) => (
            <MenuItem key={index} {...data} />
          ))}
        </ol>
      </nav>
    </>
  );
}
