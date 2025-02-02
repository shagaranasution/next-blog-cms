'use client';

import { ArticlesTable } from '@/components/articles-table';
import { Pagination } from '@/components/pagination';
import useFetchArticlesDashboard from '@/hooks/use-fetch-articles-dashboard';
import Link from 'next/link';

export function DasboardArticle({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data, loading, error } = useFetchArticlesDashboard({ page, limit });
  const { data: articles, meta } = data;

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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ArticlesTable items={articles} />
          <Pagination totalPages={meta.totalPages} />
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
