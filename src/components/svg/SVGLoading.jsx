export default function SVGLoading({ color }) {
  return (
    <svg
      width="194"
      height="117"
      viewBox="0 0 194 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          d="M23 110C35.7026 110 46 99.7026 46 87C46 74.2975 35.7026 64 23 64C10.2975 64 0 74.2975 0 87C0 99.7026 10.2975 110 23 110Z"
          style={{ fill: `${color ? `var(--${color})` : 'var(--primary)'}` }}
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0; 0 -28; 0 -48; 0 -57; 0 -64; 0 -36; 0 -16; 0 -8; 0 0; 0 0; 0 0; 0 0;"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <path
          d="M97 110C109.703 110 120 99.7026 120 87C120 74.2975 109.703 64 97 64C84.2975 64 74 74.2975 74 87C74 99.7026 84.2975 110 97 110Z"
          style={{ fill: `${color ? `var(--${color})` : 'var(--primary)'}` }}
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0; 0 0; 0 0; 0 -28; 0 -48; 0 -57; 0 -64; 0 -36; 0 -16; 0 -8; 0 0; 0 0;"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <path
          d="M171 110C183.703 110 194 99.7026 194 87C194 74.2975 183.703 64 171 64C158.297 64 148 74.2975 148 87C148 99.7026 158.297 110 171 110Z"
          style={{ fill: `${color ? `var(--${color})` : 'var(--primary)'}` }}
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0; 0 0; 0 0; 0 0; 0 0; 0 -28; 0 -48; 0 -57; 0 -64; 0 -36; 0 -16; 0 -8; "
          dur="0.6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
