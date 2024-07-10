import '@/styles/sub.scss';
// components
import BtnTop from '@/components/common/button/BtnTop';
import Header from '@/components/layouts/header/Header';
import PageControl from '@/components/layouts/pagecontrol/PageControl';
import Side from '@/components/layouts/menu/Side';
import NewBreadcrumb from '@/components/sub/layout/NewBreadcrumb';

export default function BookLayout({
  children,
  menuData,
  DEFAULT_PATH,
  TITLE,
}) {
  return (
    <>
      <Header />
      <div className="sub">
        <h2 className="a11y-hidden">{TITLE || ''}</h2>
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
