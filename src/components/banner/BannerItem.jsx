import useWindowSize from '@/utils/useWindowSize';
import styles from './Banner.module.scss';

const Content = ({
  categoryColor,
  thumbnail,
  thumbnailMobile,
  category,
  title,
  description,
}) => {
  const { windowWidth } = useWindowSize();

  return (
    <div className="max-width">
      <div className={styles.content}>
        <p className={styles.category} style={{ color: categoryColor }}>
          {category}
        </p>
        <h3 className={styles.title}>
          {title.map((tit) => (
            <span>{tit}</span>
          ))}
        </h3>

        <p className={styles.description}>
          {description[0]}
          <br />
          <strong>{description[1]}</strong>
        </p>
      </div>

      {thumbnail && (
        <img
          className={styles.thumbnail}
          src={
            windowWidth !== null && windowWidth < 640 && thumbnailMobile
              ? thumbnailMobile
              : thumbnail
          }
          alt=""
        />
      )}
    </div>
  );
};
export default function BannerItem({ data }) {
  const { bgColor, textColor, link, ...rest } = data;

  const isBlank = link ? link.includes('http') : null;

  return (
    <article
      className={styles.bannerItem}
      style={bgColor && { backgroundColor: bgColor, color: textColor }}
    >
      {link && link ? (
        <a href={link} target={isBlank ? '_blank' : ''}>
          <Content {...rest} />
        </a>
      ) : (
        <Content {...rest} />
      )}
    </article>
  );
}
