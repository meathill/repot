'use client';

import { FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { CodeIcon } from 'lucide-react';
import { InputSearch } from '@/components/ui/input';
import ContractsIcon from '@/components/icons/contracts-icon';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ApiResponse, Contract, Protocol } from '@/types';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

type SearchBoxProps = {
  className?: string;
}

export default function SearchBox({
  className = '',
}: SearchBoxProps) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const [protocolResult, setProtocolResult] = useState<Protocol[]>([]);
  const [contractResult, setContractResult] = useState<Contract[]>([]);
  const menu = useRef<HTMLDivElement>(null);

  function onBlur(event: FocusEvent) {
    if (menu.current?.contains(event.relatedTarget as Element)) return;

    setOpen(false);
  }
  const quickSearch = useDebouncedCallback(async function (query: string) {
    query = query.trim();
    if (!query) return;

    setIsLoading(true);

    const url = new URL('/api/quick-search', window.location.origin);
    url.searchParams.set('query', query);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = (await response.json()) as ApiResponse<{
      protocols: Protocol[];
      contracts: Contract[];
    }>;
    setProtocolResult(data.protocols);
    setContractResult(data.contracts);
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    quickSearch(query);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={clsx('relative w-full', className, query ? 'sm:w-125 me-auto' : 'sm:w-80')}>
    <InputSearch
      aria-expanded={open}
      className="border-gray"
      isLoading={isLoading}
      onBlur={onBlur}
      onFocus={() => setOpen(true)}
      onInput={(event: FormEvent<HTMLInputElement>) => {
        setOpen(true);
        setQuery(event.currentTarget.value);
      }}
      placeholder="Search Keywords or Contract Address"
      role="combobox"
      value={query}
    />
    <div
      className={clsx('absolute top-10 left-0 w-full max-h-80 overflow-y-auto rounded-md bg-popover text-popover-foreground border border-black p-0', { hidden: !open })}
      ref={menu}
    >
      <Link
        className={clsx('flex cursor-pointer gap-2 select-none items-center rounded-sm p-3 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', query ? 'hover:bg-main-green' : 'pointer-events-none opacity-50')}
        href={`/search?q=${query}`}
      >
        <ContractsIcon className="w-4 h-4" />
        <span className="font-bold text-sm">
          Search for all contracts
        </span>
      </Link>
      <Link
        className="flex cursor-pointer gap-2 select-none items-center rounded-sm p-3 text-sm outline-none pointer-events-none opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        href={`/search-code?q=${query}`}
      >
        <CodeIcon className="w-4 h-4" />
        <span className="font-bold text-sm">
          Search for code snippets
        </span>
      </Link>
      <div className="-mx-1 h-px bg-border" />
      <div className="px-3 py-1.5 font-bold text-xs text-[#8561eb]">
        Contracts
      </div>
      {contractResult.map(contract => {
        const logo = contract.logo?.url || contract.logo_url || '';
        return (
          <Link
            className="flex cursor-pointer gap-2 select-none items-center rounded-sm p-3 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-main-green"
            key={contract.id}
            href={`/contract/${contract.id}`}
          >
            {logo && <Image
              alt={`${contract.name} logo`}
              className="w-5 h-5"
              src={logo}
              width={20}
              height={20}
              unoptimized
            />}
            <span className="font-bold text-sm">{contract.name}</span>
          </Link>
        );
      })}
      <div className="-mx-1 h-px bg-border" />
      <div className="px-3 py-1.5 font-bold text-xs text-[#3ebd1a]">
        Protocols
      </div>
      {protocolResult.map(protocol => {
        const logo = protocol.logo?.url || protocol.logo_url || '';
        return (
          <Link
            className="flex cursor-pointer gap-2 select-none items-center rounded-sm p-3 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-main-gree"
            key={protocol.id}
            href={`/protocol/${protocol.id}`}
          >
            {logo && <Image
              alt={`${protocol.name} logo`}
              className="w-5 h-5"
              src={logo}
              width={20}
              height={20}
              unoptimized
            />}
            <span className="font-bold text-sm">{protocol.name}</span>
          </Link>
        );
      })}
    </div>
  </div>;
}
