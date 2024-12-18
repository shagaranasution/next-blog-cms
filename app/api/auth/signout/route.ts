import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.redirect(new URL('/signin', req.url), {
      headers: {
        'Set-Cookie': `next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }

  return NextResponse.redirect(new URL('/signin', req.url));
}
