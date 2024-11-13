import SearchType from '@/app/_components/search/search-type';
import ChainList from '@/app/_components/search/chain-list';
import { Chain } from '@/types';

export default function Chains() {
  const chains: Chain[] = [];

  return <>
    <SearchType className="py-8" />
    <ChainList items={chains} />
    <div>Chains page</div>
  </>;
}
