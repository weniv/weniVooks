export default function SVGWrap({
  children,
  alt,
  size = 20,
  color = 'grayLv2',
}) {
  return (
    <svg
      role="img"
      aria-label={alt}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g style={{ fill: `var(--${color})` }}>{children}</g>
    </svg>
  );
}
