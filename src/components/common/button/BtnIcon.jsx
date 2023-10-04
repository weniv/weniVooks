import classNames from 'classnames';
import Btn from './Btn';

import styles from './BtnIcon.module.scss';

export default function BtnIcon(props) {
  const { className } = props;

  return <Btn {...props} className={classNames(styles.btnIcon, className)} />;
}
