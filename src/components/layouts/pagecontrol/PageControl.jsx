'use client';
import { usePathname } from 'next/navigation';

import styles from './PageControl.module.scss';

import SVGNextArrow from '@/components/svg/SVGNextArrow';
import SVGPrevArrow from '@/components/svg/SVGPrevArrow';
import Btn from '../../common/button/Btn';
import useWindowSize from '@/utils/useWindowSize';

export default function PageControl({ data, DEFAULT_PATH }) {
  const { windowWidth } = useWindowSize();
  const pathname = usePathname();

  const findPage = (sections, path) => {
    if (path === DEFAULT_PATH) {
      return {
        prev: null,
        next: sections[0],
      };
    }

    for (const section of sections) {
      if (section.link === path) {
        // 2depth
        const index = sections.indexOf(section);

        if (index === 0) {
          // 첫번째
          return {
            prev: data,
            next: section.sections[0],
          };
        } else {
          const prevSection = sections[index - 1].sections;
          return {
            prev: prevSection[prevSection.length - 1],
            next: section.sections ? section.sections[0] : '다음챕터',
          };
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
            return {
              prev: section,
              next: section.sections[index + 1],
            };
          } else if (index === sectionLength) {
            const parentIndex = sections.indexOf(section) + 1;

            return {
              prev: section.sections[index - 1],
              next: sections[parentIndex] ? sections[parentIndex] : null,
            };
          } else {
            return {
              prev: section.sections[index - 1],
              next: section.sections[index + 1],
            };
          }
        }
      }
    }

    return {
      prev: null,
      next: null,
    };
  };

  const { prev, next } = findPage(data.sections, pathname);

  return (
    <div className={styles.page}>
      <Btn className={styles.btnPrev} href={prev && prev.link} disabled={!prev}>
        <SVGPrevArrow color="grayLv3" />
        {windowWidth > 1024 && <span>{prev && prev.title}</span>}
      </Btn>
      <Btn className={styles.btnNext} href={next && next.link} disabled={!next}>
        {windowWidth > 1024 && <span>{next && next.title}</span>}
        <SVGNextArrow color="grayLv3" />
      </Btn>
    </div>
  );
}
