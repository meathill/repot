import { Chain } from '@/types';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  function getParams(chain: string) {
    const newParams = new URLSearchParams();
    for (const key in params) {
      if (params[ key ]) {
        newParams.set(key, params[ key ] as string);
      }
    }
    newParams.set('chain', chain);
    return `?${newParams.toString()}`;
  }

  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">By Chain</h2>
    <div className={clsx('grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6', className)}>
      {items.map((item) => {
        const logo = item.logo?.url || item.logo_url || '';
        return <Button
          asChild
          className={clsx('h-12 text-lg rounded-lg text-primary-800 hover:bg-main-green active:bg-light-green ', item.name === currentChain ? 'bg-light-green border-black' : 'bg-white border-gray')}
          key={item.id}
          variant="outline"
        >
          <a href={getParams(item.name)}>
            {logo && <Image
              src={logo}
              alt={item.name}
              className="w-6 h-6"
              width={24}
              height={24}
              unoptimized
            />}
            {item.name}
          </a>
        </Button>;
      })}
    </div>
  </>;
}
