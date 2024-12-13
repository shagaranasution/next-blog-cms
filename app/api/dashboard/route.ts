import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      message: 'Welcome to the protected route!',
      token,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
