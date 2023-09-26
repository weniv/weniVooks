import Link from 'next/link';

import styles from './Header.module.scss';

import Logo from '@/components/svg/Logo';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
    </header>
  );
}
