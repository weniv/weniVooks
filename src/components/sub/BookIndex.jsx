import Link from 'next/link';

import styles from './BookIndex.module.scss';

import BookIndexItem from './BookIndexItem';

export default function BookIndex(props) {
  const { DEFAULT_PATH, TITLE, menuData } = props;

  return (
    <div className={styles.bookIndex}>
      <h2>
        <Link href={`/${DEFAULT_PATH}`}>{TITLE}</Link>
      </h2>
      <nav>
        {menuData && (
          <ol>
            {menuData.sections.map((data, index) => (
              <BookIndexItem key={index} {...data} />
            ))}
          </ol>
        )}
      </nav>
    </div>
  );
}
