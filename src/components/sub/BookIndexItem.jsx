'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BookIndexItem.module.scss';

import SVGNavArrow from '../svg/SVGNavArrow';
import classNames from 'classnames';

export default function BookIndexItem(props) {
  const path = usePathname();
  const { title, link, sections } = props;

  return (
    <li
      className={classNames(
        styles.bookIndexItem,
        sections ? styles.fold : styles.notFold,
      )}
    >
      <div className={link === path ? styles.active : ''}>
        <Link href={link}>{title}</Link>
        {sections ? (
          <button className={`${styles.chapterIcon} `}>
            <SVGNavArrow alt="접기" color="grayLv4" />
          </button>
        ) : (
          <div className={classNames(styles.chapterIcon, styles.close)}>
            <SVGNavArrow alt="접기" color="grayLv4" />
          </div>
        )}
      </div>
      {sections && (
        <ol>
          {sections.map((item, index) => (
            <li key={index} className={item.link === path ? styles.active : ''}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}
