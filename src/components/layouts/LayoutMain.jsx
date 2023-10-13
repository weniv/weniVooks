'use client';
import { useContext } from 'react';
import { SettingContext } from '@/context/SettingContext';

export default function LayoutMain({ children }) {
  const { fontSize } = useContext(SettingContext);

  return <main className={`size${fontSize}`}>{children}</main>;
}
