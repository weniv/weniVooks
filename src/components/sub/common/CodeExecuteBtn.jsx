import styles from './CodeBtn.module.scss';
import ExecutionIcon from '@/components/svg/ExecutionIcon';

export default function CodeExecuteBtn({ onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} className={styles.executeBtn}>
      <ExecutionIcon color={disabled ? 'grayLv2' : 'primary'} />
      <span className="a11y-hidden">실행</span>
    </button>
  );
}
