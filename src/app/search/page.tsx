import { Chain, Protocol } from '@/types';
import SearchType from '@/app/_components/search/search-type';
import ChainDetail from '@/app/_components/search/chain-detail';
import ChainList from '@/app/_components/search/chain-list';
import { getChainDetail, getChains, getProtocols } from '@/services';
import ProtocolList from '@/app/_components/search/protocol-list';
import KeywordsFilter from '@/app/_components/search/keywords-filter';

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const params = await searchParams;
  const { category, chain, protocol } = params;
  const chains: Chain[] = await getChains();
  const chainDocId = chains.find((c) => c.name === chain)?.documentId;
  const isChain = category === 'chains';
  const isProtocol = category === 'protocols';
  let chainData: Chain | null = null;
  if (isChain && chainDocId) {
    chainData = await getChainDetail(chainDocId, true);
  }

  let protocols: Protocol[] = [];
  if (!isChain && chainDocId) {
    const chainId = chains.find((c) => c.name === chain)?.id;
    protocols = await getProtocols(true, chainId);
  }

  return <>
    <SearchType className="py-8" current={category as string} />
    <ChainList
      currentChain={chain as string}
      items={chains}
      params={params}
    />
    {isChain && <ChainDetail
      chainId={chainDocId as string}
      chainData={chainData}
    />}
    {isProtocol && <>
      <KeywordsFilter />
      <ProtocolList items={protocols} />
    </>}
  </>;
}
