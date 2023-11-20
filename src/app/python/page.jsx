'use client';
import '@/styles/subpage.scss';
import { DEFAULT_PATH, MENU_DATA } from './data';

import Breadcrumb from '@/components/layouts/Breadcrumb';
import useWindowSize from '@/context/useWindowSize';

import dynamic from 'next/dynamic';
const PythonCodeblock = dynamic(
  () => import('../../components/codeblock/PythonCodeblock'),
  {
    ssr: false,
  },
);

const JavascriptCodeblock = dynamic(
  () => import('../../components/codeblock/JavascriptCodeblock'),
  {
    ssr: false,
  },
);

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
            <h3 className="title">파이썬 부트캠프</h3>
            <PythonCodeblock />
            {/* <JavascriptCodeblock /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
