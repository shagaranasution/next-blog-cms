import React from 'react';
import Link from 'next/link';

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
            href="/admin/dashboard"
            className="block hover:bg-gray-700 p-2 rounded">
            Manage Posts
          </Link>
        </nav>
        <div>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
