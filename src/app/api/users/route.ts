import { fetchFromStrapi } from '@/services';
import { getUserMeLoader } from '@/services/user-me-loader';

export async function POST(req: Request) {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return new Response(
      JSON.stringify({ error: user.error }),
      { status: 401, statusText: 'Unauthorized' },
    )
  }

  const userId = user.data.id;
  const { userName } = await req.json();

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`);
  const data = await fetchFromStrapi(url, 'PUT', {
    username: userName,
  }, process.env.STRAPI_USER_TOKEN);

  return new Response(JSON.stringify({
    code: 0,
    data,
  }));
}
