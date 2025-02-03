import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';

export async function POST(req: Request) {
  const user = await getUserMeLoader();
  const token = process.env.STRAPI_STAR_TOKEN;
  const { message } = (await req.json()) as {
    message: string,
  };

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/need-mores`);
  const data = await fetchFromStrapi(url, 'POST', {
    data: {
      message,
      user_id: user.ok ? user.data.id : '',
    }
  }, token);
  console.log('xxx', data, user);

  return new Response(JSON.stringify({
    code: 0,
    data: 'ok',
  }));
}
