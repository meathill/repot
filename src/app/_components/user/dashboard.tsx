'use client';

import { useUserStore } from '@/store';
import NavUser from '@/components/user/nav-user';
import { FilePlus, LogOut, PenLine, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyIcon from '@/assets/images/empty.svg';
import Image from 'next/image';
import ContractsIcon from '@/components/icons/contracts-icon';
import EthIcon from '@/assets/images/eth-icon.svg';
import { useState } from 'react';
import ContractCard from '@/app/_components/contract-card';
import { Chain, Contract, Protocol } from '@/types';
import ProtocolCard from '@/app/_components/protocol-card';
import ChainCard from '@/app/_components/chain-card';
import RepotPointsDialog from '@/app/_components/repot-points-dialog';
import SubmitGithub from '@/app/_components/submit-github';

type ItemListProps = {
  items: (Chain | Contract | Protocol)[];
  ItemComponent: typeof ChainCard | typeof ContractCard | typeof ProtocolCard;
}
function ItemList({
  ItemComponent,
  items,
}: ItemListProps) {
  if (!items.length) {
    return <div className="flex flex-col justify-center items-center">
      <p className="text-center mb-6">Nothing Here</p>
      <Image
        alt="Nothing here"
        src={EmptyIcon}
        width={153}
        height={144}
      />
    </div>;
  }

  return <div className="grid sm:grid-cols-3 gap-6">
    {items.map((item) => (
      // @ts-expect-error data is correct
      <ItemComponent data={item} key={item.id} />
    ))}
  </div>;
}

export default function UserDashboard() {
  const stars = useUserStore((state) => state.stars);
  const user = useUserStore((state) => state.user);
  const [query, setQuery] = useState<string>('');
  const chains = stars.chains ? Object.values(stars.chains) : [];
  const contracts = stars.contracts ? Object.values(stars.contracts) : [];
  const protocols = stars.protocols ? Object.values(stars.protocols) : [];

  if (!user) {
    return (
      <div className="border border-primary-800 bg-white rounded-2.5xl mt-6 sm:mt-8 p-4 sm:p-8 flex justify-center">
        <NavUser size={'xl'} />
      </div>
    )
  }

  return (
    <div className="border border-primary-800 bg-white rounded-2.5xl mt-6 sm:mt-8 p-4 sm:p-8">
      <div className="flex items-center gap-6 border-b border-gray pb-6 mb-6">
        <Button
          asChild
          className="h-15 pe-8"
          effect="raised"
          size="xl"
        >
          <a href="/api/auth/logout">
            <span className="text-2xl me-6">{user.username} {'<' + user.email + '>'}</span>
            <LogOut size={16}/>
            Log out
          </a>
        </Button>
        <Button
          className="font-bold"
          effect="raised"
          onClick={() => {
          }}
          size="xl"
        >
          <PenLine size={16}/>
          Edit Profile
        </Button>
        <RepotPointsDialog points={user.points} />
      </div>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <Star size={14}/> Collection Chain ({chains.length})
        </header>
        <ItemList
          ItemComponent={ChainCard}
          items={chains}
        />
      </div>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <Star size={14}/> Collection Protocols ({protocols.length})
        </header>
        <ItemList
          ItemComponent={ProtocolCard}
          items={protocols}
        />
      </div>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <Star size={14}/> Collection Contracts ({contracts.length})
        </header>
        <ItemList
          ItemComponent={ContractCard}
          items={contracts}
        />
      </div>
      <hr className="mb-6"/>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <FilePlus className="w-4 h-4"/> Import Contracts
        </header>
        <div className="border border-gray rounded-2.5xl p-6">
          <div className="flex items-center gap-4 mb-4 font-bold">
            <Image
              alt="Import Contracts from Etherscan"
              src={EthIcon}
              width={32}
              height={32}
            />
            Import Contracts from Etherscan
          </div>
          <p className="text-sm mb-4">Please note: only addresses verified on Etherscan are accepted.</p>
          <SubmitGithub className="w-full border border-gray flex items-stretch rounded-lg p-2">
            <input
              className="flex-1 h-10 placeholder-zinc-400 placeholder:text-sm"
              onInput={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search Keywords or Contract Address"
              type="search"
              value={query}
            />
            <Button
              className="h-10 px-6 bg-lime-green hover:bg-main-green border border-black text-dark-green"
            >Import</Button>
          </SubmitGithub>
        </div>
      </div>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <ContractsIcon className="w-4 h-4"/> My Contracts
        </header>
        <div className="flex justify-center">
          <div className="">
            <p className="text-center mb-6">Nothing Here</p>
            <Image
              alt="Nothing here"
              src={EmptyIcon}
              width={153}
              height={144}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
