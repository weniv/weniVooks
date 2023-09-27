import styles from './BtnCircle.module.scss';
import Btn from './Btn';
import classNames from 'classnames';

export default function BtnCircle(props) {
  const { className } = props;

  return <Btn {...props} className={classNames(styles.btnCircle, className)} />;
}
