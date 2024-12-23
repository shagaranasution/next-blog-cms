import React from 'react';
import Link from 'next/link';
import { SignOutButton } from '@/components/signout-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 flex flex-col gap-4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav className="flex-1 space-y-4">
          <Link
            href="/dashboard/articles"
            className="block hover:bg-gray-700 p-2 rounded">
            Manage Articles
          </Link>
        </nav>
        <div>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
