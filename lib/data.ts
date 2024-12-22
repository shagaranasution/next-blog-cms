import { Prisma } from '@/prisma/generated/client';
import prisma from './prisma';
import { PaginationMeta } from '@/types';

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
    images: {
      select: {
        id: true;
        url: true;
      };
    };
  };
}>;

export type FetchPaginatedArticlesWithRelationsResult = {
  data: ArticleWithRelations[];
  meta: PaginationMeta;
};

export async function fetchPaginatedArticlesWithRelations(
  page: number,
  limit: number
): Promise<FetchPaginatedArticlesWithRelationsResult> {
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

export type FetchArticleResult = Prisma.ArticleGetPayload<{
  include: {
    images: {
      select: {
        url: true;
      };
    };
  };
}>;

export async function fetchArticle(id: string): Promise<FetchArticleResult> {
  try {
    const data = await prisma.article.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!data) {
      throw new Error('Data not found');
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching articles: ', error.message);
    throw new Error(`Error fetching articles: ${error.message}.`);
  }
}
