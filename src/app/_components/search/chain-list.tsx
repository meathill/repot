import { Chain } from '@/types';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';

interface ChainListProps {
  className?: string;
  items: Chain[];
}

export default function ChainList({
  className = '',
  items,
}: ChainListProps) {
  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">By Chain</h2>
    <div className={clsx('grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6', className)}>
      {items.map((item) => (
        <Button
          key={item.id}
          className="h-12 bg-white text-lg rounded-lg"
          variant="outline"
        >
          {item.logo && <img src={item.logo.url} alt={item.name} className="w-6 h-6" />}
          {item.logo_url && <img src={item.logo_url} alt={item.name} className="w-6 h-6" />}
          {item.name}
        </Button>
      ))}
    </div>
  </>;
}
