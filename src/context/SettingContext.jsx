'use client';
import { createContext, useState } from 'react';
export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  // 테마
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme === null ? 'auto' : savedTheme);

  // 폰트스타일
  const savedFontStyle = localStorage.getItem('fontStyle');
  const [fontStyle, setFontStyle] = useState(
    savedFontStyle === null ? 'sansSerif' : savedFontStyle,
  );

  // 폰트사이즈
  const [fontSize, setFontSize] = useState(null);

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        fontStyle,
        setFontStyle,
        fontSize,
        setFontSize,
      }}>
      {children}
    </SettingContext.Provider>
  );
}
