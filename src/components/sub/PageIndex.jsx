import classNames from 'classnames';
import styles from './PageIndex.module.scss';

export default function PageIndex(props) {
  const { className } = props;
  return (
    <div className={classNames(styles.pageIndex, className)}>PageIndex</div>
  );
}
