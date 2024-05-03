'use client';

import Image from 'next/image';
import Btn from '../common/button/Btn';
import styles from './BookItem.module.scss';
import handleAnalyticsClick from '@/utils/handleAnalyticsClick';

export default function BookItem({ data }) {
  const {
    thumbnail,
    type,
    title,
    subtitle,
    publisher,
    price,
    description,
    booklink,
    classlink,
  } = data;

  return (
    <article className={styles.bookItem}>
      <div className={styles.thumbnail}>
        {thumbnail && <Image src={thumbnail} width={152} height={226} alt="" />}
      </div>
      <div className={styles.content}>
        <p className={styles.info}>
          주식회사 위니브 <wbr />| 출판사: {publisher}
        </p>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
        </div>
        {price && (
          <p className={styles.price}>
            {type} <strong>{price}</strong>
          </p>
        )}
        <p className={styles.desc}>{description}</p>
      </div>
      <div className={styles.btnGroup}>
        {booklink && (
          <Btn href={booklink} solid="true">
            Web-book
          </Btn>
        )}
        {classlink && (
          <Btn
            href={classlink}
            target="_blank"
            onClick={(event) =>
              handleAnalyticsClick(event, `온라인 강의: ${title}`)
            }
          >
            온라인 강의
          </Btn>
        )}
      </div>
    </article>
  );
}
