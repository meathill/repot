import { Chain, Contract, Protocol, StrapiResponse } from '@/types';

export async function fetchFromStrapi<T>(url: string | URL, method = 'GET', body?: unknown) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return (await response.json()) as T;
}

export async function getProtocolCount() {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', '1');
  const json = await fetchFromStrapi<StrapiResponse<Protocol>>(url);
  return json.meta.pagination.total;
}

export async function getLatestContracts(count: number) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/contracts`);
  url.searchParams.set('pagination[pageSize]', count.toString());
  url.searchParams.set('sort', 'id:desc');
  return fetchFromStrapi<StrapiResponse<Contract[]>>(url);
}

export async function getChains() {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/chains`);
  url.searchParams.set('pagination[pageSize]', '100');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('populate', 'logo');
  const json = await fetchFromStrapi<StrapiResponse<Chain[]>>(url);
  return json.data;
}

export async function getChainDetail(chainId: string, withProtocols = false) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/chains/${chainId}`);
  if (withProtocols) {
    url.searchParams.set('populate', 'protocols');
  }
  const json = await fetchFromStrapi<StrapiResponse<Chain>>(url);
  return json.data;
}
