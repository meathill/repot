import { cookies } from 'next/headers';
import { cookieConfig } from '@/constants';
import { redirect } from 'next/navigation';

export async function GET() {
  const cookieObj = await cookies();
  cookieObj.set('jwt', '', { ...cookieConfig, maxAge: 0 });
  redirect('/');
}
