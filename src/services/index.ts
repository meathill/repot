import {Contract, Protocol, StrapiResponse} from "@/types";

export async function getProtocolCount() {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/protocols`);
  url.searchParams.set('pagination[pageSize]', '1');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
  const json = (await response.json()) as StrapiResponse<Protocol>;
  return json.meta.pagination.total;
}

export async function getLatestContracts(count: number) {
  const url = new URL(`${process.env.STRAPI_ENDPOINT}/api/contracts`);
  url.searchParams.set('pagination[pageSize]', count.toString());
  url.searchParams.set('sort', 'id:desc');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
  return (await response.json()) as StrapiResponse<Contract[]>;
}
