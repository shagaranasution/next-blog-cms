'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong! {error.message}</h2>
      <Link href={`/dashboard`} className="text-blue-500 hover:text-blue-600">
        Go back
      </Link>
    </div>
  );
}
