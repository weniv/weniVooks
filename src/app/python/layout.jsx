import '@/styles/sub.scss';

import Header from '@/components/layouts/header/Header';
import Side from '@/components/layouts/menu/Side';
import Page from '@/components/layouts/pagecontrol/PageControl';
import BtnTop from '@/components/common/button/BtnTop';

import { DEFAULT_PATH, MENU_DATA } from './data';

export const metadata = {
  title: '위니브 월드 | 위니북스',
};

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="sub">
        <Side data={MENU_DATA} />
        <div className="sub__content">{children}</div>
      </div>

      <Page data={MENU_DATA} DEFAULT_PATH={DEFAULT_PATH} />
      <BtnTop />
    </>
  );
}
