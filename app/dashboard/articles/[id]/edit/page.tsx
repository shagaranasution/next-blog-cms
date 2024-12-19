import { fetchArticle } from '@/lib/data';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await fetchArticle(id);

  return (
    <div>
      <p>Edit {article.title} Page</p>
    </div>
  );
}
