import styles from '@/components/common/Button.module.scss';
import Link from 'next/link';

export default function Button({
  children = '버튼',
  href = '',
  target = null,
  type = 'button',
  borderNone,
  onClick,
  style,
  className,
}) {
  let buttonClass = styles.button;

  if (className) {
    buttonClass += ` ${className}`;
  }
  if (style) {
    buttonClass += ` ${styles[style]}`;
  }
  if (borderNone) {
    buttonClass += ` ${styles.borderNone}`;
  }

  if (href) {
    return (
      <Link className={buttonClass} href={href} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
