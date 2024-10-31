import * as React from 'react';

export default function TelegramIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_67_13261)">
        <path
          d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
          fill="url(#paint0_linear_67_13261)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.864 23.7469C17.8605 20.6986 22.5259 18.689 24.8603 17.7181C31.5254 14.9459 32.9103 14.4643 33.813 14.4484C34.0115 14.4449 34.4554 14.4941 34.743 14.7274C34.9858 14.9245 35.0526 15.1906 35.0846 15.3774C35.1165 15.5642 35.1563 15.9897 35.1247 16.3222C34.7635 20.1172 33.2007 29.3265 32.4056 33.577C32.0692 35.3755 31.4067 35.9785 30.7654 36.0375C29.3717 36.1658 28.3134 35.1164 26.9635 34.2316C24.8512 32.8469 23.6578 31.985 21.6075 30.6338C19.2379 29.0723 20.774 28.2141 22.1244 26.8115C22.4778 26.4445 28.6186 20.8589 28.7374 20.3523C28.7523 20.2889 28.7661 20.0527 28.6258 19.9279C28.4854 19.8032 28.2783 19.8459 28.1289 19.8798C27.917 19.9279 24.5426 22.1582 18.0055 26.5709C17.0477 27.2286 16.1801 27.5491 15.4028 27.5323C14.5459 27.5138 12.8975 27.0478 11.6721 26.6495C10.1691 26.1609 8.97456 25.9026 9.07858 25.0729C9.13276 24.6407 9.72791 24.1987 10.864 23.7469Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_67_13261"
          x1="24"
          y1="0"
          x2="24"
          y2="47.644"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2AABEE" />
          <stop offset="1" stop-color="#229ED9" />
        </linearGradient>
        <clipPath id="clip0_67_13261">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}