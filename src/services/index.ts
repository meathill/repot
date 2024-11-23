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

export async function getLatestFeaturedProtocol() {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', '6');
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('fields[2]', 'overview');
  url.searchParams.set('filters[is_featured][$eq]', 'true');
  url.searchParams.set('populate', 'logo');
  const json = await fetchFromStrapi<StrapiResponse<Protocol[]>>(url);
  return json.data;
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
  url.searchParams.set('populate[0]', 'logo');
  if (withProtocols) {
    url.searchParams.set('populate[1]', 'protocols');
    url.searchParams.set('populate[protocols][populate]', 'logo');
  }
  const json = await fetchFromStrapi<StrapiResponse<Chain>>(url);
  return json.data;
}

export async function getProtocolDetail(protocolId: string) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/protocols/${protocolId}`);
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('populate[1]', 'chains');
  url.searchParams.set('populate[chains][populate]', 'logo');
  const json = await fetchFromStrapi<StrapiResponse<Protocol>>(url);
  return json.data;
}

export async function getProtocols(withChains = false, chainId?: number, params: { page: string | number } = {
  page: 1
}) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/protocols`);
  if (params && params.page) {
    url.searchParams.set('pagination[page]', params.page.toString());
  }
  url.searchParams.set('pagination[pageSize]', '30');
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('populate[0]', 'logo');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'logo_url');
  url.searchParams.set('fields[2]', 'overview');
  if (withChains) {
    url.searchParams.set('populate[1]', 'chains');
    url.searchParams.set('populate[chains][populate]', 'logo');
  }
  if (chainId) {
    url.searchParams.set('filters[chains][$contains]', chainId.toString());
  }
  const json = await fetchFromStrapi<StrapiResponse<Protocol[]>>(url);
  return json.data;
}

export async function getContracts(protocolId?: number, query?: string) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/contracts`);
  
  if (params && params.page) {
    url.searchParams.set('pagination[page]', params.page.toString());
  }
  url.searchParams.set('pagination[pageSize]', '30');
  url.searchParams.set('sort', 'id:desc');
  url.searchParams.set('fields[0]', 'name');
  url.searchParams.set('fields[1]', 'overview');
  url.searchParams.set('fields[2]', 'logo_url');
  url.searchParams.set('populate', 'logo');
  if (protocolId) {
    url.searchParams.set('filters[protocols][$contains]', protocolId.toString());
  }
  if (query) {
    url.searchParams.set('filters[name][$containsi]', query);
  }
  const json = await fetchFromStrapi<StrapiResponse<Contract[]>>(url);
  return json.data;
}

export async function getContractDetail(contractId: string) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/contracts/${contractId}`);
  url.searchParams.set('populate', 'logo');
  const json = await fetchFromStrapi<StrapiResponse<Contract>>(url);
  return json.data;
}
