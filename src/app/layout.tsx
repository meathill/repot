import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import HeaderNav from './_components/header-nav';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { UserProfile } from '@/types';
import AiChatbot from '@/app/_components/chatbot/ai-chatbot';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieObj = await cookies();
  const json = cookieObj.get('repot-user');
  const user: UserProfile | undefined = json ? JSON.parse(json.value) : undefined;
  return (
    <html>
      <body
        className={`${NextBookFont.variable} ${NextPosterFont.variable} antialiased bg-ivory`}
      >
        <HeaderNav user={user}/>
        {children}

        <AiChatbot />
      </body>
    </html>
  );
}
