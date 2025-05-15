'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './search.module.scss';
import classNames from 'classnames';
import SVGAlertCircle from '@/components/svg/SVGAlertCircle';
import useWindowSize from '@/utils/useWindowSize';
import Loading from '../loading';

export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState(null);
  const [groupedBookmarks, setGroupedBookmarks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { windowWidth } = useWindowSize();

  // URL 해시 생성 함수 - 공백을 %20으로 대체
  const createUrlHash = (text) => {
    if (!text) return '';
    // 공백을 %20으로 변환, 특수문자 제거
    return encodeURIComponent(text.toLowerCase());
  };

  useEffect(() => {
    // Retrieve bookmarks from localStorage
    const fetchBookmarks = () => {
      try {
        const storedBookmarks = localStorage.getItem('bookmarks');
        if (storedBookmarks) {
          const parsedBookmarks = JSON.parse(storedBookmarks);
          setBookmarks(parsedBookmarks);

          // 북마크를 책별로 그룹화
          const groupedByBook = {};

          Object.entries(parsedBookmarks).forEach(([bookTitle, chapters]) => {
            // 책 이름을 더 보기 좋게 포맷팅
            const formattedBookTitle = bookTitle.replace(/-/g, ' ');
            groupedByBook[bookTitle] = {
              title: formattedBookTitle,
              items: [],
            };

            Object.entries(chapters).forEach(([chapter, sections]) => {
              // sections는 이제 { '01-1': ['소제목1', '소제목2'], '01-2': ['소제목1'] } 형태
              Object.entries(sections).forEach(([section, headings]) => {
                // 챕터 번호 (예: chapter01) 에서 숫자 부분만 추출
                const chapterNum = chapter.match(/\d+/);
                const chapterDisplay = chapterNum
                  ? `Chapter ${chapterNum[0]}`
                  : chapter;

                // 각 소제목에 대해 북마크 아이템 생성
                headings.forEach((heading) => {
                  groupedByBook[bookTitle].items.push({
                    id: `${bookTitle}/${chapter}/${heading}`,
                    title: heading,
                    chapter: chapterDisplay,
                    section: section,
                    url: `/${bookTitle}/${chapter}#${createUrlHash(heading)}`,
                    description: `${chapter}`,
                  });
                });
              });
            });

            // 북마크 순서를 챕터 순으로 정렬
            groupedByBook[bookTitle].items.sort((a, b) => {
              return a.chapter.localeCompare(b.chapter);
            });
          });

          setGroupedBookmarks(groupedByBook);
        } else {
          setBookmarks({});
          setGroupedBookmarks({});
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setBookmarks({});
        setGroupedBookmarks({});
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to prevent hydration errors
    const timer = setTimeout(() => {
      fetchBookmarks();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Function to remove a bookmark
  const removeBookmark = (bookmarkId) => {
    try {
      // 북마크 ID에서 경로 정보 추출
      const [bookTitle, chapter, ...sectionParts] = bookmarkId.split('/');
      const section = sectionParts.join('/'); // 섹션 이름에 /가 포함된 경우 처리

      // 북마크 객체에서 해당 항목 삭제
      const updatedBookmarks = { ...bookmarks };
      if (
        updatedBookmarks[bookTitle] &&
        updatedBookmarks[bookTitle][chapter] &&
        section in updatedBookmarks[bookTitle][chapter]
      ) {
        delete updatedBookmarks[bookTitle][chapter][section];

        // 빈 객체 정리
        if (Object.keys(updatedBookmarks[bookTitle][chapter]).length === 0) {
          delete updatedBookmarks[bookTitle][chapter];
        }
        if (Object.keys(updatedBookmarks[bookTitle]).length === 0) {
          delete updatedBookmarks[bookTitle];
        }
      }

      // 그룹화된 북마크에서도 해당 항목 삭제
      const updatedGroupedBookmarks = { ...groupedBookmarks };

      if (updatedGroupedBookmarks[bookTitle]) {
        updatedGroupedBookmarks[bookTitle].items = updatedGroupedBookmarks[
          bookTitle
        ].items.filter((item) => item.id !== bookmarkId);

        // 책에 북마크가 없으면 책 자체를 삭제
        if (updatedGroupedBookmarks[bookTitle].items.length === 0) {
          delete updatedGroupedBookmarks[bookTitle];
        }
      }

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      setGroupedBookmarks(updatedGroupedBookmarks);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // 총 북마크 수 계산
  const getTotalBookmarkCount = () => {
    let total = 0;
    Object.values(groupedBookmarks).forEach((book) => {
      total += book.items.length;
    });
    return total;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.innerLayout)}>
        <div className={classNames(styles.title)}>
          <strong>북마크</strong>
          <span>저장된 북마크: {getTotalBookmarkCount()}건</span>
        </div>

        {Object.keys(groupedBookmarks).length === 0 ? (
          <div className={styles.notFound}>
            <SVGAlertCircle size={windowWidth < 640 ? 80 : 100} />
            <p>
              <span>저장된 북마크가 없습니다.</span>
              <span>콘텐츠를 읽는 동안 북마크를 추가해보세요.</span>
            </p>
          </div>
        ) : (
          <div className={styles.bookList}>
            {Object.entries(groupedBookmarks).map(([bookId, book]) => (
              <div key={bookId} className={styles.bookSection}>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <ul>
                  {book.items.map((bookmark, idx) => (
                    <li key={idx} className={classNames(styles.resultSection)}>
                      <Link href={bookmark.url}>
                        <p className={classNames(styles.subTitle)}>
                          {bookmark.title}
                        </p>
                        <p className={classNames(styles.path)}>
                          {bookmark.chapter}
                          {bookmark.section && ` → ${bookmark.section}`}
                          {` → ${bookmark.title}`}
                        </p>
                      </Link>
                      <button
                        className={styles.removeButton}
                        onClick={(e) => {
                          e.preventDefault();
                          removeBookmark(bookmark.id);
                        }}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
