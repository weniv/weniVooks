'use client';

import { useMemo } from 'react';
import BookItem from './BookItem';
import styles from './BookList.module.scss';
import bookFile from '@/data/bookList.json';

export default function BookList({ selectedFilter }) {
  const filteredAndSortedBooks = useMemo(() => {
    // 1. 날짜순 정렬
    const sortedBooks = bookFile.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 2. 필터링 적용
    if (selectedFilter === 'all') return sortedBooks;

    return sortedBooks.filter(book => {
      switch (selectedFilter) {
        case 'solid':
          return book.title.includes('견고한');
        case 'basecamp':
          return book.title.includes('베이스캠프');
          case 'databasecamp':
            return book.title.includes('데이터베이스캠프');
        case 'essentials':
          return book.title.includes('에센셜');
        case 'etc':
          return !book.title.includes('견고한') && 
                 !book.title.includes('베이스캠프') && 
                 !book.title.includes('에센셜') &&
                 !book.title.includes('데이터베이스캠프');
        default:
          return true;
      }
    });
  }, [selectedFilter]);

  return (
    <ul className={styles.bookList}>
      {filteredAndSortedBooks.map((book, index) => (
        <li key={index}>
          <BookItem data={book} />
        </li>
      ))}
    </ul>
  );
}
