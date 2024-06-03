'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BookIndex.module.scss';

export default function BookIndexItem(props) {
  const path = usePathname();
  const { title, link, sections } = props;

  return (
    <li className={sections ? styles.fold : styles.notFold}>
      <Link href={link} className={link === path ? styles.active : ''}>
        {title}
      </Link>
      {sections && (
        <ol>
          {sections.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={item.link === path ? styles.active : ''}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}
