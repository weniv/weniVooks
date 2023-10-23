'use client';
import { usePathname } from 'next/navigation';

import styles from './Page.module.scss';

import SVGNextArrow from '@/components/svg/SVGNextArrow';
import SVGPrevArrow from '@/components/svg/SVGPrevArrow';
import Btn from '../common/button/Btn';

export default function Page() {
  const data = require('public/data/pythonMenu.json');
  const pathname = usePathname();
  const DEFAULT_PATH = '/python';

  const findPage = (sections, path) => {
    let pageData = {
      prev: null,
      next: null,
    };

    if (path === DEFAULT_PATH) {
      return (pageData = {
        prev: null,
        next: sections[0],
      });
    }

    for (const section of sections) {
      if (section.link === path) {
        // 2depth
        const index = sections.indexOf(section);

        if (index === 0) {
          // 첫번째
          return (pageData = {
            prev: data,
            next: section.sections[0],
          });
        } else {
          const prevSection = sections[index - 1].sections;
          return (pageData = {
            prev: prevSection[prevSection.length - 1],
            next: section.sections ? section.sections[0] : '다음챕터',
          });
        }
      }
      if (section.sections) {
        const currentSection = section.sections.find(
          (item) => item.link === path,
        );

        if (currentSection) {
          const sectionLength = section.sections.length - 1;
          const index = section.sections.indexOf(currentSection);

          if (index === 0) {
            console.log();
            return (pageData = {
              prev: section,
              next: section.sections[index + 1],
            });
          } else if (index === sectionLength) {
            const parentIndex = sections.indexOf(section) + 1;

            return (pageData = {
              prev: section.sections[index - 1],
              next: sections[parentIndex] ? sections[parentIndex] : null,
            });
          } else {
            return (pageData = {
              prev: section.sections[index - 1],
              next: section.sections[index + 1],
            });
          }
        }
      }
    }
  };

  const { prev, next } = findPage(data.sections, pathname);

  return (
    <div className={styles.page}>
      <Btn className={styles.btnPrev} href={prev && prev.link} disabled={!prev}>
        <SVGPrevArrow color="grayLv3" />
        <span>{prev && prev.title}</span>
      </Btn>
      <Btn className={styles.btnNext} href={next && next.link} disabled={!next}>
        <span>{next && next.title}</span>
        <SVGNextArrow color="grayLv3" />
      </Btn>
    </div>
  );
}
