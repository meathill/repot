'use client';

import { FormEvent } from 'react';
import { useUserStore } from '@/store';
import NavUser from '@/components/user/nav-user';
import { FilePlus, LogOut, Star, X } from 'lucide-react';
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
import EditProfileDialog from '@/app/_components/edit-profile-dialog';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PurpleLeaf from '@/assets/images/leaf-purple.svg';

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
  const [address, setAddress] = useState<string>('');
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const chains = stars.chains ? Object.values(stars.chains) : [];
  const contracts = stars.contracts ? Object.values(stars.contracts) : [];
  const protocols = stars.protocols ? Object.values(stars.protocols) : [];

  async function doImportFromEtherscan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    if (target.matches(':invalid') || isImporting || !address.trim()) return;

    setIsImporting(true);
    setMessage('');
    try {
      await fetch('/api/ugc/etherscan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
        }),
      });
      setIsModalOpen(true);
    } catch (e) {
      console.log(e);
      setMessage('Failed to import contracts.');
    } finally {
      setIsImporting(false);
    }
  }

  if (!user) {
    return (
      <div className="border border-primary-800 bg-white rounded-2.5xl mt-6 sm:mt-8 p-4 sm:p-8 flex justify-center">
        <NavUser size={'xl'} />
      </div>
    )
  }
  return <>
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
        <EditProfileDialog />
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
          {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
          <form
            className="w-full border border-gray flex items-stretch rounded-lg p-2 ps-4 gap-4 focus-within:outline focus-within:outline-sky-100"
            onSubmit={doImportFromEtherscan}
          >
            <input
              className="flex-1 h-10 placeholder-zinc-400 placeholder:text-sm focus-visible:outline-0"
              disabled={isImporting}
              onInput={(event) => setAddress(event.currentTarget.value)}
              placeholder="Search Keywords or Contract Address"
              required
              type="search"
              value={address}
            />
            <Button
              className="w-24 h-10 px-6 bg-lime-green hover:bg-main-green border border-black text-dark-green"
              disabled={isImporting}
            >
              {isImporting ? <Spinner className="size-4" /> : 'Import'}
            </Button>
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none max-w-2xl"
          hasClose={false}
        >
          <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
            <DialogTitle className="font-bold text-2xl text-dark-green">
              <div className="w-16 h-16 rounded-full border border-dark-green bg-lime-green flex items-center justify-center mx-auto">
                <Image
                  alt="Leaf"
                  className="w-6.5 h-7.5"
                  src={PurpleLeaf}
                  width={26}
                  height={30}
                />
              </div>
              <p className="text-2xl font-bold mt-6 text-center">Thank you for your submission</p>
            </DialogTitle>
            <DialogClose
              asChild
              className="absolute right-0 -top-16 sm:top-0 sm:-right-20"
              style={{ marginTop: 0 }}
            >
              <Button
                type="button"
                variant="outline"
                className="outline-none bg-main-green rounded-xl border border-black h-12 w-12 hover:bg-lime-green hover:shadow-[0_4px_0_0_#000]"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="pt-2 pb-8 px-8">
            <p className="text-sm leading-6">Please wait for our review. Once the review is completed, the reward points will be automatically sent to your account</p>
            <footer className="flex justify-center mt-6">
              <Button
                className="font-bold text-base leading-normal py-2 px-6"
                onClick={() => setIsModalOpen(false)}
                variant="primary-bordered"
              >
                Close
              </Button>
            </footer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </>;
}
