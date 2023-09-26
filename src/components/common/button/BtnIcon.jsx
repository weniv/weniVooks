import classNames from 'classnames';
import Btn from './Btn';

import styles from './BtnIcon.module.scss';

export default function BtnIcon(props) {
  const { className, border, active } = props;

  const buttonClass = classNames(
    styles.btnIcon,
    border === 'none' ? styles.borderNone : null,
    className,
    active ? styles.active : null,
  );
  return <Btn className={buttonClass} {...props} />;
}
