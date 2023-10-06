import Link from 'next/link';
import classNames from 'classnames';

import styles from './Btn.module.scss';

export default function Btn(props) {
  const { href, children, type = 'button', solid, className, size } = props;

  const buttonClass = classNames(
    styles.btn,
    solid === 'true' ? styles.solid : null,
    className,
  );
  if (href) {
    return (
      <Link
        {...props}
        href={href}
        className={buttonClass}
        style={{ width: size ? `${size}rem` : null }}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...props}
      type={type}
      className={buttonClass}
      style={{ width: size ? `${size}rem` : null }}
    >
      {children}
    </button>
  );
}
