import Image from 'next/image';
import useWindowSize from '@/utils/useWindowSize';
import styles from './Banner.module.scss';
import handleAnalyticsClick from '@/utils/handleAnalyticsClick';

const Content = (props) => {
  const {
    categoryColor,
    // categoryBg,
    thumbnail,
    thumbnailMobile,
    category,
    title,
    description,
    buttonText,
    textColor,
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
            // backgroundColor: categoryBg,
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
        {buttonText && (
          <button
            className={styles.button}
            style={{
              color: textColor || 'white',
              borderColor: textColor || 'white',
            }}
          >
            {buttonText}
          </button>
        )}
      </div>

      {thumbnail && (
        <div className={styles.thumbnailContainer}>
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
            priority={index === 0 ? true : false}
          />
          <div className={styles.thumbnailGradient}></div>
        </div>
      )}
    </div>
  );
};
export default function BannerItem({ data, index }) {
  const { bgColor, textColor, link, buttonText, ...rest } = data;

  const isBlank = link ? link.includes('http') : null;

  const isGradient =
    bgColor &&
    (bgColor.includes('linear-gradient') ||
      bgColor.includes('radial-gradient'));

  return (
    <article
      className={styles.bannerItem}
      style={{
        background: isGradient ? bgColor : bgColor || 'var(--grayLv2)', // 그라데이션이면 background 속성 사용
        backgroundColor: !isGradient ? bgColor : undefined, // 단색이면 backgroundColor 속성 사용
        color: textColor,
      }}
    >
      {link && link ? (
        <a
          href={link}
          target={isBlank ? '_blank' : ''}
          onClick={(event) =>
            handleAnalyticsClick(event, `배너: ${rest.title.join('')}`)
          }
        >
          <Content
            {...rest}
            buttonText={buttonText}
            textColor={textColor}
            index={index}
          />
        </a>
      ) : (
        <Content
          {...rest}
          buttonText={buttonText}
          textColor={textColor}
          index={index}
        />
      )}
    </article>
  );
}
