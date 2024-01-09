import Image from 'next/image';
import styles from './SubBanner.module.scss';

import banner from '@/data/subBanner.json';

export default function SubBanner() {
  return (
    <div className={styles.banner}>
      <ol>
        {banner.map((banner, index) => (
          <li key={index}>
            <a href="#">
              <h3>{banner.title}</h3>
              <p>{banner.subText}</p>
              <Image src={banner.src} alt="" width={112} height={112} />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
