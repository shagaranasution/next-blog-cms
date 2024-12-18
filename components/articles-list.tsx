'use client';

import Link from 'next/link';

type ArticlesListProps = {
  title: string;
  content: string;
  linkTo: string;
};

export const ArticlesList = ({ title, content, linkTo }: ArticlesListProps) => {
  return (
    <Link href={linkTo}>
      <div className="mb-6 cursor-pointer">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 whitespace-pre-wrap truncate">
          {content.slice(0, 170)}...
        </p>
      </div>
    </Link>
  );
};
