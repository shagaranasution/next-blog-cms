'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params}`;
  };

  return (
    <div className="flex justify-center gap-6 my-4">
      <Link
        href={createPageUrl(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        onClick={currentPage <= 1 ? (e) => e.preventDefault() : undefined}>
        <p>Prev</p>
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageUrl(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        onClick={
          currentPage >= totalPages ? (e) => e.preventDefault() : undefined
        }>
        <p>Next</p>
      </Link>
    </div>
  );
}
