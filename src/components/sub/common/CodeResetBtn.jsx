import styles from './CodeBtn.module.scss';
import Icon from '@/components/icon/Icon';

export default function CodeResetBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.btn}>
      <Icon name="reset" color="grayLv3" />
      <span className="a11y-hidden">초기화</span>
    </button>
  );
}
