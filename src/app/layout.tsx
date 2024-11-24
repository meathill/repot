import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import HeaderNav from './_components/header-nav';
import { Suspense } from 'react';

const NextBookFont = localFont({
  display: 'swap',
  preload: true,
  src: [
    {
      path: './fonts/NEXT/NEXT-Book-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/NEXT/NEXT-Book-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/NEXT/NEXT-Book-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-next-book',
});
const NextPosterFont = localFont({
  src: [
    {
      path: './fonts/NEXT/NEXT-Poster-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/NEXT/NEXT-Poster-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/NEXT/NEXT-Poster-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-next-poster',
});

export const metadata: Metadata = {
  title: 'Repot',
  description: 'Repot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`${NextBookFont.variable} ${NextPosterFont.variable} antialiased bg-ivory`}
    >
    <HeaderNav/>
    <Suspense>
      {children}
    </Suspense>
    </body>
  );
}
