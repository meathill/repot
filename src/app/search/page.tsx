import { Chain } from '@/types';
import SearchType from '@/app/_components/search/search-type';
import ChainList from '@/app/_components/search/chain-list';
import { getChains } from '@/services';

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const { category } = await searchParams;
  const chains: Chain[] = await getChains();


  return <>
    <SearchType className="py-8" />
    <ChainList items={chains} />
    <div>Search page with query: {category}</div>
  </>;
}
