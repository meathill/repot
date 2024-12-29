import { fetchFromStrapi } from '@/services';
import { cookies } from 'next/headers';

export async function PUT(req: Request) {
    const cookieObj = await cookies();
    const token = cookieObj.get('jwt')?.value;

    const { userId, userName } = await req.json();
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
