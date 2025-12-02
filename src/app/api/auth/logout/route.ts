import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getCloudflareContext();
  const cookieObj = await cookies();
  cookieObj.set('jwt', '', {
    maxAge: 0,
    path: '/',
    domain: env.HOST ?? 'localhost',
    httpOnly: true,
    secure: true,
  });
  redirect('/');
}
