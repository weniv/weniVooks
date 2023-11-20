import SVGWrap from './SVGWrap';

export default function SVGUpArrow({ alt, color }) {
  return (
    <SVGWrap alt={alt} size={20} color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7803 13.7803C16.4874 14.0732 16.0126 14.0732 15.7197 13.7803L10.25 8.31066L4.78033 13.7803C4.48744 14.0732 4.01256 14.0732 3.71967 13.7803C3.42678 13.4874 3.42678 13.0126 3.71967 12.7197L9.71967 6.71967C10.0126 6.42678 10.4874 6.42678 10.7803 6.71967L16.7803 12.7197C17.0732 13.0126 17.0732 13.4874 16.7803 13.7803Z"
      />
    </SVGWrap>
  );
}
