'use client';
import Link from 'next/link';

import styles from './Breadcrumb.module.scss';
import useWindowSize from '@/utils/useWindowSize';
import { useParams } from 'next/navigation';

export default function NewBreadcrumb({ data, DEFAULT_PATH }) {
  const { windowWidth } = useWindowSize();
  const chapter = useParams().chapter;
  const page = useParams().page;

  let breadcrumb = [];
  let currentSection = data;

  if (!data) return;

  if (chapter) {
    let currentPath = `/${DEFAULT_PATH}/${chapter}`;

    currentSection =
      currentSection.sections &&
      currentSection.sections.find((item) => item.link === currentPath);

    if (currentSection) {
      breadcrumb.push({
        link: currentPath,
        title: currentSection.title,
      });
    }
  }

  if (page) {
    let currentPath = `/${DEFAULT_PATH}/${chapter}/${page}`;

    currentSection =
      currentSection.sections &&
      currentSection.sections.find((item) => item.link === currentPath);

    if (currentSection) {
      breadcrumb.push({
        link: currentPath,
        title: currentSection.title,
      });
    }
  }

  if (windowWidth > 1024) {
    return (
      <ol className={styles.breadcrumb}>
        <li>
          <Link href={data.link}>{data.title}</Link>
        </li>
        {chapter &&
          breadcrumb.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
      </ol>
    );
  }
}
