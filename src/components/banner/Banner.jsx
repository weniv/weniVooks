'use client';

import bannerData from '@/data/mainBanner.json';

import styles from './Banner.module.scss';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import BannerItem from './BannerItem';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <h2 className="a11y-hidden">배너 모음</h2>
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
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
