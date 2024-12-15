// ./src/app/connect/[provider]/[redirect]/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { UserProfile } from '@/types';
import { cookieConfig } from '@/constants';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('access_token');

  if (!token) return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL));

  const provider = (await params).provider;
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:1337';
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append('access_token', token);

  const res = await fetch(url.href);
  const data = (await res.json()) as {
    jwt: string;
    user: UserProfile;
  };

  const cookiesObj = await cookies();
  cookiesObj.set('jwt', data.jwt, cookieConfig);
  cookiesObj.set('repot-user', JSON.stringify(data.user), cookieConfig);

  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL));
}
