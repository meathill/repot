'use client'

import { Protocol } from '@/types';
import { clsx } from 'clsx';
import ProtocolCard from '@/app/_components/protocol-card';
import Pagination from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface ProtocolListProps {
  className?: string;
  items: Protocol[];
}

export default function ProtocolList({
  className = '',
  items,
}: ProtocolListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();

  function onPageChange(newVal: number) {
    console.log('onPageChange', newVal)
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', newVal.toString());
    router.replace(pathname + '?' + newSearchParams.toString())
  }

  return (
    <>
      <div className={clsx('grid md:grid-cols-3 gap-4', className)}>
        {items.map((item) => (
          <ProtocolCard hasDetails key={item.id} protocol={item} />
        ))}
      </div>
      <Pagination total={items.length} pageChange={onPageChange} />
    </>
  );
}
