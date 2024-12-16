'use client';
import { ArticlesTable } from '@/components/articles-table';
import useFetchArticles from '@/hooks/use-fetch-articles';

import { ARTICLE_ITEMS } from '@/lib/mock-data';
import Link from 'next/link';

export default function ArticlesPage() {
  const { data: articles, loading, error } = useFetchArticles();
  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link href="/dashboard/articles/create">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add New
          </button>
        </Link>
      </div>

      {loading ? <div>Loading..</div> : <ArticlesTable items={articles} />}
      {error && <div>{error}</div>}
    </div>
  );
}
