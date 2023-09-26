'use client';
import { createContext, useEffect, useState } from 'react';
export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [codeTheme, setCodeTheme] = useState(null);
  const [fontStyle, setFontStyle] = useState(null);
  const [fontSize, setFontSize] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === null ? 'auto' : savedTheme);

    const savedFontStyle = localStorage.getItem('fontStyle');
    setFontStyle(savedFontStyle === null ? 'sansSerif' : savedFontStyle);

    const savedCodeTheme = localStorage.getItem('codeTheme');
    setCodeTheme(savedCodeTheme === null ? null : savedCodeTheme);
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
      }}>
      {children}
    </SettingContext.Provider>
  );
}
