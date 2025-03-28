'use client'

import { FolderOpen, Layers, Lock, User, Wallet } from 'lucide-react';
import { Contract } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import StarButton from '@/components/ui/star-button';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ContractCardProps {
  data: Contract;
}

export default function ContractCard({
  data,
}: ContractCardProps) {
  const router = useRouter();
  const logo = data.logo?.url || data.logo_url || '';
  const contractUrl = `/contract/${data.documentId}-${slugify(data.name)}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(contractUrl);
  };

  return (
    <div className="bg-white p-6 border border-gray rounded-2.5xl flex flex-col gap-4 cursor-pointer hover:border-[#343434]" onClick={handleCardClick}>
      <div className="flex gap-4 items-center">
        {logo && <Image
          alt={data.name}
          className="w-12 h-12 rounded-lg"
          src={logo}
          width={48}
          height={48}
          unoptimized
        />}
        <div className="font-bold text-lg text-primary-800">{data.name}</div>
      </div>
      <p className="text-primary-800 capitalize text-sm h-10 max-h-10 line-clamp-2">
        {data.overview}
      </p>
      <div className="bg-zinc-50 h-12 border-y -ml-6 -mr-6 flex flex-row">
        <Link
          className="flex justify-center items-center w-1/2 gap-1.5 border-r cursor-pointer hover:bg-lime-green transition-colors"
          href={contractUrl}
        >
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm text-dark-gray">Open</span>
        </Link>
        <StarButton
          className="flex justify-center items-center w-1/2 gap-1.5 cursor-pointer hover:bg-lime-green transition-colors"
          id={data.documentId}
          number={data.stars?.stars || 0}
          type="contract"
        />
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
        <Link href={contractUrl}>
          Go Contract
        </Link>
      </Button>
    </div>
  );
};
