import { fetchFromStrapi } from '@/services';
import { EtherscanData } from '@/types';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '@/lib/s3';

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request) {
  const token = process.env.STRAPI_DOCUMENT_TOKEN;
  const { address } = (await req.json()) as {
    address: string,
  };

  let result: EtherscanData;
  try {
    const url = new URL(process.env.ETHERSCAN_API_BASE_URL as string);
    url.searchParams.set('module', 'contract');
    url.searchParams.set('action', 'getsourcecode');
    url.searchParams.set('address', address);
    url.searchParams.set('apikey', process.env.ETHERSCAN_API_KEY as string);
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

  // upload contract to s3
  const prefix = `contracts/${address}/`;
  const key = `${prefix}entry.sol`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: key,
    Body: result.SourceCode,
  });
  const response = await s3Client.send(command);
  console.log('xxx', response);

  // save to cms
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contracts`);
  const data = await fetchFromStrapi(url, 'POST', {
    data: {
      name: result.ContractName,
      document_links: `s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${prefix}`,
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
