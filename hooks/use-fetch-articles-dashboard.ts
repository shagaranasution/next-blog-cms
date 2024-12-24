import type { FetchPaginatedArticlesWithRelationsResult } from '@/lib/data';
import { useCallback, useEffect, useState } from 'react';

const initialData: FetchPaginatedArticlesWithRelationsResult = {
  data: [],
  meta: {
    page: 1,
    limit: 1,
    total: 0,
    totalPages: 0,
  },
};

export default function useFetchArticlesDashboard({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  const [data, setData] =
    useState<FetchPaginatedArticlesWithRelationsResult>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<undefined | string>();

  const fetchData = useCallback(async () => {
    const path = `/api/dashboard/articles?page=${page}&limit=${limit}`;

    try {
      const res = await fetch(path);

      if (!res.ok) {
        setError(res.statusText);
        return;
      }

      const data: FetchPaginatedArticlesWithRelationsResult = await res.json();

      setData(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
