import { Contract } from '@/types';
import { clsx } from 'clsx';
import ContractCard from '@/app/_components/contract-card';

interface ContractListProps {
  className?: string;
  items: Contract[];
}

export default function ContractList({
  className = '',
  items,
}: ContractListProps) {
  return (
    <div className={clsx('grid md:grid-cols-3 gap-4', className)}>
      {items.map((item) => (
        <ContractCard
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
}
