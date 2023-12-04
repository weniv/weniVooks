'use client';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './Header.module.scss';

import useWindowSize from '@/utils/useWindowSize';

import SVGSearch from '@/components/svg/SVGSearch';
import Logo from '@/components/svg/Logo';
import BtnIcon from '@/components/common/button/BtnIcon';
import SettingBtn from '@/components/setting/SettingBtn';
import SearchForm from '@/components/search/SearchForm';

const TitleHeader = ({ children, className }) => {
  const headerClass = classNames(styles.header, className);
  return (
    <header className={headerClass}>
      <h1 className={styles.h1}>
        <Link href="/" scroll={false}>
          <Logo />
        </Link>
      </h1>
      {children}
    </header>
  );
};

export default function Header({ onlyTitle, position, border }) {
  const { windowWidth } = useWindowSize();

  if (onlyTitle) {
    return <TitleHeader />;
  }

  return (
    <TitleHeader
      className={classNames(
        styles.default,
        border && styles.border,
        position === 'fixed' && styles.fixed,
      )}
    >
      <div className={styles.right}>
        <SettingBtn />
        {windowWidth > 640 ? (
          <SearchForm />
        ) : (
          <BtnIcon
            href="/search"
            bordernone="true"
            className={styles.searchBtn}
            children={<SVGSearch color="grayLv4" />}
          />
        )}
      </div>

      {/* {scroll !== 'false' && <ScrollBar />} */}
    </TitleHeader>
  );
}
