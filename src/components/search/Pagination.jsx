'use client';
import React from 'react';
import styles from '@/components/search/Pagination.module.scss';
import Btn from '../common/button/Btn';
import SVGPrevArrow from '../svg/SVGPrevArrow';
import SVGNextArrow from '../svg/SVGNextArrow';
import useWindowSize from '@/utils/useWindowSize';

// 페이지 버튼 렌더링
const renderPageButton = (currentPage, page, setPage) => (
  <>
    <input
      type="radio"
      className={styles.pageBtn}
      name="page"
      value={currentPage}
      id={`page${currentPage}`}
      hidden
      checked={page === currentPage}
      onClick={() => setPage(currentPage)}
    />
    <label htmlFor={`page${currentPage}`}>{currentPage}</label>
  </>
);

export default function Pagination({ page, setPage, searchResults }) {
  const { windowWidth } = useWindowSize();

  const goPrev = () => {
    setPage((page) => page - 1);
  };

  const goNext = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.btnWrap}>
      <Btn className={styles.btnPrev} disabled={page === 1} onClick={goPrev}>
        <SVGPrevArrow color="grayLv3" />
        {windowWidth > 1024 && <span>{'이전'}</span>}
      </Btn>
      <div className={styles.pageNav}>
        {Array.from({ length: searchResults.page }, (_, idx) => {
          const currentPage = idx + 1;
          return renderPageButton(currentPage, page, setPage);
        })}
      </div>
      <Btn
        className={styles.btnNext}
        disabled={!searchResults.page || page === searchResults.page}
        onClick={goNext}
      >
        {windowWidth > 1024 && <span>{'다음'}</span>}
        <SVGNextArrow color="grayLv3" />
      </Btn>
    </div>
  );
}
