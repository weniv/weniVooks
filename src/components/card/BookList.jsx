import BookItem from './BookItem';
import styles from './BookList.module.scss';

export default function BookList() {
  const books = require('/public/data/bookListData.json');

  return (
    <ul className={styles.bookList}>
      {books.map((book, index) => (
        <li key={index}>
          <BookItem data={book} />
        </li>
      ))}
    </ul>
  );
}
