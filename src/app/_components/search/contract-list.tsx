'use client'

import { Contract } from '@/types';
import { clsx } from 'clsx';
import ContractCard from '@/app/_components/contract-card';
import Pagination from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface ContractListProps {
  className?: string;
  items: Contract[];
}

export default function ContractList({
  className = '',
  items,
}: ContractListProps) {
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
          <ContractCard
            key={item.id}
            data={item}
          />
        ))}
      </div>
      <Pagination total={items.length} pageChange={() => onPageChange} />
    </>
  );
}
