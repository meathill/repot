import { ReactNode, Suspense } from 'react';
import Footer from "@/app/_components/footer";

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return <Suspense>
    <main className="container mx-auto">
      {children}
    </main>
    <Footer className="container mx-6 sm:mx-auto my-8"/>
  </Suspense>
}
