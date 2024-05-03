import Image from 'next/image';
import useWindowSize from '@/utils/useWindowSize';
import styles from './Banner.module.scss';
import handleAnalyticsClick from '@/utils/handleAnalyticsClick';

const Content = (props) => {
  const {
    categoryColor,
    categoryBg,
    thumbnail,
    thumbnailMobile,
    category,
    title,
    description,
    index,
  } = props;
  const { windowWidth } = useWindowSize();

  return (
    <div className="max-width">
      <div className={styles.content}>
        <p
          className={styles.category}
          style={{
            color: categoryColor,
            backgroundColor: categoryBg,
          }}
        >
          {category}
        </p>
        <h3 className={styles.title}>
          {title.map((tit, index) => (
            <span key={index}>{tit}</span>
          ))}
        </h3>

        <p className={styles.description}>
          {description[0]}
          <br />
          <strong>{description[1]}</strong>
        </p>
      </div>

      {thumbnail && (
        <Image
          className={styles.thumbnail}
          src={
            windowWidth !== null && windowWidth < 640 && thumbnailMobile
              ? thumbnailMobile
              : thumbnail
          }
          width={640}
          height={394}
          alt=""
        />
      )}
    </div>
  );
};
export default function BannerItem({ data, index }) {
  const { bgColor, textColor, link, ...rest } = data;

  const isBlank = link ? link.includes('http') : null;

  return (
    <article
      className={styles.bannerItem}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {link && link ? (
        <a
          href={link}
          target={isBlank ? '_blank' : ''}
          onClick={(event) =>
            handleAnalyticsClick(event, `배너: ${rest.title.join('')}`)
          }
        >
          <Content {...rest} index={index} />
        </a>
      ) : (
        <Content {...rest} index={index} />
      )}
    </article>
  );
}
