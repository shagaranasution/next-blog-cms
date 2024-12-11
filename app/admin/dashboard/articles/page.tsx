import { ArticlesTable } from '@/components/articles-table';

import { ARTICLE_ITEMS } from '@/lib/mock-data';

export default function ArticlesPage() {
  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-3xl font-bold">Articles</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New
        </button>
      </div>
      <ArticlesTable items={ARTICLE_ITEMS} />
    </div>
  );
}
