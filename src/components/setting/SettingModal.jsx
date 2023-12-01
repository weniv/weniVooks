'use client';

import styles from './SettingModal.module.scss';

import ThemeRadio from '@/components/setting/ThemeRadio';
import FontStyleRadio from '@/components/setting/FontStyleRadio';
import FontSizeRange from '@/components/setting/FontSizeRange';
import useWindowSize from '@/utils/useWindowSize';

export default function SettingModal() {
  const { windowWidth } = useWindowSize();

  return (
    <>
      <section className={styles.setting}>
        <div>
          <h2 className="a11y-hidden">설정</h2>

          <h3>테마설정</h3>
          <ThemeRadio />

          <h3>폰트 스타일</h3>
          <FontStyleRadio />

          <h3>폰트 사이즈</h3>
          <FontSizeRange />
        </div>
      </section>

      {windowWidth && windowWidth < 640 && (
        <div data-dim="dim" className="dim"></div>
      )}
    </>
  );
}
