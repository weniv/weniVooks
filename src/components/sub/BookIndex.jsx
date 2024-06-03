import Link from 'next/link';

import styles from './BookIndex.module.scss';

import BookIndexItem from './BookIndexItem';

export default async function BookIndex(props) {
  const { link, title, data: menuData } = props;

  return (
    <div className={styles.bookIndex}>
      <h2>
        <Link href={`/${link}`}>{title}</Link>
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
