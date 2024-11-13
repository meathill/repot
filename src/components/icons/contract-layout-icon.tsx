import { JSX, SVGProps } from 'react';

export default function ContractLayoutIcon(
  props: SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.5"
        y="1.5"
        width="59"
        height="59"
        rx="6.5"
        stroke="#3E2D6B"
        strokeWidth="3"
      />
      <path
        d="M3 20H59.5"
        stroke="#3E2D6B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L21 59.5"
        stroke="#3E2D6B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 20V60"
        stroke="#3E2D6B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
