import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';
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

  const token = env.STRAPI_STAR_TOKEN;
  const { name, github, description } = (await req.json()) as {
    name: string;
    github: string;
    description: string;
  };

  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/user-repots`);
  try {
    const data = await fetchFromStrapi(url, 'POST', {
      data: {
        name,
        github_link: github,
        description,
        ...user.ok && { user: user.data.id },
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
  } catch (error) {
    console.log('error', error);
    return new Response(
      JSON.stringify({
        code: 1,
        message: (error as Error).message,
      }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({
    code: 0,
    data: 'ok',
  }));
}
