'use client';

import { DEFAULT_PATH, MENU_DATA } from './data';

import useWindowSize from '@/utils/useWindowSize';

import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';
import PythonCodeblock from '@/components/codeblock/PythonCodeblock';

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
            <h3 className="title">파이썬 부트캠프</h3>
            <p>표지 준비중....</p>
            {/* contents */}
          </div>
        </main>
      </div>
    </>
  );
}
