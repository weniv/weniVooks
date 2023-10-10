import SVGWrap from './SVGWrap';

export default function SVGPrevArrow({ alt, color }) {
  return (
    <SVGWrap alt={alt} size={24} color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6364 4.16363C15.9879 4.5151 15.9879 5.08495 15.6364 5.43642L9.07282 12L15.6364 18.5636C15.9879 18.9151 15.9879 19.485 15.6364 19.8364C15.2849 20.1879 14.7151 20.1879 14.3636 19.8364L7.16363 12.6364C6.81216 12.2849 6.81216 11.7151 7.16363 11.3636L14.3636 4.16363C14.7151 3.81216 15.2849 3.81216 15.6364 4.16363Z"
      />
    </SVGWrap>
  );
}
