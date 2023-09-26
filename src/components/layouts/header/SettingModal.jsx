'use client';
import { useContext } from 'react';
import { SettingContext } from '@/context/SettingContext';

import styles from './SettingModal.module.scss';

import Select from '@/components/common/Select';
import ThemeRadio from '@/components/layouts/header/ThemeRadio';
import FontStyleRadio from '@/components/layouts/header/FontStyleRadio';
import FontSizeRange from '@/components/layouts/header/FontSizeRange';

const options = [
  {
    value: 1,
    text: 'default',
  },
  {
    value: 2,
    text: 'dracula',
  },
  {
    value: 3,
    text: 'ayu-dark',
  },
  // {
  //   value: 1,
  //   text: '드라큘라',
  // },
  // {
  //   value: 2,
  //   text: '엄마는 외계인',
  // },
  // {
  //   value: 3,
  //   text: '초코나무 숲',
  // },
  // {
  //   value: 4,
  //   text: '탕후루 알로사',
  // },
];

export default function SettingModal() {
  const { codeTheme, setCodeTheme } = useContext(SettingContext);

  const onSelect = (option) => {
    setCodeTheme(option.value);
    localStorage.setItem('codeTheme', option.value);
  };

  return (
    <section className={styles.setting}>
      <div>
        <h2 className="a11y-hidden">설정</h2>
        <div className={styles.themeSetting}>
          <h3>테마설정</h3>
          <ThemeRadio />

          <Select
            options={options}
            onSelect={onSelect}
            selectedValue={codeTheme}
          />
        </div>

        <div className={styles.fontSetting}>
          <h3>폰트 스타일</h3>
          <FontStyleRadio />

          <h3>폰트 사이즈</h3>
          <FontSizeRange />
        </div>
      </div>
    </section>
  );
}
