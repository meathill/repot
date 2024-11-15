import { Chain } from '@/types';
import SearchType from '@/app/_components/search/search-type';
import ChainDetail from '@/app/_components/search/chain-detail';
import ChainList from '@/app/_components/search/chain-list';
import { getChainDetail, getChains } from '@/services';

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const { category, chain, protocol, contract } = await searchParams;
  const chains: Chain[] = await getChains();
  const chainId = chains.find((c) => c.name === chain)?.documentId;
  let chainData: Chain | null = null;
  if (chainId) {
    chainData = await getChainDetail(chainId);
  }

  return <>
    <SearchType className="py-8" />
    <ChainList
      items={chains}
      currentChain={chain as string}
    />
    {chain && <ChainDetail
      chainId={chainId as string}
      chainData={chainData}
    />}
  </>;
}
