import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 text-center px-4 py-12">
      <div className="max-w-5xl w-full">
        <p className="text-3xl font-medium mb-6">404</p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl/tight mb-12">This page took a <br /> liquidity break</h1>
        <Button
          asChild
          variant="outline"
          className="bg-mizu-lavender hover:bg-mizu-lavender/90 border-mizu-lavender hover:border-mizu-lavender/90 px-6 py-2 rounded-full text-sm font-medium mb-12"
        >
          <Link href="/" prefetch={false}>
            Take me back to Home
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
