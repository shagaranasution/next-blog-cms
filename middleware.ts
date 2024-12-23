import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'ADMIN',
  },
  pages: {
    signIn: '/signin',
  },
});

export const config = {
  // Apply middleware to dashboard and its sub-paths
  matcher: ['/dashboard/:path*'],
};
