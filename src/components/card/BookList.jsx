import BookItem from './BookItem';
import styles from './BookList.module.scss';

export default function BookList() {
  const bookFile = require('/public/data/bookList.json');

  // 출시일 최신순 정렬
  const bookData = bookFile.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ul className={styles.bookList}>
      {bookData.map((book, index) => (
        <li key={index}>
          <BookItem data={book} />
        </li>
      ))}
    </ul>
  );
}
