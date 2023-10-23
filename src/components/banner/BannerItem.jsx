import styles from './BannerItem.module.scss';

import Btn from '../common/button/Btn';

export default function BannerItem({ data, ariaHidden }) {
  const { bgcolor, thumbnail, category, title, description, link } = data;

  return (
    <li aria-hidden={ariaHidden} style={{ 'background-color': bgcolor }}>
      <article className={styles.bannerItem}>
        <div className={styles.content}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.description}>
            {description[0]}
            <br />
            <strong>{description[1]}</strong>
          </p>

          {link && (
            <Btn href={link} solid="true">
              바로가기
            </Btn>
          )}
        </div>

        {thumbnail && (
          <img className={styles.thumbnail} src={thumbnail} alt="" />
        )}
      </article>
    </li>
  );
}
