import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You need to log in to access this page.</p>;
  }

  return (
    <div>
      <div>Welcome, {session.user?.email}!</div>
      <form action="/api/auth/signout" method="POST">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded">
          Sign Out
        </button>
      </form>
    </div>
  );
}
