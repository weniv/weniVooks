import Link from 'next/link';
import classNames from 'classnames';

import styles from './Btn.module.scss';

export default function Btn(props) {
  const { href, children, type = 'button', solid, className } = props;

  const buttonClass = classNames(
    styles.btn,
    solid === 'true' ? styles.solid : null,
    className,
  );
  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={buttonClass} {...props}>
      {children}
    </button>
  );
}
