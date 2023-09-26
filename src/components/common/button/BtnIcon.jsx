import Btn from './Btn';

import styles from './BtnIcon.module.scss';

export default function BtnIcon(props) {
  return <Btn className={styles.btnIcon} {...props} />;
}
