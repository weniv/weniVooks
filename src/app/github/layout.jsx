import '@/styles/sub.scss';

import { DEFAULT_PATH, META_DATA, TITLE } from './data';
import menuDdata from '@/data/menu/github.json'; // 파일경로 삽입

import Header from '@/components/layouts/header/Header';
import Side from '@/components/layouts/menu/Side';
import Page from '@/components/layouts/pagecontrol/PageControl';
import BtnTop from '@/components/common/button/BtnTop';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';

export const metadata = META_DATA;

export default async function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="sub">
        <h2 className="a11y-hidden">{TITLE}</h2>
        <Side data={menuDdata} />
        <div className="sub__content">
          <Breadcrumb data={menuDdata} DEFAULT_PATH={DEFAULT_PATH} />
          {children}
        </div>
      </div>

      <Page data={menuDdata} DEFAULT_PATH={DEFAULT_PATH} />
      <BtnTop />
    </>
  );
}
