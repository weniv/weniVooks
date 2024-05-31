import Link from 'next/link';

import styles from './BookIndex.module.scss';

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
              <Item key={index} {...data} />
            ))}
          </ol>
        )}
      </nav>
    </div>
  );
}

const Item = (props) => {
  const { title, link, sections } = props;

  return (
    <li>
      <Link href={link}>{title}</Link>
      {sections && (
        <ol>
          {sections.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>&gt; {item.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
};
