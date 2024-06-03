import SVGList from '../svg/SVGList';
import styles from './SubBreadcrumb.module.scss';
export default function SubBreadcrumb({ isOpen, setIsOpen }) {
  return (
    <div className={styles.subBreadcrumb}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>
          <SVGList color="grayLv3" />
          <span className="a11y-hidden">책 목차 열기</span>
        </button>
      )}
      SubBreadcrumb
    </div>
  );
}
