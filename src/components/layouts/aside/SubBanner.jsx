import styles from './SubBanner.module.scss';

export default function SubBanner() {
  const banner = require('public/data/subBanner.json');

  return (
    <div className={styles.banner}>
      <ol>
        {banner.map((banner) => (
          <li>
            <a href="#">
              <h3>{banner.title}</h3>
              <p>{banner.subText}</p>
              <img src={banner.src} alt="" />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
