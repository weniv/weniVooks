import '@/styles/sub.scss';

import Header from '@/components/layouts/header/Header';
import Side from '@/components/layouts/menu/Side';
import Page from '@/components/layouts/pagecontrol/PageControl';
import BtnTop from '@/components/common/button/BtnTop';

import { DEFAULT_PATH, MENU_DATA, META_DATA, TITLE } from './data';

export const metadata = META_DATA;

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="sub">
        <h2 className="a11y-hidden">{TITLE}</h2>
        <Side data={MENU_DATA} />
        <div className="sub__content">{children}</div>
      </div>

      <Page data={MENU_DATA} DEFAULT_PATH={DEFAULT_PATH} />
      <BtnTop />
    </>
  );
}
