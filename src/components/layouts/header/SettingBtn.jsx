'use client';
import BtnIcon from '@/components/common/button/BtnIcon';
import SVGSetting from '@/components/svg/SVGSetting';
import { useEffect, useRef, useState } from 'react';

import styles from './SettingBtn.module.scss';
import SettingModal from './SettingModal';
import classNames from 'classnames';

export default function SettingBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleESC = (e) => {
      if (isOpen && e.key === 'Escape') {
        handleToggle();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);
      });
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isOpen]);
  return (
    <div className={styles.standard} ref={modalRef}>
      <BtnIcon
        children={
          <SVGSetting alt="설정" color={isOpen ? 'primary' : 'grayLv4'} />
        }
        className={classNames(styles.btnSetting, isOpen ? styles.active : null)}
        onClick={handleToggle}
      />

      {isOpen && <SettingModal />}
    </div>
  );
}
