import styles from './CodeBtn.module.scss';
import Icon from '@/components/icon/Icon';
import { useCallback, useState } from 'react';

export default function CodeCopyBtn({ code }) {
  const [showNotification, setShowNotification] = useState(false);

  const copyCode = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      })
      .catch((err) => console.error('복사 실패:', err));
  }, [code]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => copyCode(code)}
        className={styles.btn}
      >
        <Icon name="copy" color="grayLv3" />
        <span className="a11y-hidden">복사</span>
      </button>
      {showNotification && <div className={styles.tooltip}>복사 완료</div>}
    </div>
  );
}
