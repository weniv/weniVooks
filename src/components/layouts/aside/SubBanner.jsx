import styles from './SubBanner.module.scss';
import Image from 'next/image';

export default function SubBanner() {
  const banner = require('public/data/subBanner.json');

  return (
    <div className={styles.banner}>
      <ol>
        {banner.map((banner, index) => (
          <li key={index}>
            <a href="#">
              <h3>{banner.title}</h3>
              <p>{banner.subText}</p>
              <Image
                src={banner.src}
                alt=""
                sizes="100vw"
                style={{
                  height: 'auto',
                }}
                width={56}
                height={0}
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
