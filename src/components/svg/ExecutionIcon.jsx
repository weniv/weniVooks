import React from 'react';

export default function ExecutionIcon({ size = 30.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30px" height="30px" rx="15" fill="#2E6FF2" />
      <path
        d="M19.7894 14.7052C20.0045 14.8429 20.0045 15.1571 19.7894 15.2948L12.0387 20.2552C11.8057 20.4043 11.5 20.237 11.5 19.9604L11.5 10.0395C11.5 9.76295 11.8057 9.59564 12.0387 9.74474L19.7894 14.7052Z"
        fill="white"
      />
    </svg>
  );
}
