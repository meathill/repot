import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';
import { BaseStrapiRecord, Contract, Protocol } from '@/types';

type StarLog = BaseStrapiRecord & {
  contract?: Contract;
  protocol?: Protocol;
  user: number;
};
type Stars = BaseStrapiRecord & {
  protocol?: number;
  contract?: number;
  stars: number;
}

function keyByDocumentId(items: BaseStrapiRecord[], key: 'contract' | 'protocol') {
  return items.reduce((acc, item) => {
    // @ts-expect-error I'm sure key is right
    acc[ item[ key ].documentId ] = item[ key ];
    return acc;
  }, {} as Record<string, BaseStrapiRecord>);
}

export async function GET() {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return new Response(
      JSON.stringify({ code: 0, data: { contracts: {}, protocols: {} } }),
    )
  }

  console.log('xxx', user.data.id);
  const token = process.env.STRAPI_STAR_TOKEN;

  // load contracts
  let url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contract-star-logs`);
  url.searchParams.set('filters[user][id][$eq]', user.data.id);
  url.searchParams.set('populate', 'contract');
  const contracts = await fetchFromStrapi<StarLog[]>(url, 'GET', null, token);

  // load protocols
  url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protocol-star-logs`);
  url.searchParams.set('filters[user][id][$eq]', user.data.id);
  url.searchParams.set('populate', 'protocol');
  const protocols = await fetchFromStrapi<StarLog[]>(url, 'GET', null, token);

  return new Response(JSON.stringify({
    code: 0,
    data: {
      contracts: keyByDocumentId(contracts.data, 'contract'),
      protocols: keyByDocumentId(protocols.data, 'protocol'),
    },
  }));
}

export async function POST(req: Request) {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return new Response(
      JSON.stringify({ error: user.error }),
      { status: 401, statusText: 'Unauthorized' },
    )
  }

  const token = process.env.STRAPI_STAR_TOKEN;
  const { id, type } = (await req.json()) as {
    id: string,
    type: 'protocol' | 'contract',
  };
  // check log
  let url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-star-logs`);
  url.searchParams.set('fields[0]', 'id');
  url.searchParams.set(`filters[${type}][documentId][$eq]`, id);
  url.searchParams.set('filters[user][id][$eq]', user.data.id);
  const logs = await fetchFromStrapi<StarLog[]>(url, 'GET', null, token);
  const log = logs.data?.[ 0 ];

  // update like status
  url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-stars`);
  url.searchParams.set('filters[contract][documentId][$eq]', id);
  const records = await fetchFromStrapi<Stars[]>(url, 'GET', null, token);
  const record = records.data?.[ 0 ];
  if (record) {
    url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-stars/${record.documentId}`);
    await fetchFromStrapi(url, 'PUT', {
      data: {
        ...record,
        stars: Number(record.stars) + (log ? - 1 : 1),
      },
    }, token);
  } else {
    url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-stars`);
    const data = await fetchFromStrapi(url, 'POST', {
      data: {
        [ type ]: id,
        stars: 1,
      }
    }, token);
    console.log('xxx', data);
  }

  // update log
  if (log) {
    url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-star-logs/${log.documentId}`);
    await fetchFromStrapi(url, 'DELETE', null, token);
  } else {
    url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${type}-star-logs`);
    const data = await fetchFromStrapi(url, 'POST', {
      data: {
        [ type ]: id,
        user: user.data.id,
      }
    }, token);
    console.log('xxx1', data);
  }

  return new Response(JSON.stringify({
    code: 0,
    data: (record?.stars || 0) + (log ? -1 : 1),
  }));
}
