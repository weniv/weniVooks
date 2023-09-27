import SVGWrap from './SVGWrap';

export default function SVGNavArrow({ alt, color }) {
  return (
    <SVGWrap alt={alt} size={14} color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.60377 4.70376C2.80879 4.49873 3.14121 4.49873 3.34623 4.70376L7.175 8.53253L11.0038 4.70376C11.2088 4.49873 11.5412 4.49873 11.7462 4.70376C11.9513 4.90878 11.9513 5.24119 11.7462 5.44622L7.54623 9.64622C7.34121 9.85124 7.00879 9.85124 6.80377 9.64622L2.60377 5.44622C2.39874 5.24119 2.39874 4.90878 2.60377 4.70376Z"
      />
    </SVGWrap>
  );
}
