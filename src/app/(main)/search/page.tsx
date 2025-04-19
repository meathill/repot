import { Chain, Contract } from '@/types';
import SearchType from '@/app/_components/search/search-type';
import dynamic from 'next/dynamic';
import ChainList from '@/app/_components/search/chain-list';
import {
  getChainDetail,
  getChains,
  getContracts,
  getProtocols,
} from '@/services';
import KeywordsFilter from '@/app/_components/search/keywords-filter';
import { CircleArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyResult from '@/components/ui/empty-result';

const ChainDetail = dynamic(
  () => import('@/app/_components/search/chain-detail')
);
const ProtocolList = dynamic(
  () => import('@/app/_components/search/protocol-list')
);
const ContractList = dynamic(
  () => import('@/app/_components/search/contract-list')
);
const NeedMoreDialog = dynamic(
  () => import('@/app/_components/need-more-dialog')
);
const SubmitGithub = dynamic(() => import('@/app/_components/submit-github'));

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const hasChain = !process.env.FIXED_CHAIN_ID;
  const params = await searchParams;
  const { category, chain, protocol, q = '' } = params;
  const page = Number(params.page) || 1;
  const chains: Chain[] = await getChains();
  const chainDocId = chain
    ? chains.find((c) => c.name === chain)?.documentId
    : chains[ 0 ]?.documentId;
  const chainId = chain ? chains.find((c) => c.name === chain)?.id : 0; // 提前获取 chainId
  const isChain = category === 'chains';
  const isProtocol = category === 'protocols';

  const [chainDataResult, protocolsResult] = await Promise.all([
    isChain && chainDocId
      ? getChainDetail(chainDocId, true)
      : Promise.resolve(null),
    !isChain
      ? getProtocols({ withChains: true, chainId, page })
      : Promise.resolve([]),
  ]);

  const chainData = chainDataResult;
  const protocols = isChain
    ? chainData?.protocols || []
    : protocolsResult || [];

  let contracts: Contract[] = [];
  if (!isChain && !isProtocol) {
    const protocolId = protocol
      ? protocols.find((p) => p.name === protocol)?.id : 0;
    contracts = await getContracts({ protocolId, query: q as string, page });
  }

  const showEmptyResult = !isChain && (
    (isProtocol && protocols.length === 0) || 
    (!isProtocol && contracts.length === 0)
  );

  return <>
    <SearchType
      className="pt-6 mb-8 sm:pt-8"
      current={category as string || (q && 'contracts')}
      chains={chains}
    />
    {(hasChain && (isChain || isProtocol)) && <ChainList
      currentChain={chain as string || chains[ 0 ].name}
      items={chains}
      params={params}
    />}
    {isChain && chainDocId && <ChainDetail
      chainId={chainDocId as string}
      chainData={chainData}
      protocols={protocols}
    />}

    {!isChain && <KeywordsFilter params={params} />}

    {isProtocol && <>
      <ProtocolList items={protocols} page={page} />
    </>}

    {!isChain && !isProtocol && <ContractList items={contracts} page={page} />}

    {showEmptyResult && <EmptyResult />}

    {!isChain && <div className="grid grid-cols-2 sm:flex items-center gap-6 my-6">
      <div className="border border-gray flex flex-col sm:flex-row gap-2 sm:gap-0 p-4 sm:w-80 justify-between rounded-xl">
        <span className="text-dark-gray text-sm font-bold">Propose More contracts?</span>
        <NeedMoreDialog isProtocol={isProtocol}>
          <Button
            className="text-sm gap-2 font-bold text-dark-gray bg-lighter-gray border border-light-gray hover:bg-main-green w-full sm:w-min"
            size="sm"
            type="button"
          >
            Report
            <CircleArrowRight size={16} color="currentColor" />
          </Button>
        </NeedMoreDialog>
      </div>
      <div className="border border-gray flex flex-col sm:flex-row gap-2 sm:gap-0 p-4 sm:w-80 justify-between rounded-xl">
        <span className="text-dark-gray text-sm font-bold">Upload Contracts?</span>
        <SubmitGithub>
          <Button
            className="text-sm gap-2 font-bold text-dark-gray bg-lighter-gray border border-light-gray hover:bg-main-green w-full sm:w-min"
            size="sm"
            type="button"
          >
            Upload
            <CircleArrowRight size={16} color="currentColor" />
          </Button>
        </SubmitGithub>
      </div>
    </div>}
  </>;
}
