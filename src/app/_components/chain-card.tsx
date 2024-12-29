import { Chain, URLSearchParamsObject } from '@/types';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import Image from 'next/image';
import { getParams } from '@/utils';

type ChainCardProps = {
  currentChain?: string;
  data: Chain;
  params?: URLSearchParamsObject;
}
export default function ChainCard({
  currentChain = '',
  data,
  params = {},
}: ChainCardProps) {
  const logo = data.logo?.url || data.logo_url || '';
  return <Button
    asChild
    className={clsx(
      'h-12 text-lg rounded-lg text-primary-800 hover:bg-main-green active:bg-light-green ',
      data.name === currentChain ? 'bg-light-green border-black' : 'bg-white border-gray')}
    key={data.id}
    variant="outline"
  >
    <a href={getParams(data.name, params)}>
      {logo && <Image
        src={logo}
        alt={data.name}
        className="w-6 h-6"
        width={24}
        height={24}
        unoptimized
      />}
      {data.name}
    </a>
  </Button>;

}
