import Link from 'next/link';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link href="/">
        <h1 className="inline-block text-2xl font-bold mb-6">Next Blog</h1>
      </Link>
      {children}
    </div>
  );
}
