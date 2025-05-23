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
import Pagination from '@/components/search/Pagination';

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
  const searchQuery = params.get('keyword')?.trim();
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
    window.scrollTo(0, 0);
  }, [searchQuery, page]);

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
                    <li key={idx} className={classNames(styles.resultSection)}>
                      <Link href={data.link}>
                        <p className={classNames(styles.subTitle)}>
                          {highlightKeyword(data.title, searchQuery)}
                        </p>
                        <p className={classNames(styles.path)}>
                          {highlightKeyword(
                            `${windowWidth > 640 ? data.bookTitle : '...'} ${
                              data.chapter ? '> ' + data.chapter : ''
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
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {searchResults.length !== 0 ? (
            <Pagination
              page={page}
              setPage={setPage}
              searchResults={searchResults}
            />
          ) : null}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
