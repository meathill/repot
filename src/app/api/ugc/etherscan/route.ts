import { fetchFromStrapi } from '@/services';
import { EtherscanData } from '@/types';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req: Request) {
  const { env } = getCloudflareContext();
  const token = env.STRAPI_DOCUMENT_TOKEN;
  const { address } = (await req.json()) as {
    address: string,
  };

  let result: EtherscanData;
  try {
    const url = new URL(env.ETHERSCAN_API_BASE_URL as string);
    url.searchParams.set('module', 'contract');
    url.searchParams.set('action', 'getsourcecode');
    url.searchParams.set('address', address);
    url.searchParams.set('apikey', env.ETHERSCAN_API_KEY as string);
    const response = await fetch(url, { next: { revalidate: 3600 } });

    const data = (await response.json()) as {
      status: string;
      message: 'OK';
      result: EtherscanData[];
    }
    if (data.status === '1' && data.result && data.result.length > 0) {
      result = data.result[ 0 ];
    } else {
      return new Response(JSON.stringify({
        code: 1,
        message: 'Cannot find contract info at this address.',
      }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error('Error fetching contract info:', error)
    return new Response(JSON.stringify({
      code: 2,
      message: 'Failed to fetch contract info',
    }), {
      status: 400,
    });
  }

  // upload contract to R2
  const prefix = `contracts/${address}/`;
  const key = `${prefix}entry.sol`;

  try {
    const bucket = env.CONTRACTS_BUCKET;
    await bucket.put(key, result.SourceCode);
    console.log('Uploaded contract to R2:', key);
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return new Response(JSON.stringify({
      code: 4,
      message: 'Failed to upload contract to storage',
    }), {
      status: 500,
    });
  }

  // save to cms
  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/contracts`);
  const data = await fetchFromStrapi(url, 'POST', {
    data: {
      name: result.ContractName,
      document_links: prefix,
      overview: `Compiler version: ${result.CompilerVersion}
EVM Version: ${result.EVMVersion}
License Type: ${result.LicenseType}`,
    },
  }, token);
  if (data.error) {
    return new Response(JSON.stringify({
      code: 3,
      message: data.error.message,
    }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({
    code: 0,
    data: 'ok',
  }));
}
