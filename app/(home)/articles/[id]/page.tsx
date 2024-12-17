'use client';

import useFetchArticles from '@/hooks/use-fetch-articles';

export default function Home() {
  const { data: articles, loading } = useFetchArticles({});

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {articles.map((article) => (
        <div key={article.id} className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="mb-4">{new Date(article.createdAt).toDateString()}</p>
          <p
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </div>
      ))}
    </div>
  );
}
