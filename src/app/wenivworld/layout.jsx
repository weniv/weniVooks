import classNames from 'classnames';

import '@/styles/subpage.scss';

import Header from '@/components/layouts/Header';
import Side from '@/components/layouts/Side';
import Page from '@/components/layouts/Page';
import BtnTop from '@/components/feature/BtnTop';

import { DEFAULT_PATH, MENU_DATA } from './data';

export const metadata = {
  title: '위니브 월드 | 위니북스',
  description: '위니브월드로 떠나는 파이썬 코딩 여행',
  openGraph: {
    type: 'website',
    title: '위니브 월드',
    description: '위니브월드로 떠나는 파이썬 코딩 여행',
    url: `https://books.weniv.co.kr${DEFAULT_PATH}`,
    siteName: '위니북스',
    images: ['/images/wenivworld/cover-weniv-world-student.png'],
    // images: [
    //   {
    //     url: '/images/wenivworld/cover-weniv-world-student.png',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className={classNames('layout-grow', 'wrapper')}>
        <Side data={MENU_DATA} />
        <div className={classNames('layout-content', 'content')}>
          {children}
        </div>
      </div>
      <Page data={MENU_DATA} DEFAULT_PATH={DEFAULT_PATH} />
      <BtnTop />
    </>
  );
}
