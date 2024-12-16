import { ArticleWithRelations } from '@/types';
import { useEffect, useState } from 'react';

export default function useFetchArticles(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<ArticleWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/dashboard/articles');

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
