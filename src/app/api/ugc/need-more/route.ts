import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req: Request) {
  const { env } = getCloudflareContext();
  const user = await getUserMeLoader();
  const token = env.STRAPI_STAR_TOKEN;
  const { message } = (await req.json()) as {
    message: string,
  };

  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/need-mores`);
  const data = await fetchFromStrapi(url, 'POST', {
    data: {
      message,
      ...user.ok && { user:  user.data.id },
    }
  }, token);
  console.log('xxx', data, user);
  if (data.error) {
    return new Response(JSON.stringify({
      code: 1,
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
