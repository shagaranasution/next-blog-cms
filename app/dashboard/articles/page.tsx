import { DasboardArticle } from '@/components/dashboard-articles';

export default async function ArticlesPage(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  return <DasboardArticle page={page} limit={limit} />;
}
