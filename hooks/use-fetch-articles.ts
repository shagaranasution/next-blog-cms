import type { ArticleWithRelations } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function useFetchArticles({
  initialPage = 1,
  limit = 10,
}: {
  initialPage?: number;
  limit?: number;
}) {
  const [data, setData] = useState<ArticleWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | string>();
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageToFetch: number) => {
    const path = `/api/articles?page=${pageToFetch}&limit=${limit}`;
    setLoading(true);

    try {
      const res = await fetch(path);

      if (!res.ok) {
        setError(res.statusText);
        return;
      }

      const { data: newData }: { data: ArticleWithRelations[] } =
        await res.json();

      setData((prevArticles) => {
        const existingIds = new Set(prevArticles.map((article) => article.id));
        const uniqueNewData = newData.filter(
          (article) => !existingIds.has(article.id)
        );

        return [...prevArticles, ...uniqueNewData];
      });
      setHasMore(newData.length === limit);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return { data, loading, error, hasMore, loadMore };
}
