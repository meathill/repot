'use client';

import { Chain, Protocol } from '@/types';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';
import Image from 'next/image';
import ChainContent from './chain-content';
import StarButton from '@/components/ui/star-button';
import ProtocolList from '@/app/_components/search/protocol-list';
import { useSearchParams } from 'next/navigation';

interface ChainDetailProps {
  chainId: string;
  chainData: Chain | null;
  protocols: Protocol[];
}

const TabItems = [
  {	
    label: 'Overview',	
    value: 'overview',	
  },	
  {	
    label: 'Protocols',	
    value: 'protocols',	
  },
]

export default function ChainDetail({
  chainData,
  chainId,
  protocols,
}: ChainDetailProps) {
  const [currentTab, setCurrentTab] = useState<string>('overview');	
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  if (!chainData) {
    return <div className="border border-gray rounded-2.5xl bg-white p-6 flex justify-center items-center">
      Chain not found
    </div>;
  }

  const logo = chainData.logo?.url || chainData.logo_url || '';

  return (
    <div className="border border-gray rounded-2.5xl bg-white p-6">
      <header className="flex items-center pb-6 border-b mb-6 gap-4 border-gray">
        {logo && <Image
          src={logo}
          alt={chainData.name}
          className="w-15 h-15 block me-6"
          width={60}
          height={60}
          unoptimized
        />}
        <h2 className="text-2xl text-primary-800">{chainData.name}</h2>
        <StarButton id={chainId} number={0} type="chain" />

        <RadioGroup
          className="ml-auto"
          items={TabItems}
          onChange={setCurrentTab}
          value={currentTab}
        />
      </header>
      {currentTab === TabItems[ 0 ].value && <ChainContent chainData={chainData} />}
      {currentTab != TabItems[ 0 ].value && <ProtocolList items={protocols} page={page} />}
    </div>
  );
}
