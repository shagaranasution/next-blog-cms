import { ArticleWithRelations } from '@/types';
import { useEffect, useState } from 'react';

export default function useFetchArticles({
  dashboard = false,
  page = 1,
  limit = 10,
}: {
  dashboard?: boolean;
  page?: number;
  limit?: number;
}) {
  const [data, setData] = useState<ArticleWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const path = dashboard ? '/api/dashboard/articles' : '/api/articles';
    try {
      const res = await fetch(path);

      if (!res.ok) {
        setError(res.statusText);
        return;
      }

      const { data }: { data: ArticleWithRelations[] } = await res.json();

      setData(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
