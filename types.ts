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

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string | null;
  birthday: Date | null;
  gender: Gander | null;
  createdAt: Date;
  updatedAt: Date;
}
