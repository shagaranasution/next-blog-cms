'use client';

import type { ArticleWithRelations } from '@/lib/data';
import { dateToString } from '@/lib/format-date';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from './modal';

type ArticlesTableProps = {
  items: ArticleWithRelations[];
};

export function ArticlesTable({ items }: ArticlesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    // Perform delete action here
    console.log('Item deleted');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border w-[7%]">ID</th>
          <th className="py-2 px-4 border w-[20%]">Title</th>
          <th className="py-2 px-4 border w-[25%]">Content</th>
          <th className="py-2 px-4 border">Author</th>
          <th className="py-2 px-4 border w-[13%]">Created At</th>
          <th className="py-2 px-4 border w-[15%]">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((article, index) => (
          <tr
            key={article.id}
            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="py-2 px-4 border" title={article.id}>
              {article.id.slice(0, 8)}...
            </td>
            <td className="py-2 px-4 border" title={article.title}>
              {article.title}
            </td>
            <td className="py-2 px-4 border truncate" title={article.content}>
              {article.content.slice(0, 50)}...
            </td>
            <td className="py-2 px-4 border" title={article.author.name}>
              {article.author.name}
            </td>
            <td className="py-2 px-4 border">
              {dateToString(new Date(article.createdAt))}
            </td>
            <td className="py-2 px-4 border">
              <Link href={`/articles/${article.id}`}>
                <button className="text-green-500 hover:underline px-2">
                  View
                </button>
              </Link>
              |
              <Link href={`/dashboard/articles/${article.id}/edit`}>
                <button className="text-blue-500 hover:underline px-2">
                  Edit
                </button>
              </Link>
              |{/* <Link href={`/`}> */}
              <div className="inline-block">
                <button
                  onClick={handleDeletButtonClick}
                  className="text-red-500 hover:underline px-2">
                  Delete
                </button>

                <Modal
                  isOpen={isModalOpen}
                  title="Confirm Deletion"
                  message="Are you sure you want to delete this item? This action cannot be undone."
                  onConfirm={handleDelete}
                  onCancel={handleCancel}
                  confirmText="Delete"
                  cancelText="Cancel"
                />
              </div>
              {/* </Link> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
