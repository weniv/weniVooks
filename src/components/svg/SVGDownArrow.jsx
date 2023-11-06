import SVGWrap from './SVGWrap';

export default function SVGDownArrow({ alt, color }) {
  return (
    <SVGWrap alt={alt} size={20} color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.71967 6.71967C4.01256 6.42678 4.48744 6.42678 4.78033 6.71967L10.25 12.1893L15.7197 6.71967C16.0126 6.42678 16.4874 6.42678 16.7803 6.71967C17.0732 7.01256 17.0732 7.48744 16.7803 7.78033L10.7803 13.7803C10.4874 14.0732 10.0126 14.0732 9.71967 13.7803L3.71967 7.78033C3.42678 7.48744 3.42678 7.01256 3.71967 6.71967Z"
      />
    </SVGWrap>
  );
}
