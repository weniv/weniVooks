import '@/styles/sub.scss';

import Header from '@/components/layouts/header/Header';
import Side from '@/components/layouts/menu/Side';
import Page from '@/components/layouts/pagecontrol/PageControl';
import BtnTop from '@/components/common/button/BtnTop';

import { DEFAULT_PATH, MENU_DATA } from './data';
import { TITLE } from '../wenivworld-teacher/data';

export const metadata = {
  title: '위니브 월드 | 위니북스',
};

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
