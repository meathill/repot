import { getContracts, getProtocols } from '@/services';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  const protocols = await getProtocols({
    pageSize: 3,
    query,
  });
  const contracts = await getContracts({
    pageSize: 3,
    query,
  });

  return Response.json({
    code: 0,
    data: {
      protocols,
      contracts,
    },
  });
}
