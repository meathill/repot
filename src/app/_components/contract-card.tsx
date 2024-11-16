import { FolderOpen, Layers, Lock, Star, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContractCard({ onClick }: {onClick?: () => void}) {
  return (
    <div className="bg-white p-6 border border-gray rounded-2.5xl flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <img src="/ce.png" className="w-12 h-12 rounded-lg" />
        <div className="font-bold text-lg text-primary-800">Cutting Edge</div>
      </div>
      <div className="text-primary-800 capitalize text-sm max-h-11 text-ellipsis overflow-hidden">
        Discover the most innovative Web3 contracts, showcasing fresh ideas and
        advanced techniques that keep you at the forefront of smart
        contractdevelopment.
      </div>
      <div className="bg-zinc-50 h-12 border-y -ml-6 -mr-6 flex flex-row">
        <div className="flex justify-center items-center w-1/2 gap-1.5 border-r cursor-pointer hover:bg-lime-green transition-colors">
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm text-dark-gray">Open</span>
        </div>
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
        variant={'outline'}
        className="bg-ivory border-dark-gray hover:bg-light-green rounded-lg font-bold text-base text-primary-800"
      >
        Go Contract
      </Button>
    </div>
  );
};
