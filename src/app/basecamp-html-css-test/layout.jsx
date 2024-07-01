import '@/styles/sub.scss';
import { DEFAULT_PATH, META_DATA, TITLE } from './data';

import Header from '@/components/layouts/header/Header';

import { getMenu } from '@/sub/getMenu';
import Side from '@/components/layouts/menu/Side';
import Breadcrumb from '@/components/layouts/breadcrumb/Breadcrumb';

import BtnTop from '@/components/common/button/BtnTop';
import PageControl from '@/components/layouts/pagecontrol/PageControl';

export const metadata = META_DATA;

export default function Layout({ children }) {
  const menuData = getMenu(DEFAULT_PATH, TITLE);

  return (
    <>
      <Header />

      <div className="sub">
        <h2 className="a11y-hidden">{TITLE}</h2>
        <Side data={menuData} />
        <div className="sub__content">
          <Breadcrumb data={menuData} DEFAULT_PATH={DEFAULT_PATH} />
          {children}
        </div>
      </div>

      <PageControl data={menuData} DEFAULT_PATH={DEFAULT_PATH} />

      <BtnTop />
    </>
  );
}
