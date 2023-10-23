import Link from 'next/link';

import styles from './Breadcrumb.module.scss';

export default function Breadcrumb({ slug, data }) {
  let breadcrumb = [];
  let currentSection = data;

  if (slug && data) {
    let currentPath = '/python';

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
