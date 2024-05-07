import Image from 'next/image';
import styles from './SubBanner.module.scss';

import banner from '@/data/subBanner.json';
import handleAnalyticsClick from '@/utils/handleAnalyticsClick';

export default function SubBanner() {
  const randomNum = Math.floor(Math.random() * banner.length);

  if (banner.length > 0) {
    return (
      <div className={styles.banner}>
        <a
          href={banner[randomNum].url}
          target="_blank"
          style={{
            backgroundColor:
              banner[randomNum].bgColor && banner[randomNum].bgColor,
            color: banner[randomNum].textColor && banner[randomNum].textColor,
            border: banner[randomNum].bgColor && 'none',
          }}
          onClick={(event) =>
            handleAnalyticsClick(event, `서브 배너: ${banner[randomNum].title}`)
          }
        >
          <h3>{banner[randomNum].title}</h3>
          <p>{banner[randomNum].subText}</p>
          <Image src={banner[randomNum].src} alt="" width={112} height={112} />
        </a>
      </div>
    );
  }
}
