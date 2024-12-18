'use client';

import { dateToString } from '@/lib/format-date';
import { ArticleWithRelations } from '@/types';

export type ArticleItemType = ArticleWithRelations;

type ArticlesTableProps = {
  items: ArticleItemType[];
};

export function ArticlesTable({ items }: ArticlesTableProps) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border">ID</th>
          <th className="py-2 px-4 border">Title</th>
          <th className="py-2 px-4 border">Content</th>
          <th className="py-2 px-4 border">Author</th>
          <th className="py-2 px-4 border">Created At</th>
          <th className="py-2 px-4 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((article, index) => (
          <tr
            key={article.id}
            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="py-2 px-4 border">{article.id}</td>
            <td className="py-2 px-4 border">{article.title}</td>
            <td className="py-2 px-4 border truncate" title={article.content}>
              {article.content.slice(0, 50)}...
            </td>
            <td className="py-2 px-4 border">{article.author.name}</td>
            <td className="py-2 px-4 border">
              {dateToString(new Date(article.createdAt))}
            </td>
            <td className="py-2 px-4 border flex justify-center gap-2">
              <button className="text-green-500 hover:underline">View</button>|
              <button className="text-blue-500 hover:underline">Edit</button>|
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
