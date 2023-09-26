'use client';

import { useContext } from 'react';
import styles from './FontStyleRadio.module.scss';
import RadioList from '@/components/common/RadioList';
import { SettingContext } from '@/context/SettingContext';

export default function RadioFont() {
  const { fontStyle, setFontStyle } = useContext(SettingContext);

  const onChange = (e) => {
    const newStyle = e.target.value;
    localStorage.setItem('fontStyle', newStyle);

    setFontStyle(newStyle);
  };

  const sansSerif = (
    <span className={styles.sansSerif}>
      <span>
        가<span>Ag</span>
      </span>
      기본
    </span>
  );
  const serif = (
    <span className={styles.serif}>
      <span>
        가<span>Ag</span>
      </span>
      세리프
    </span>
  );
  const list = [
    { value: 'sansSerif', label: sansSerif },
    { value: 'serif', label: serif },
  ];

  return (
    <RadioList list={list} name="font" onChange={onChange} state={fontStyle} />
  );
}
