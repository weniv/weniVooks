'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from './search.module.scss';
import classNames from 'classnames';
import { searchInMd } from './searchUtils';
import SVGAlertCircle from '@/components/svg/SVGAlertCircle';
import useWindowSize from '@/context/useWindowSize';
import SearchForm from '@/components/layouts/header/SearchForm';
import Loading from '../loading';

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
  const windowSize = useWindowSize();

  useEffect(() => {
    if (searchQuery) {
      searchInMd(searchQuery, setSearchResults);
    }
  }, [searchQuery]);

  return (
    <>
      {searchResults ? (
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.innerLayout)}>
            {windowSize < 640 ? (
              <div className={styles.searchForm}>
                <SearchForm />
              </div>
            ) : null}
            <div className={classNames(styles.title)}>
              <strong>{searchQuery}</strong>
              <span>검색 결과: {searchResults?.length}건</span>
            </div>
            {searchResults.length === 0 ? (
              <div className={styles.notFound}>
                <SVGAlertCircle size={windowSize < 640 ? 80 : 100} />
                <p>
                  <span>검색 결과가 없습니다.</span>
                  <span>다른 검색어를 입력해 주세요.</span>
                </p>
              </div>
            ) : (
              <ul>
                {searchResults.map((data, idx) => (
                  <li key={idx} className={classNames(styles.resultSection)}>
                    <a href={data.link}>
                      <p className={classNames(styles.subTitle)}>
                        {highlightKeyword(data.title, searchQuery)}
                      </p>
                    </a>
                    <p className={classNames(styles.path)}>
                      {highlightKeyword(
                        `${windowSize > 640 ? data.bookKind : '...'} > ${
                          data.mainTitle
                        } > ${data.title}`,
                        searchQuery,
                      )}
                    </p>
                    <div className={classNames(styles.contents)}>
                      {data.content &&
                        data.content.map((contentItem, contentIndex) => {
                          const sentences = contentItem.split('.');
                          const displayContent =
                            sentences.length > 2
                              ? sentences.slice(0, 2).join('.') + '...'
                              : contentItem;
                          return (
                            <span key={contentIndex}>
                              {highlightKeyword(displayContent, searchQuery)}
                            </span>
                          );
                        })}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
