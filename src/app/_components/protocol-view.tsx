'use client';

import { CircleCheckBig, CircleStop, Copy, Download, Github, Image, Star, User } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Protocol } from '@/types';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';

interface ProtocolViewProps {
  data: Protocol;
}

const TabItems = ['Info', 'Docs', 'Source'];


export default function ProtocolView({
  data,
}: ProtocolViewProps) {
  const [tab, setTab] = useState('Source');
  const logo = data.logo?.url || data.logo_url || '';

  return (
    <main className="mt-6 sm:mt-8 mb-6 px-6 sm:px-0">
      <header className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-neutral-800">
        {logo && <img
          alt={data.name}
          className="block w-18 h-18 rounded-lg"
          src={logo}
        />}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
            <h1 className="sm:text-xl font-bold">{data.name}</h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs">
                <Star size={16} color="#636363"/>
                1323
              </div>
              <div className="flex items-center gap-1.5">
                {data.chains?.map(chain => (
                  <Avatar
                    className="w-4 h-4"
                    key={chain.id}
                    name={chain.name}
                    src={chain.logo?.url || chain.logo_url || ''}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleStop size={16}/>
              Token
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <Image size={16} />
              NFT
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <User size={16} />
              DAO
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleCheckBig size={16} color="#26BF59" />
              Audited
            </div>
          </div>
        </div>
        <div className="sm:ms-auto flex flex-none items-center">
          {TabItems.map(item => (
            <Button
              className={clsx('flex-1 sm:w-27 h-12 border border-r-0 border-black rounded-none first:rounded-l-lg last:rounded-r-lg last:border-r flex justify-center items-center text-sm font-bold', tab === item ? 'bg-primary-800 text-white' : 'bg-lighter-gray text-primary-800')}
              key={item}
              type="button"
              onClick={() => setTab(item)}
            >{item}</Button>
          ))}
        </div>
      </header>
      <div className={clsx('bg-white p-6 border-gray', { hidden: tab !== 'Info' })}>

      </div>
      <div className={clsx('flex min-h-96 gap-6', { hidden: tab === 'Source' })}>
        <aside className="w-54 flex-none py-3 px-5 bg-white border border-black rounded-lg">

        </aside>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-6 mb-6 flex-none">
            <div
              className="w-54 h-12 border border-black flex justify-center items-center bg-main-purple rounded-lg text-sm font-bold">
              Download Code
            </div>
            <div
              className="w-54 h-12 border border-black flex justify-center items-center bg-lime-green rounded-lg text-sm font-bold">
              Open Code
            </div>
            <div
              className="w-40 h-12 border border-black flex justify-center items-center gap-2 rounded-lg text-sm font-bold"
            >
              <Github size={16} />
              Inspect Audit
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2 flex-none">
            <h2 className="text-sm text-dark-gray">simple-token.sol</h2>
            <div className="flex items-center ms-auto h-5 gap-0.5 text-sm font-bold">
              ABI:
              <Copy size={16}/>
            </div>
            <div className="flex items-center h-5 gap-0.5 text-sm font-bold">
              Bytecode:
              <Copy size={16}/>
            </div>
          </div>
          <div className="border border-black rounded-lg bg-lighter-gray flex-1">

          </div>
        </div>
      </div>
      <div className={clsx('mt-6', { hidden: tab === 'Docs' })}>
        {data.description}
        <h2 className="text-center text-lg sm:text-2xl font-regular mb-6">Simple ERC20 Token</h2>
        <article className="text-center text-lg mb-6">
          <p className="text-sm sm:text-base">ERC20 token with the following features:<br />
            -Premint your total supply.<br/>
            -No minting function. This allows users to comfortably know the future supply of the token.</p>
        </article>
        <article className="prose-xl border border-gray rounded-lg p-6 bg-white">

        </article>
      </div>
    </main>
  );
}
