'use client';

import { signOut } from 'next-auth/react';

type SignOutButtonProps = {
  children?: React.ReactNode;
};

export function SignOutButton({ children }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      {children || 'Sign Out'}
    </button>
  );
}
