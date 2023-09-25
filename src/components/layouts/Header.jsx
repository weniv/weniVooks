import Link from 'next/link';
import classNames from 'classnames';

import styles from './Header.module.scss';
import Logo from '@/components/svg/Logo';
import SettingBtn from './header/SettingBtn';
import SearchForm from './header/SearchForm';

const TitleHeader = ({ children, className }) => {
  const headerClass = classNames(styles.header, className);
  return (
    <header className={headerClass}>
      <h1 className={styles.h1}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
      {children}
    </header>
  );
};

export default function Header({ onlyTitle }) {
  if (onlyTitle) {
    return <TitleHeader />;
  }

  return (
    <TitleHeader className={styles.default}>
      <div className={styles.right}>
        <SettingBtn />
        <SearchForm />
      </div>
    </TitleHeader>
  );
}
