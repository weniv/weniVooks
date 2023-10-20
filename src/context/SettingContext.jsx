'use client';

import { createContext, useEffect, useState } from 'react';
export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [codeTheme, setCodeTheme] = useState(null);
  const [fontStyle, setFontStyle] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    // auto(default) / light / dark
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme !== null && savedTheme);

    // sansSerif(default) / serif
    const savedFontStyle = localStorage.getItem('fontStyle');
    setFontStyle(savedFontStyle !== null && savedFontStyle);

    const savedCodeTheme = localStorage.getItem('codeTheme');
    setCodeTheme(savedCodeTheme !== null && savedCodeTheme);

    // 0,1,2(default),3,4
    const savedFontSize = localStorage.getItem('fontSize');
    setFontSize(savedFontSize !== null && savedFontSize);

    // open(default), close
    const savedOpen = localStorage.getItem('menu');
    setMenu(savedOpen !== null && savedOpen);
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
        menu,
        setMenu,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
