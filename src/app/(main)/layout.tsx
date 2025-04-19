import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/app/_components/footer'), {
  loading: () => <div className="h-16" />
});

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <>
    <main className="container mx-auto px-6 sm:px-0">
      <Suspense>
        {children}
      </Suspense>
    </main>
    <div className="p-6 sm:px-0">
      <Footer className="container sm:mx-auto"/>
    </div>
  </>;
}
