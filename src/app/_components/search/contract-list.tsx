import { Contract } from '@/types';
import { clsx } from 'clsx';
import ContractCard from '@/app/_components/contract-card';
import Pagination from '@/components/ui/pagination';

interface ContractListProps {
  className?: string;
  items: Contract[];
  page?: number;
}

export default function ContractList({
  className = '',
  items,
  page = 1,
}: ContractListProps) {

  return <>
    <div className={clsx('grid md:grid-cols-3 gap-4', className)}>
      {items.map((item) => (
        <ContractCard
          key={item.id}
          data={item}
        />
      ))}
    </div>
    <Pagination total={items.length} page={page} />
  </>;
}
