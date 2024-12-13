import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  // Check if the requested route starts with "/admin"
  const protectedPath = req.nextUrl.pathname.startsWith('/admin');
  if (protectedPath) {
    const sessionToken =
      req.cookies.get('next-auth.session-token') ||
      req.cookies.get('__Secure-next-auth.session-token');

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  // Apply middleware to dashboard and its sub-paths
  matcher: ['/admin/:path*'],
};
