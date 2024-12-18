import { fetchArticle } from '@/lib/data';

export default async function ArticlesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const article = await fetchArticle(id);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="mb-4">{new Date(article.createdAt).toDateString()}</p>
      <p
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
    </div>
  );
}
