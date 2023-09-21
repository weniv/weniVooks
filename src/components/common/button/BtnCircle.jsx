import styles from './BtnCircle.module.scss';
import Btn from './Btn';

export default function BtnCircle(props) {
  return <Btn className={styles.btnCircle} {...props} />;
}
