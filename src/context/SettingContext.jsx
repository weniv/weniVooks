'use client';

import { createContext, useEffect, useState } from 'react';
export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [codeTheme, setCodeTheme] = useState(null);
  const [fontStyle, setFontStyle] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [isSavedClose, setIsSavedClose] = useState(null);

  useEffect(() => {
    // auto(default) / light / dark
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === null ? 'auto' : savedTheme);

    // sansSerif(default) / serif
    const savedFontStyle = localStorage.getItem('fontStyle');
    setFontStyle(savedFontStyle === null ? 'sansSerif' : savedFontStyle);

    const savedCodeTheme = localStorage.getItem('codeTheme');
    setCodeTheme(savedCodeTheme !== null && savedCodeTheme);

    // 0,1,2(default),3,4
    const savedFontSize = localStorage.getItem('fontSize');
    setFontSize(savedFontSize === null ? '2' : savedFontSize);

    // null, close
    const savedClose = localStorage.getItem('menu');
    setIsSavedClose(savedClose === null ? false : true);
  }, []);

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        codeTheme,
        setCodeTheme,
        fontStyle,
        setFontStyle,
        fontSize,
        setFontSize,
        isSavedClose,
        setIsSavedClose,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
