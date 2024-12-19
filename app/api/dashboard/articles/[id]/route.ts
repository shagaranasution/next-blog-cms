import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

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

  if (!id) {
    return NextResponse.json({ error: 'Article Not Found' }, { status: 401 });
  }

  try {
    const { title, content, images } = await req.json();

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
        images,
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
