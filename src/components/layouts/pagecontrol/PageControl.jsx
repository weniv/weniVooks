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
            next: section.sections ? section.sections[0] : null,
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
          const prevSection = sections.find(
            (item) => item.link === section.link,
          );
          const prevSectionIndex = sections.indexOf(prevSection);

          if (index === 0) {
            return {
              prev: section,
              next: section.sections[index + 1]
                ? section.sections[index + 1]
                : sections[prevSectionIndex + 1],
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

  const { prev: findPrev, next: findNext } = findPage(data.sections, pathname);
  let prev = findPrev;
  let next = findNext;

  if (pathname === `/${DEFAULT_PATH}`) {
    next = data.sections[0];
  }
  const safeHref = (link) => {
    if (typeof link === 'string') {
      return link;
    }
    if (typeof link === 'object' && link !== null) {
      return link;
    }
    return undefined; // 또는 적절한 기본값
  };

  console.log;

  return (
    <div className={styles.page}>
      <Btn className={styles.btnPrev} href={prev && prev.link} disabled={!prev}>
        <SVGPrevArrow color="grayLv3" />
        {windowWidth > 1024 ? (
          <>
            <span className="a11y-hidden">이전</span>{' '}
            {prev && <span className={styles.text}>{prev.title}</span>}
          </>
        ) : (
          <span className="a11y-hidden">{prev ? prev.title : '이전'}</span>
        )}
      </Btn>
      <Btn className={styles.btnNext} href={next && next.link} disabled={!next}>
        {windowWidth > 1024 ? (
          <>
            <span className="a11y-hidden">다음</span>{' '}
            {next && <span className={styles.text}>{next.title}</span>}
          </>
        ) : (
          <span className="a11y-hidden">{next ? next.title : '다음'}</span>
        )}
        <SVGNextArrow color="grayLv3" />
      </Btn>
    </div>
  );
}
