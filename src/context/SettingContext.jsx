'use client';
import { createContext, useEffect, useState } from 'react';
export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [codeTheme, setCodeTheme] = useState(null);
  const [fontStyle, setFontStyle] = useState(null);
  const [fontSize, setFontSize] = useState('2');
  const [isOpenMenu, setIsOpenMenu] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme !== null && savedTheme);

    const savedFontStyle = localStorage.getItem('fontStyle');
    setFontStyle(savedFontStyle !== null && savedFontStyle);

    const savedCodeTheme = localStorage.getItem('codeTheme');
    setCodeTheme(savedCodeTheme !== null && savedCodeTheme);

    const savedFontSize = localStorage.getItem('fontSize');
    setFontSize(savedFontSize === null ? '2' : savedFontSize);

    const savedOpen = localStorage.getItem('isOpenMenu');
    setIsOpenMenu(savedOpen === 'false' ? false : true);
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
        isOpenMenu,
        setIsOpenMenu,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
