import styles from './CodeBtn.module.scss';

import Icon from '@/components/icon/Icon';
import { useCallback } from 'react';

export default function CodeCopyBtn({ code }) {
  const copyCode = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => alert('코드가 클립보드에 복사되었습니다.'))
      .catch((err) => console.error('복사 실패:', err));
  }, [code]);

  return (
    <button type="button" onClick={() => copyCode(code)} className={styles.btn}>
      <Icon name="copy" color="grayLv3" />
      <span className="a11y-hidden">복사</span>
    </button>
  );
}
