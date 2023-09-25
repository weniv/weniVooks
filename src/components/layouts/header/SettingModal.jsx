'use client';
import Select from '@/components/common/Select';
import FontSizeRange from './FontSizeRange';
import FontStyleRadio from './FontStyleRadio';
import styles from './SettingModal.module.scss';
import ThemeRadio from './ThemeRadio';

const options = [
  {
    value: 1,
    text: '드라큘라',
  },
  {
    value: 2,
    text: '엄마는 외계인',
  },
  {
    value: 3,
    text: '초코나무 숲',
  },
  {
    value: 4,
    text: '탕후루 알로사',
  },
];

export default function SettingModal() {
  const savedCodeThemeValue = localStorage.getItem('codeTheme');
  const onSelect = (option) => {
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
            selectedValue={savedCodeThemeValue}
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
