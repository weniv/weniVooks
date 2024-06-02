import '@/components/sub/sub.scss';

import { DEFAULT_PATH, META_DATA, TITLE } from './data';

import Header from '@/components/layouts/header/Header';
import SubLayout from '@/components/sub/SubLayout';
import { getMenu } from './getMenu';

export const metadata = META_DATA;

export default async function Layout({ children }) {
  const menuData = await getMenu(DEFAULT_PATH);

  return (
    <>
      <Header />

      <SubLayout data={menuData} link={DEFAULT_PATH} title={TITLE}>
        {children}
      </SubLayout>
    </>
  );
}
