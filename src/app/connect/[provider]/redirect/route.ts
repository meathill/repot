// ./src/app/connect/[provider]/[redirect]/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { UserProfile } from '@/types';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('access_token');

  if (!token) return NextResponse.redirect(new URL('/', request.url));

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
  cookiesObj.set('jwt', data.jwt, config);
  cookiesObj.set('repot-user', JSON.stringify(data.user), config);

  return NextResponse.redirect(new URL('/', request.url));
}
