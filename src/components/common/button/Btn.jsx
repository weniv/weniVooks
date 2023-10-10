import Link from 'next/link';
import classNames from 'classnames';

import styles from './Btn.module.scss';

export default function Btn(props) {
  const {
    children,
    href,
    type = 'button',
    className,
    solid,
    borderNone,
  } = props;

  const btnStyle = classNames(
    solid && styles.solid,
    borderNone && styles.borderNone,
    className,
    styles.btn,
  );

  if (href) {
    return (
      <Link {...props} href={href} className={btnStyle}>
        {children}
      </Link>
    );
  }
  return (
    <button {...props} type={type} className={btnStyle}>
      {children}
    </button>
  );
}
