import Btn from '../common/button/Btn';
import styles from './Banner.module.scss';
export default function BannerItem({ data }) {
  const { bgcolor, thumbnail, category, title, description, link } = data;

  return (
    <article className={styles.bannerItem} style={{ backgroundColor: bgcolor }}>
      <div className="max-width">
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
      </div>
    </article>
  );
}
