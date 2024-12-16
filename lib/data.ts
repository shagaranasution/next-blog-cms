import prisma from './prisma';
import { ArticleWithRelations, PaginationMeta } from '@/types';

export async function fetchArticles(
  page: number,
  limit: number
): Promise<{
  data: ArticleWithRelations[];
  meta: PaginationMeta;
}> {
  const offset = (page - 1) * limit;

  try {
    const articles = await prisma.article.findMany({
      skip: offset,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalArticles = await prisma.article.count();
    const data = {
      data: articles,
      meta: {
        total: totalArticles,
        page,
        limit,
        totalPages: Math.ceil(totalArticles / limit),
      },
    };

    return data;
  } catch (error) {
    console.error('Error fetching articles: ', error);
    throw new Error('Error fetching articles.');
  }
}
