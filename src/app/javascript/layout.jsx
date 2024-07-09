import '@/styles/sub.scss';

import Header from '@/components/layouts/header/Header';
import { getMenu } from '@/sub/getMenu';
import Side from '@/components/layouts/menu/Side';
import BtnTop from '@/components/common/button/BtnTop';
import PageControl from '@/components/layouts/pagecontrol/PageControl';
import NewBreadcrumb from '@/components/sub/layout/NewBreadcrumb';
import { DEFAULT_PATH, TITLE } from './bookInfo';

export default function Layout({ children }) {
  let title = TITLE || '';
  const menuData = getMenu(DEFAULT_PATH, title);

  return (
    <>
      <Header />
      <div className="sub">
        <h2 className="a11y-hidden">{title}</h2>
        <Side data={menuData} />
        <div className="sub__content">
          <NewBreadcrumb data={menuData} DEFAULT_PATH={DEFAULT_PATH} />

          {children}
        </div>
      </div>

      <PageControl data={menuData} DEFAULT_PATH={DEFAULT_PATH} />
      <BtnTop />
    </>
  );
}
