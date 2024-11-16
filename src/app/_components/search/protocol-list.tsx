import { Protocol } from '@/types';
import { clsx } from 'clsx';
import ProtocolCard from '@/app/_components/protocol-card';

interface ProtocolListProps {
  className?: string;
  items: Protocol[];
}

export default function ProtocolList({
  className = '',
  items,
}: ProtocolListProps) {
  return (
    <div className={clsx('grid md:grid-cols-3 gap-4', className)}>
      {items.map((item) => (
        <ProtocolCard
          hasDetails
          key={item.id}
          protocol={item}
        />
      ))}
    </div>
  );
}
