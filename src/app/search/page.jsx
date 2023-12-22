'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './search.module.scss';
import classNames from 'classnames';
import { searchInMd } from './searchUtils';
import SVGAlertCircle from '@/components/svg/SVGAlertCircle';
import useWindowSize from '@/utils/useWindowSize';
import SearchForm from '@/components/search/SearchForm';
import Loading from '../loading';
import Btn from '@/components/common/button/Btn';
import SVGPrevArrow from '@/components/svg/SVGPrevArrow';
import SVGNextArrow from '@/components/svg/SVGNextArrow';

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

// 검색키워드와 일치하는 문자열 하이라이팅
function highlightKeyword(text, keyword) {
  if (!text || !keyword) return text;

  const regExp = new RegExp(`(${keyword})`, 'i');
  return text.split(regExp).map((part, idx) => {
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return (
        <span className={classNames(styles.keyword)} key={idx}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function Search() {
  // 검색 키워드
  const params = useSearchParams();
  const searchQuery = params.get('keyword');
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    if (searchQuery) {
      searchInMd(searchQuery, setSearchResults, page);
    } else {
      setTimeout(() => {
        setSearchResults([]);
      }, 1000);
    }
  }, [searchQuery, page]);

  const goPrev = () => {
    setPage((page) => page - 1);
  };

  const goNext = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      {searchResults ? (
        <>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.innerLayout)}>
              {windowWidth < 640 ? (
                <div className={styles.searchForm}>
                  <SearchForm />
                </div>
              ) : null}
              <div className={classNames(styles.title)}>
                <strong>{searchQuery ? searchQuery : '검색어 없음'}</strong>
                <span>검색 결과: {searchResults.length}건</span>
              </div>
              {searchResults.length === 0 ? (
                <div className={styles.notFound}>
                  <SVGAlertCircle size={windowWidth < 640 ? 80 : 100} />
                  <p>
                    <span>검색 결과가 없습니다.</span>
                    <span>다른 검색어를 입력해 주세요.</span>
                  </p>
                </div>
              ) : (
                <ul>
                  {searchResults.result.map((data, idx) => (
                    <Link key={idx} href={data.link}>
                      <li className={classNames(styles.resultSection)}>
                        <p className={classNames(styles.subTitle)}>
                          {highlightKeyword(
                            data.title ? data.title : data.mainTitle,
                            searchQuery,
                          )}
                        </p>
                        <p className={classNames(styles.path)}>
                          {highlightKeyword(
                            `${windowWidth > 640 ? data.bookKind : '...'} > ${
                              data.mainTitle
                            }  ${data.title ? '> ' + data.title : ''}`,
                            searchQuery,
                          )}
                        </p>
                        <div className={classNames(styles.contents)}>
                          {data.content &&
                            data.content.map((content, idx) => {
                              return (
                                <span key={idx} className={styles.contentLine}>
                                  {highlightKeyword(content, searchQuery)}
                                </span>
                              );
                            })}
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.btnWrap}>
            <Btn
              className={styles.btnPrev}
              disabled={page === 1}
              onClick={goPrev}
            >
              <SVGPrevArrow color="grayLv3" />
              {windowWidth > 1024 && <span>{'이전'}</span>}
            </Btn>
            <div className={styles.pageNav}>
              {Array.from({ length: searchResults.page }, (_, idx) => {
                const currentPage = idx + 1;
                console.log('page', page);

                if (searchResults.page > 5) {
                  if (
                    currentPage >= page &&
                    currentPage < page + 3 &&
                    currentPage < searchResults.page - 1
                  ) {
                    return renderPageButton(currentPage, page, setPage);
                  }

                  if (idx === searchResults.page - 1) {
                    return (
                      <div className={styles.ellipsis}>
                        {searchResults.page - 1 - page < 3 ? null : <p>...</p>}
                        {renderPageButton(currentPage, page, setPage)}
                      </div>
                    );
                  }
                } else {
                  console.log(111);
                  return renderPageButton(currentPage, page, setPage);
                }

                return null;
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
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
