import { Chain } from '@/types';
import { clsx } from 'clsx';
import ChainCard from '@/app/_components/chain-card';

interface ChainListProps {
  className?: string;
  currentChain?: string;
  items: Chain[];
  params: { [key: string]: string | string[] | undefined };
}

export default function ChainList({
  className = '',
  currentChain = '',
  items,
  params,
}: ChainListProps) {

  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">By Chain</h2>
    <div className={clsx('grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6', className)}>
      {items.map((item) => (
        <ChainCard
          currentChain={currentChain}
          data={item}
          key={item.id}
          params={params}
        />
      ))}
    </div>
  </>;
}
