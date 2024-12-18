'use client';

import { ArticlesList } from '@/components/articles-list';
import useFetchArticles from '@/hooks/use-fetch-articles';
import Link from 'next/link';
import { useRef, useCallback } from 'react';

export default function HomePage() {
  const {
    data: articles,
    loading,
    error,
    hasMore,
    loadMore,
  } = useFetchArticles({});
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            // Attach the ref to the last article for infinite scroll
            <div ref={lastArticleRef} key={article.id}>
              <ArticlesList
                title={article.title}
                content={article.content}
                linkTo={`/articles/${article.id}`}
              />
            </div>
          );
        } else {
          return (
            <div key={article.id}>
              <ArticlesList
                title={article.title}
                content={article.content}
                linkTo={`/articles/${article.id}`}
              />
            </div>
          );
        }
      })}
      {loading && <div>Loading...</div>}
    </div>
  );
}
