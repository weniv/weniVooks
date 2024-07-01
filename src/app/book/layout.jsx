import '@/components/sub/sub.scss';

import { DEFAULT_PATH, META_DATA, TITLE } from './data';

import Header from '@/components/layouts/header/Header';
import SubLayout from '@/components/sub/SubLayout';
import { getMenu } from '@/sub/getMenu';
import BtnTop from '@/components/common/button/BtnTop';

export const metadata = META_DATA;

export default function Layout({ children }) {
  const menuData = getMenu(DEFAULT_PATH, TITLE);

  return (
    <>
      <Header />

      <SubLayout DEFAULT_PATH={DEFAULT_PATH} TITLE={TITLE} menuData={menuData}>
        {children}
      </SubLayout>

      <BtnTop />
    </>
  );
}
