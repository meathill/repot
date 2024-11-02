import * as React from 'react';

export default function HackquestIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.51535 20.9847C5.68773 23.157 8.68621 24.5 12.0006 24.5L23.5152 23.9401L24 12.5006C24 9.18621 22.657 6.18773 20.4847 4.01535C18.3123 1.84297 15.3138 0.5 11.9994 0.5L0.559937 0.984838L0 12.4994C0 15.8138 1.34297 18.8123 3.51535 20.9847ZM11.9232 5.52287C13.8284 5.52287 15.5534 6.29706 16.8014 7.54505C18.0494 8.79304 18.8236 10.5181 18.8236 12.4232C18.8236 16.2335 15.7346 19.3225 11.9232 19.3236C10.0181 19.3236 8.29304 18.5494 7.04505 17.3014C5.79706 16.0534 5.02287 14.3284 5.02287 12.4232C5.02398 8.61191 8.11412 5.52287 11.9232 5.52287Z"
        fill={props.fill || 'black'}
      />
    </svg>
  );
}
