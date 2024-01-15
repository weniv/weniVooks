'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '@/components/search/Pagination.module.scss';
import Btn from '../common/button/Btn';
import SVGPrevArrow from '../svg/SVGPrevArrow';
import SVGNextArrow from '../svg/SVGNextArrow';
import useWindowSize from '@/utils/useWindowSize';
import classNames from 'classnames';

// 페이지 버튼 렌더링
const renderPageButton = (currentPage, page, setPage) => {
  const isCurrentPage = page === currentPage;
  return (
    <button
      type="button"
      onClick={() => setPage(currentPage)}
      className={classNames(
        styles.pageBtn,
        isCurrentPage ? styles.currentPage : '',
      )}
    >
      {currentPage}
    </button>
  );
};

const addPageRange = (start, end, updatePages) => {
  for (let i = start; i <= end; i++) {
    updatePages.push(i);
  }
};

// 선택된 페이지 주변에 표시할 페이지 계산
const getDisplayedPages = (currentPage, totalPages, setDisplayPages) => {
  const updatePages = [];

  if (totalPages < 8) {
    // 페이지가 8개 미만인 경우 모든 페이지 표시
    for (let i = 1; i <= totalPages; i++) {
      updatePages.push(i);
    }
    setDisplayPages(updatePages);
  } else {
    // 페이지가 7개 이상인 경우 조건에 따라 페이지 표시
    if (currentPage < 5) {
      addPageRange(1, 5, updatePages);
      updatePages.push(null, totalPages);
    } else if (currentPage >= totalPages - 4) {
      updatePages.push(1, null);
      addPageRange(totalPages - 4, totalPages, updatePages);
    } else {
      updatePages.push(1, null);
      addPageRange(currentPage - 1, currentPage + 1, updatePages);
      updatePages.push(null, totalPages);
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
