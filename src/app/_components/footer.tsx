import Link from 'next/link';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

export default function Footer({
  children,
  className,
}: Readonly<{
  children?: ReactNode;
  className?: string;
}>) {
  return (
    <footer className={clsx('flex flex-col p-6 sm:p-14 border border-primary-800 bg-main-green rounded-2.5xl shadow-[0_8px_0_0_#000]', className)}>
      {children}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="font-logo font-bold text-4xl text-primary-800 mb-12 sm:mb-0">
          Repot
          <br />
          <span className="text-xs font-light">v{process.env.VERSION}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
          <div className="flex flex-col gap-4 sm:gap-10">
            <div className="font-title font-bold text-lg text-dark-green">
              Repot
            </div>
            <div className="flex flex-row justify-between sm:justify-normal sm:gap-6">
              <Link href="#">Documentation</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-10">
            <div className="font-title font-bold text-lg text-dark-green">
              Social
            </div>
            <div className="flex flex-row justify-between sm:justify-normal sm:gap-6">
              <Link href="#">Discord</Link>
              <Link href="#">X</Link>
              <Link href="#">Telegram</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
