'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/search/Pagination.module.scss';
import Btn from '../common/button/Btn';
import SVGPrevArrow from '../svg/SVGPrevArrow';
import SVGNextArrow from '../svg/SVGNextArrow';
import useWindowSize from '@/utils/useWindowSize';

// 페이지 버튼 렌더링
const renderPageButton = (currentPage, page, setPage) => {
  const isCurrentPage = page === currentPage;
  return (
    <>
      <input
        type="radio"
        className={styles.pageBtn}
        name="page"
        value={currentPage}
        id={`page${currentPage}`}
        hidden
        checked={isCurrentPage}
        onClick={() => setPage(currentPage)}
      />
      <label
        htmlFor={`page${currentPage}`}
        className={isCurrentPage ? styles.currentPage : ''}
      >
        {currentPage}
      </label>
    </>
  );
};

const addPageRange = (start, end, updatePages) => {
  for (let i = start; i <= end; i++) {
    updatePages.push(i);
  }
};

// 선택된 페이지 주변에 표시할 페이지 계산
const getDisplayedPages = (currentPage, totalPages, setDisplayPages) => {
  const middlePage = parseInt(totalPages / 2);
  const updatePages = [];

  if (totalPages < 10) {
    // 페이지가 10개 이하인 경우 모든 페이지 표시
    for (let i = 1; i <= totalPages; i++) {
      updatePages.push(i);
    }
    setDisplayPages(updatePages);
  } else {
    // 페이지가 10개 이상인 경우 조건에 따라 페이지 표시
    if (currentPage === 1 || currentPage < middlePage) {
      addPageRange(1, middlePage, updatePages);
      updatePages.push(null, totalPages);
    } else if (currentPage === middlePage || currentPage === middlePage + 1) {
      updatePages.push(1, null);
      addPageRange(currentPage - 1, currentPage + 1, updatePages);
      updatePages.push(null, totalPages);
    } else if (currentPage === totalPages || currentPage > middlePage + 1) {
      updatePages.push(1, null);
      addPageRange(middlePage + 1, totalPages, updatePages);
    }

    setDisplayPages(updatePages);
  }
};

export default function Pagination({ page, setPage, searchResults }) {
  const { windowWidth } = useWindowSize();
  const [displayPages, setDisplayPages] = useState([]);

  const goPrev = () => {
    setPage((page) => page - 1);
  };

  const goNext = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    getDisplayedPages(page, searchResults.page, setDisplayPages);
  }, [page]);

  // console.log('displayPages', displayPages);

  return (
    <div className={styles.btnWrap}>
      <Btn className={styles.btnPrev} disabled={page === 1} onClick={goPrev}>
        <SVGPrevArrow color="grayLv3" />
        <span className="a11y-hidden">이전</span>
      </Btn>
      <div className={styles.pageNav}>
        {displayPages.map((currentPage, idx) =>
          currentPage === null ? (
            <span key={idx} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            renderPageButton(currentPage, page, setPage)
          ),
        )}
      </div>
      <Btn
        className={styles.btnNext}
        disabled={!searchResults.page || page === searchResults.page}
        onClick={goNext}
      >
        <SVGNextArrow color="grayLv3" />
        <span className="a11y-hidden">다음</span>
      </Btn>
    </div>
  );
}
