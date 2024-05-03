'use client';
import BtnIcon from '@/components/common/button/BtnIcon';
import SVGSetting from '@/components/svg/SVGSetting';
import { useEffect, useRef, useState } from 'react';

import styles from './SettingBtn.module.scss';
import SettingModal from './SettingModal';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { handleAllowScroll, handlePreventScroll } from '@/utils/handleScroll';

export default function SettingBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const pathname = usePathname();

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      handleAllowScroll();
    } else {
      setIsOpen(true);
      handlePreventScroll();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const items = modalRef.current.querySelectorAll('input');
      const settingBtn = document.querySelector('#settingBtn');
      let lastItem = items[items.length - 1];

      if (pathname === '/') {
        lastItem = modalRef.current.querySelector('[name="font"]:checked');
        let lastItems = modalRef.current.querySelectorAll('[name="font"]');

        lastItems.forEach((item) => {
          item.addEventListener('change', (e) => {
            e.target.addEventListener('keydown', handleFirstFocus);
            lastItem = e.target;
          });
        });
      }

      const handleOutsideClick = (e) => {
        if (
          !modalRef.current.contains(e.target) ||
          e.target.dataset.dim === 'dim'
        ) {
          handleToggle();
        }
      };
      const handleESC = (e) => {
        if (isOpen && e.key === 'Escape') {
          handleToggle();
        }
      };

      const handleFirstFocus = (e) => {
        if (!e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          settingBtn.focus();
        }
      };

      const handleLastFocus = (e) => {
        if (e.shiftKey && e.key === 'Tab') {
          e.preventDefault();
          lastItem.focus();
        }
      };

      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);
      });

      // tab
      lastItem.addEventListener('keydown', handleFirstFocus);
      settingBtn.addEventListener('keydown', handleLastFocus);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
        window.removeEventListener('keydown', handleESC);

        // tab
        lastItem.removeEventListener('keydown', handleFirstFocus);
        settingBtn.removeEventListener('keydown', handleLastFocus);
      };
    }
  }, [isOpen]);

  return (
    <div className={styles.standard} ref={modalRef}>
      <BtnIcon
        className={classNames(styles.btnSetting, isOpen ? styles.active : null)}
        onClick={handleToggle}
        bordernone="true"
        id="settingBtn"
      >
        <SVGSetting alt="설정" color={isOpen ? 'primary' : 'grayLv4'} />
        <span className="a11y-hidden">
          {isOpen ? '설정창 닫기' : '설정창 열기'}
        </span>
      </BtnIcon>

      {isOpen && <SettingModal isOpen={isOpen} />}
    </div>
  );
}
