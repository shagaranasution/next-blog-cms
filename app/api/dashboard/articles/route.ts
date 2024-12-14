import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

const createImages = async (imageUrls: string[]) => {
  return imageUrls.map((url) => ({
    url,
  }));
};

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const offset = (page - 1) * limit;

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

    return NextResponse.json(
      {
        data: articles,
        meta: {
          total: totalArticles,
          page,
          limit,
          totalPages: Math.ceil(totalArticles / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const {
      title,
      content,
      images,
    }: { title: string; content: string; images?: string[] } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: token.id,
        images: {
          create: images ? await createImages(images) : [],
        },
      },
    });

    return NextResponse.json(
      { message: 'Article created successfully.', article },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to create article.` },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
