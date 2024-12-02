import { Protocol } from '@/types';
import { clsx } from 'clsx';
import ProtocolCard from '@/app/_components/protocol-card';
import Pagination from '@/components/ui/pagination';

interface ProtocolListProps {
  className?: string;
  items: Protocol[];
  page?: number;
}

export default function ProtocolList({
  className = '',
  items,
  page = 1,
}: ProtocolListProps) {

  return <>
    <div className={clsx('grid md:grid-cols-3 gap-4', className)}>
      {items.map((item) => (
        <ProtocolCard hasDetails key={item.id} protocol={item} />
      ))}
    </div>
    <Pagination total={items.length} page={page} />
  </>
}
