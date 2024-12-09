import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the requested route starts with "/admin"
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const sessionToken =
      req.cookies.get('next-auth.session-token') ||
      req.cookies.get('__Secure-next-auth.session-token');

    // Redirect to login if no session token exists
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Optionally, verify if the user has admin privileges
    // (You could decode the session token or add additional checks if needed)
  }

  return NextResponse.next(); // Allow request to proceed
}
