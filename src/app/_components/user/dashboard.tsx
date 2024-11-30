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

export default function UserDashboard() {
  const user = useUserStore((state) => state.user);
  const [query, setQuery] = useState<string>('');

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
        <Button
          className="ms-auto font-bold"
          effect="raised"
          size="xl"
        >
          Repot Points: {user.points || 0}
        </Button>
      </div>
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <Star size={14}/> Collection chains(0)
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
      <div className="mb-6">
        <header className="flex items-center gap-2 py-2 mb-4">
          <Star size={14}/> Collection Protocols(0)
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
          <form className="border border-gray flex items-center rounded-lg p-2">
            <input
              className="flex-1 placeholder-zinc-400 placeholder:text-sm"
              onInput={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search Keywords or Contract Address"
              type="search"
              value={query}
            />
            <Button
              className="h-10 px-6 bg-lime-green hover:bg-main-green border border-black text-dark-green"
            >Import</Button>
          </form>
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
