import { fetchFromStrapi } from '@/services';
import { cookies } from 'next/headers';
import { UserProfile, UserResponse } from '@/types';

export async function POST(req: Request) {
  const cookieObj = await cookies();
  const json = cookieObj.get('repot-user');
  const user: UserProfile | undefined = json ? JSON.parse(json.value) : undefined;
  if (!user) {
    return {
      status: 401,
      body: JSON.stringify({
        code: 401,
        message: '未登录'
      })
    }
  }

  const meId = user.id;
  const token = cookieObj.get('jwt')?.value;
  const { userId, userName } = await req.json();

  // 先验证身份后更新
  const meUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${meId}`);
  const currentUser = await fetchFromStrapi<UserResponse>(meUrl, 'GET');
  if (currentUser.id !== userId) {
    return new Response(JSON.stringify({
      code: 403,
      message: '无权限修改其他用户信息'
    }), { status: 403 });
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`);
  const data = await fetchFromStrapi(url, 'PUT', {
    data: {
      username: userName,
    }
  }, token);

  return new Response(JSON.stringify({
    code: 0,
    data,
  }));
}
