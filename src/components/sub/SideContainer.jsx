import classNames from 'classnames';
import BookIndex from './BookIndex';

import styles from './SideContainer.module.scss';

export default function SideContainer(props) {
  const { className } = props;
  return (
    <div className={classNames(styles.sideContainer, className)}>
      <BookIndex {...props} />
    </div>
  );
}
