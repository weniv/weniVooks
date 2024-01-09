import '@/styles/sub.scss';

import Header from '@/components/layouts/header/Header';
import Side from '@/components/layouts/menu/Side';
import Page from '@/components/layouts/pagecontrol/PageControl';
import BtnTop from '@/components/common/button/BtnTop';

import { DEFAULT_PATH, TITLE } from './data';
import { getData } from '@/utils/getData';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';

export const metadata = {
  title: '위니브 월드(학생용) | 위니북스',
};

import menuDdata from '@/data/menu/wenivworld.json';

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
