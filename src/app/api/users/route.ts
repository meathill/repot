import { fetchFromStrapi } from '@/services';
import { getUserMeLoader } from '@/services/user-me-loader';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const user = await getUserMeLoader();
  if (!user.ok) {
    return new Response(
      JSON.stringify({ error: user.error }),
      { status: 401, statusText: 'Unauthorized' },
    )
  }

  const userId = user.data.id;
  const { userName } = (await req.json()) as {
    userName: string,
  };

  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`);
  const data = await fetchFromStrapi(url, 'PUT', {
    username: userName,
  }, env.STRAPI_USER_TOKEN);

  return new Response(JSON.stringify({
    code: 0,
    data,
  }));
}
