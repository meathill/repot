'use client';

import { Chain } from '@/types';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';

interface ChainDetailProps {
  chainId: string;
  chainData: Chain | null;
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
  {
    label: 'Learn',
    value: 'learn',
  },
]

export default function ChainDetail({
  chainId,
  chainData,
}: ChainDetailProps) {
  const [currentTab, setCurrentTab] = useState<string>('overview');

  if (!chainData) {
    return <div className="border border-gray rounded-2.5xl bg-white p-6 flex justify-center items-center">
      Chain not found
    </div>;
  }

  const logo = chainData.logo?.url || chainData.logo_url || '';

  return (
    <div className="border border-gray rounded-2.5xl bg-white p-6">
      <header className="flex items-center pb-6 border-b mb-6 border-gray">
        {logo && <img src={logo} alt={chainData.name} className="w-15 h-15 block me-6" />}
        <h2 className="text-2xl text-primary-800">{chainData.name}</h2>
        <Button
          className="aspect-square"
          variant="ghost"
          size="sm"
        >
          <Star size={24} color="currentColor" />
        </Button>

        <RadioGroup
          className="ml-auto"
          items={TabItems}
          onChange={setCurrentTab}
          value={currentTab}
        />
      </header>
      <article className="bg-light-gray border-gray rounded-lg p-6">
        <h3 className="font-bold mb-2">What Is {chainData.name}</h3>
        <p className="ps-4">{chainData.overview}</p>
      </article>
      <p>{currentTab}</p>
    </div>
  );
}
