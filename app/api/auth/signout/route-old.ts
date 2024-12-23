import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const isProduction = process.env.NODE_ENV === 'production';

  if (session) {
    const response = NextResponse.redirect(new URL('/signin', req.url));

    response.cookies.set('__Secure-next-auth.session-token', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction,
    });

    response.cookies.set('next-auth.session-token', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  }

  return NextResponse.redirect(new URL('/signin', req.url));
}
