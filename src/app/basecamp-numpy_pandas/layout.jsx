import '@/styles/sub.scss';
import { DEFAULT_PATH, DESCRIPTION, TITLE, OG_IMG } from './bookInfo';
import { getMenu } from '@/sub/getMenu';

// components
import BtnTop from '@/components/common/button/BtnTop';
import Header from '@/components/layouts/header/Header';
import PageControl from '@/components/layouts/pagecontrol/PageControl';
import Side from '@/components/layouts/menu/Side';
import NewBreadcrumb from '@/components/sub/layout/NewBreadcrumb';

// meta
export async function generateMetadata(parent) {
  const IMG = OG_IMG || (await parent).openGraph?.images;

  return {
    title: `${TITLE} | 위니북스`,
    description: DESCRIPTION,
    openGraph: {
      type: 'website',
      title: `${TITLE} | 위니북스`,
      url: `https://books.weniv.co.kr/${DEFAULT_PATH}`,
      siteName: '위니북스',
      images: [IMG],
    },
  };
}

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
