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

  const flattenSections = (sections) => {
    let flattened = [];
    sections.forEach((section) => {
      flattened.push(section);
      if (section.sections) {
        flattened = flattened.concat(flattenSections(section.sections));
      }
    });
    return flattened;
  };

  const findPage = (sections, path) => {
    const flattenedSections = flattenSections(sections);

    if (path === `/${DEFAULT_PATH}`) {
      return {
        prev: null,
        next: flattenedSections[0],
      };
    }

    let prevPage = null;
    let currentPage = null;
    let nextPage = null;

    for (let i = 0; i < flattenedSections.length; i++) {
      if (flattenedSections[i].link === path) {
        currentPage = flattenedSections[i];
        prevPage =
          i === 0
            ? { title: data.title, link: `/${DEFAULT_PATH}` }
            : flattenedSections[i - 1];
        nextPage =
          i < flattenedSections.length - 1 ? flattenedSections[i + 1] : null;
        break;
      }
    }

    return {
      prev: prevPage,
      next: nextPage,
    };
  };

  const { prev, next } = findPage(data.sections, pathname);

  return (
    <div className={styles.page}>
      <Btn className={styles.btnPrev} href={prev?.link} disabled={!prev}>
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
      <Btn className={styles.btnNext} href={next?.link} disabled={!next}>
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
