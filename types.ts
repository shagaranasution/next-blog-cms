import { Prisma } from '@/prisma/generated/client';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { role?: string };
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export type UserRole = 'ADMIN' | 'USER';

export type Gander = 'MALE' | 'FEMALE' | 'OTHER';

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
