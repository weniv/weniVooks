'use client';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import useWindowSize from '@/context/useWindowSize';

import '@/styles/subpage.scss';

import { DEFAULT_PATH, MENU_DATA } from './data';

export default function Home() {
  const windowSize = useWindowSize();

  return (
    <div className="subContent">
      {windowSize > 1024 && (
        <Breadcrumb data={MENU_DATA} DEFAULT_PATH={DEFAULT_PATH} />
      )}
      <div className="container">
        <main className="bookContent">
          <div className="inner">
            <h3 className="title">
              "위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(학생용)
            </h3>
            <img
              src="/images/wenivworld/cover-weniv-world-student.png"
              alt="위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(학생용)"
              className="tac"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
