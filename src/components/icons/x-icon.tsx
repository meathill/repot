import * as React from 'react';

export default function XIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="44"
      height="40"
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M34.6526 0H41.3995L26.6594 16.847L44 39.7719H30.4225L19.7881 25.8681L7.61989 39.7719H0.868864L16.6349 21.7522L0 0H13.9222L23.5348 12.7087L34.6526 0ZM32.2846 35.7336H36.0232L11.8908 3.82626H7.87892L32.2846 35.7336Z"
        fill="black"
      />
    </svg>
  );
}
