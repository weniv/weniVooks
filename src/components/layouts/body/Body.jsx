'use client';
import { SettingContext } from '@/context/SettingContext';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';

const BeforeFn = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme !== 'auto' && savedTheme !== null) {
    document.body.classList.add(savedTheme);
  }

  const savedFontStyle = localStorage.getItem('fontStyle');
  if (savedFontStyle !== null) {
    document.body.classList.add(savedFontStyle);
  }

  const savedFontSize = localStorage.getItem('fontSize');

  if (savedFontSize !== null) {
    document.body.classList.add('size' + savedFontSize);
  }

  const savedOpen = localStorage.getItem('menu');

  if (savedOpen === 'close') {
    document.body.classList.add('side-close');
  } else if (savedOpen === 'open') {
    document.body.classList.add('side-open');
  }
};

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

      <script
        dangerouslySetInnerHTML={{
          __html: `(${String(BeforeFn)})()`,
        }}
      ></script>
    </body>
  );
}
