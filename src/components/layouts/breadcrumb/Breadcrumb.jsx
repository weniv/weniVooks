'use client';
import Link from 'next/link';

import styles from './Breadcrumb.module.scss';
import useWindowSize from '@/utils/useWindowSize';
import { useParams } from 'next/navigation';

export default function Breadcrumb({ data, DEFAULT_PATH }) {
  const { windowWidth } = useWindowSize();
  const slug = useParams().slug;
  let breadcrumb = [];
  let currentSection = data;

  if (slug && data) {
    let currentPath = DEFAULT_PATH;

    for (let i = 0; i < slug.length; i++) {
      const currentSlug = slug[i];
      currentPath += `/${currentSlug}`;

      currentSection =
        currentSection.sections &&
        currentSection.sections.find((item) => item.link === currentPath);

      if (currentSection) {
        breadcrumb.push({
          link: currentPath,
          title: currentSection.title,
        });
      } else {
        break;
      }
    }
  }
  if (windowWidth > 1024) {
    return (
      <ol className={styles.breadcrumb}>
        <li>
          <Link href={data.link}>{data.title}</Link>
        </li>
        {slug &&
          breadcrumb.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
      </ol>
    );
  }
}
