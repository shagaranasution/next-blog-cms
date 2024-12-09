import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.redirect(new URL('/login', req.url), {
      headers: {
        'Set-Cookie': `next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }

  return NextResponse.redirect(new URL('/login', req.url));
}
