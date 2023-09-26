'use client';
import { SettingContext } from '@/context/SettingContext';
import { useContext } from 'react';

export default function Body({ children }) {
  const { theme, fontStyle } = useContext(SettingContext);
  return (
    <body
      className={`${theme === 'dark' ? 'dark' : 'light'}
  ${fontStyle === 'serif' ? 'serif' : 'sansSerif'}`}
      suppressHydrationWarning={true}>
      {children}
    </body>
  );
}
