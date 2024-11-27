import { ReactNode, Suspense } from 'react';
import Footer from '@/app/_components/footer';

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
