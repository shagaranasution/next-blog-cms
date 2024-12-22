import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const createImages = async (imageUrls: string[]) => {
  return imageUrls.map((url) => ({
    url,
  }));
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });
  const id = (await params).id;

  if (!token) {
    console.error('Unauthorized');

    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
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

    const article = await prisma.article.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        images: {
          create: images ? await createImages(images) : [],
        },
      },
    });

    return NextResponse.json(
      { message: 'Article updated successfully.', article },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: `Failed to update article. ${error.message}.` },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const token = await getToken({ req });

  if (!token) {
    console.error('Unauthorized');

    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const deletedArticle = await prisma.article.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: 'Article deleted successfully.',
        deletedArticle,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: `Failed to delete article. ${error.message}.`,
      },
      { status: 500 }
    );
  }
}
