import { EditArticleForm } from '@/components/edit-article-form';
import { fetchArticle, FetchArticleResult } from '@/lib/data';
import { Article } from '@/prisma/generated/client';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await fetchArticle(id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Edit Article</h1>
      <EditArticleForm article={article} />
    </div>
  );
}
