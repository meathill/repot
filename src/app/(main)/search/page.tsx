import { Chain, Contract, Protocol } from '@/types';
import SearchType from '@/app/_components/search/search-type';
import ChainDetail from '@/app/_components/search/chain-detail';
import ChainList from '@/app/_components/search/chain-list';
import { getChainDetail, getChains, getContracts, getProtocols } from '@/services';
import ProtocolList from '@/app/_components/search/protocol-list';
import KeywordsFilter from '@/app/_components/search/keywords-filter';
import ContractList from '@/app/_components/search/contract-list';

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const params = await searchParams;
  const { category, chain, protocol, q = '' } = params;
  const chains: Chain[] = await getChains();
  const chainDocId = chain
    ? chains.find((c) => c.name === chain)?.documentId
    : chains[ 0 ]?.documentId;
  const isChain = category === 'chains';
  const isProtocol = category === 'protocols';
  let chainData: Chain | null = null;
  if (isChain && chainDocId) {
    chainData = await getChainDetail(chainDocId, true);
  }

  let protocols: Protocol[] = [];
  if (!isChain && chainDocId) {
    const chainId = chain ? chains.find((c) => c.name === chain)?.id : 0;
    protocols = await getProtocols({ withChains: true, chainId });
  }

  let contracts: Contract[] = [];
  if (!isChain && !isProtocol) {
    const protocolId = protocol
      ? protocols.find((p) => p.name === protocol)?.id : 0;
    contracts = await getContracts({ protocolId, query: q as string });
  }

  return <>
    <SearchType className="py-8" current={category as string} />
    {(isChain || isProtocol) && <ChainList
      currentChain={chain as string || chains[ 0 ].name}
      items={chains}
      params={params}
    />}
    {isChain && chainDocId && <ChainDetail
      chainId={chainDocId as string}
      chainData={chainData}
    />}

    {!isChain && <KeywordsFilter params={params} />}

    {isProtocol && <>
      <ProtocolList items={protocols} />
    </>}

    {!isChain && !isProtocol && <ContractList items={contracts} />}
  </>;
}
