'use client';
import { SettingContext } from '@/context/SettingContext';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';

export default function Body({ children }) {
  const { theme, fontStyle, fontSize, menu } = useContext(SettingContext);
  const [isWindows, setIsWindows] = useState(false);
  useEffect(() => {
    if (navigator.userAgent.includes('Windows')) {
      setIsWindows(true);
    }
  }, []);

  return (
    <body
      className={classNames(
        theme !== 'auto' && theme,
        fontStyle,
        fontSize !== null && `size${fontSize}`,

        menu === null ? `side-open` : `side-${menu}`,
        isWindows && 'windows',
      )}
      suppressHydrationWarning={true}
    >
      {children}
    </body>
  );
}
