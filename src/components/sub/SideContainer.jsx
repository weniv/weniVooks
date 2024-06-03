import classNames from 'classnames';

import styles from './SideContainer.module.scss';
import BookIndex from './BookIndex';
import SVGNavArrow from '../svg/SVGNavArrow';
import SVGListClose from '../svg/SVGListClose';

export default function SideContainer(props) {
  const { className, setIsOpen } = props;

  return (
    <div className={classNames(styles.sideContainer, className)}>
      <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
        <SVGListClose color="grayLv3" />
        <span className="a11y-hidden">책 목차 닫기</span>
      </button>
      <BookIndex {...props} />
    </div>
  );
}
