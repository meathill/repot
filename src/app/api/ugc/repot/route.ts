import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';

export async function POST(req: Request) {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return new Response(
      JSON.stringify({ error: user.error }),
      { status: 401, statusText: 'Unauthorized' },
    )
  }

  const token = process.env.STRAPI_STAR_TOKEN;
  const { name, github, description } = (await req.json()) as {
    name: string;
    github: string;
    description: string;
  };

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-repots`);
  try {
    const data = await fetchFromStrapi(url, 'POST', {
      data: {
        name,
        github_link: github,
        description,
        user_id: user.ok ? user.data.id : '',
      }
    }, token);
    console.log('xxx', data, user);
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
