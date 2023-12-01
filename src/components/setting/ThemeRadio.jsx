'use client';

import RadioList from '@/components/common/radio/RadioList';
import { SettingContext } from '@/context/SettingContext';
import { useContext } from 'react';

const list = [
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'auto', label: '자동' },
];

export default function ThemeRadio() {
  const { theme, setTheme } = useContext(SettingContext);

  const onChange = (e) => {
    const newTheme = e.target.value;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <RadioList list={list} name="theme" onChange={onChange} state={theme} />
  );
}
