'use client';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';
import useWindowSize from '@/utils/useWindowSize';

import { DEFAULT_PATH, MENU_DATA } from './data';
import Image from 'next/image';

export default function Home() {
  const { windowWidth } = useWindowSize();

  return (
    <>
      {windowWidth > 1024 && (
        <Breadcrumb data={MENU_DATA} DEFAULT_PATH={DEFAULT_PATH} />
      )}
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">
              "위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(학생용)
            </h3>
            <Image
              src="/images/wenivworld/cover-weniv-world-student.png"
              alt="위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(학생용)"
              className="cover"
              width={565}
              height={0}
              style={{
                height: 'auto',
              }}
            />
            {/* contents */}
          </div>
        </main>
      </div>
    </>
  );
}
