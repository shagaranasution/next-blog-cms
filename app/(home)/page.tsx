'use client';

import useFetchArticles from '@/hooks/use-fetch-articles';
import Link from 'next/link';

export default function Home() {
  const { data: articles, loading, error } = useFetchArticles({});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {articles.map((article) => (
        <Link href={`/articles/${article.id}`}>
          <div key={article.id} className="mb-6 cursor-pointer">
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-gray-600 whitespace-pre-wrap truncate">
              {article.content.slice(0, 170)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
