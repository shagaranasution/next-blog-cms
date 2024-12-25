import { fetchArticle } from '@/lib/data';
import PROLOGUE_ARTICLE from '@/prologue-article';

export default async function ArticlesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const article = id !== '0' ? await fetchArticle(id) : PROLOGUE_ARTICLE;

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
