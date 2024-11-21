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
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
            rel="stylesheet"/>
    </head>
    <body
      className={`${NextBookFont.variable} ${NextPosterFont.variable} antialiased bg-ivory`}
    >
    <HeaderNav/>
    <Suspense>
      {children}
    </Suspense>
    </body>
    </html>
  );
}
