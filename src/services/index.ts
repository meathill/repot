import { Chain, Contract, Protocol, StrapiResponse } from '@/types';
import { PAGE_SIZE } from '@/constants';

export async function fetchFromStrapi<T>(
  url: string | URL,
  method = 'GET',
  body?: unknown,
  token?: string,
): Promise<StrapiResponse<T>> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || process.env.STRAPI_API_TOKEN}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return (await response.json()) as StrapiResponse<T>;
}

export async function getProtocolCount() {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', '1');
  const json = await fetchFromStrapi<Protocol>(url);
  return json.meta.pagination.total;
}

export async function getLatestProtocol() {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', '9');
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('fields[2]', 'overview');
  url.searchParams.set('populate', 'logo');
  const json = await fetchFromStrapi<Protocol[]>(url);
  return json.data;
}

export async function getLatestContracts(count: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contracts`);
  url.searchParams.set('pagination[pageSize]', count.toString());
  url.searchParams.set('sort', 'id:desc');
  return fetchFromStrapi<Contract[]>(url);
}

export async function getChains() {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chains`);
  url.searchParams.set('pagination[pageSize]', '100');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('populate', 'logo');
  const json = await fetchFromStrapi<Chain[]>(url);
  return json.data;
}

export async function getChainDetail(chainId: string, withProtocols = false) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chains/${chainId}`);
  url.searchParams.set('populate[0]', 'logo');
  if (withProtocols) {
    url.searchParams.set('populate[1]', 'protocols');
    url.searchParams.set('populate[protocols][populate]', 'logo');
  }
  const json = await fetchFromStrapi<Chain>(url);
  return json.data;
}

export async function getProtocolDetail(protocolId: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protocols/${protocolId}`);
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('populate[1]', 'chains');
  url.searchParams.set('populate[chains][populate]', 'logo');
  const json = await fetchFromStrapi<Protocol>(url);
  return json.data;
}

export async function getProtocols({
  chainId = 0,
  pageSize = PAGE_SIZE,
  page = 1,
  query = '',
  withChains = false,
} = {}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', pageSize.toString());
  url.searchParams.set('pagination[page]', page.toString());
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('populate[1]', 'stars');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('fields[2]', 'overview');
  if (withChains) {
    url.searchParams.set('populate[chains][fields][0]', 'name');
    url.searchParams.set('populate[chains][fields][1]', 'logo_url');
    url.searchParams.set('populate[chains][populate]', 'logo');
  }
  if (query) {
    url.searchParams.set('filters[name][$containsi]', query);
  }
  if (process.env.FIXED_CHAIN_ID) {
    url.searchParams.set('filters[chains][$contains]', process.env.FIXED_CHAIN_ID);
  } else if (chainId) {
    url.searchParams.set('filters[chains][$contains]', chainId.toString());
  }
  const json = await fetchFromStrapi<Protocol[]>(url);
  return json.data;
}

export async function getContracts({
  page = 1,
  pageSize = PAGE_SIZE,
  protocolId = 0,
  query = '',
} = {}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contracts`);
  url.searchParams.set('pagination[page]', page.toString());
  url.searchParams.set('pagination[pageSize]', pageSize.toString());
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'overview');
  url.searchParams.set('fields[2]', 'logo_url');
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('populate[1]', 'stars');
  if (protocolId) {
    url.searchParams.set('filters[protocols][$contains]', protocolId.toString());
  } else if (process.env.FIXED_CHAIN_ID) {
    url.searchParams.set('filters[protocols][chains][$contains]', process.env.FIXED_CHAIN_ID);
  }
  if (query) {
    url.searchParams.set('filters[name][$containsi]', query);
  }

  const json = await fetchFromStrapi<Contract[]>(url);
  return json.data;
}

export async function getContractDetail(contractId: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contracts/${contractId}`);
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('populate[1]', 'stars');
  const json = await fetchFromStrapi<Contract>(url);
  return json.data;
}
