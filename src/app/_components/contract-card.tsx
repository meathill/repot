import { FolderOpen, Layers, Lock, Star, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Contract } from '@/types';
import Link from 'next/link';
import slugify from 'slugify';

interface ContractCardProps {
  data: Contract;
  onClick?: () => void;
}

export default function ContractCard({
  data,
  onClick,
}: ContractCardProps) {
  const logo = data.logo?.url || data.logo_url || '';

  return (
    <div className="bg-white p-6 border border-gray rounded-2.5xl flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        {logo && <img
          alt={data.name}
          className="w-12 h-12 rounded-lg"
          src={logo}
        />}
        <div className="font-bold text-lg text-primary-800">{data.name}</div>
      </div>
      <p className="text-primary-800 capitalize text-sm h-10 max-h-10 line-clamp-2">
        {data.overview}
      </p>
      <div className="bg-zinc-50 h-12 border-y -ml-6 -mr-6 flex flex-row">
        <Link
          className="flex justify-center items-center w-1/2 gap-1.5 border-r cursor-pointer hover:bg-lime-green transition-colors"
          href={`/contract/${data.id}-${slugify(data.name)}`}
        >
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm text-dark-gray">Open</span>
        </Link>
        <div
          onClick={onClick}
          className="flex justify-center items-center w-1/2 gap-1.5 cursor-pointer hover:bg-lime-green transition-colors">
          <Star className="w-4 h-4" />
          <span className="text-sm text-dark-gray">123</span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <User className="w-3 h-3" />
          <span className="text-xs text-primary-800">DAO</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Wallet className="w-3 h-3" />
          <span className="text-xs text-primary-800">Payment</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Layers className="w-3 h-3" />
          <span className="text-xs text-primary-800">ERC721</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span className="text-xs text-primary-800">Staking</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <span className="text-xs text-primary-800">...</span>
        </div>
      </div>

      <Button
        asChild
        variant={'outline'}
        className="h-10 bg-ivory border-dark-gray hover:bg-main-green active:bg-light-green rounded-lg font-bold text-primary-800"
      >
        <Link href={`/contract/${data.id}-${slugify(data.name)}`}>
          Go Contract
        </Link>
      </Button>
    </div>
  );
};
