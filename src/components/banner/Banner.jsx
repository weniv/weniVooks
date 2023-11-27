'use client';

import styles from './Banner.module.scss';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import BannerItem from './BannerItem';

export default function Banner() {
  const bannerData = require('/public/data/mainBanner.json');

  return (
    <section className={styles.banner}>
      <h2 className="a11y-hidden">배너 모음</h2>
      <Swiper
        modules={[Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
      >
        {bannerData.map((banner, index) => (
          <SwiperSlide key={index}>
            <BannerItem data={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
