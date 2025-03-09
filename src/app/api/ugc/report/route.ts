import { getUserMeLoader } from '@/services/user-me-loader';
import { fetchFromStrapi } from '@/services';

export async function POST(req: Request) {
  const user = await getUserMeLoader();
  const token = process.env.STRAPI_STAR_TOKEN;
  const { content, from } = (await req.json()) as {
    content: string;
    from: string;
  };

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-reports`);
  const data = await fetchFromStrapi(url, 'POST', {
    data: {
      content,
      from,
      ...user.ok && { user: user.data.id },
    }
  }, token);
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
