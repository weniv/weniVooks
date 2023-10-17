'use client';
import { SettingContext } from '@/context/SettingContext';
import classNames from 'classnames';
import { useContext } from 'react';

export default function Body({ children }) {
  const { theme, fontStyle } = useContext(SettingContext);
  return (
    <body
      className={classNames(theme !== 'auto' && theme, fontStyle)}
      suppressHydrationWarning={true}
    >
      {children}
    </body>
  );
}
