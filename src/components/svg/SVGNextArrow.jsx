import SVGWrap from './SVGWrap';

export default function SVGNextArrow({ alt, color }) {
  return (
    <SVGWrap alt={alt} size={24} color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.36358 19.8364C8.01211 19.4849 8.01211 18.9151 8.36358 18.5636L14.9272 12L8.36358 5.43637C8.01211 5.0849 8.01211 4.51505 8.36358 4.16358C8.71505 3.81211 9.2849 3.81211 9.63637 4.16358L16.8364 11.3636C17.1878 11.7151 17.1878 12.2849 16.8364 12.6364L9.63637 19.8364C9.2849 20.1878 8.71505 20.1878 8.36358 19.8364Z"
      />
    </SVGWrap>
  );
}
