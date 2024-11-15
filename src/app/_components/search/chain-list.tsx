import { Chain } from '@/types';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';

interface ChainListProps {
  className?: string;
  currentChain?: string;
  items: Chain[];
}

export default function ChainList({
  className = '',
  currentChain = '',
  items,
}: ChainListProps) {

  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">By Chain</h2>
    <div className={clsx('grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6', className)}>
      {items.map((item) => (
        <Button
          asChild
          className={clsx('h-12 text-lg rounded-lg text-primary-800', item.name === currentChain ? 'bg-light-green border-black' : 'bg-white border-gray')}
          key={item.id}
          variant="outline"
        >
          <a href={`?category=chains&chain=${item.name}`}>
            {item.logo && <img src={item.logo.url} alt={item.name} className="w-6 h-6" />}
            {item.logo_url && <img src={item.logo_url} alt={item.name} className="w-6 h-6" />}
            {item.name}
          </a>
        </Button>
      ))}
    </div>
  </>;
}
