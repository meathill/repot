'use client'

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { PAGE_SIZE } from '@/constants';

type PaginationProps = {
  total: number; // 数据总数
  pageSize?: number; // 每页数据量
  page: number;
}

export default function Pagination({
  total,
  pageSize,
  page,
}: PaginationProps) {
  const searchParams = useSearchParams();

  // 总页数
  const totalPage = useMemo(() => {
    return Math.ceil(total / (pageSize || PAGE_SIZE));
  }, [total, pageSize])

  const MAX_VISIBLE_PAGE = 11; // 最多显示的页数（左 + 右 + 1[当前页]）
  const visiblePages = useMemo(() => {
    const start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGE / 2));

    const pages = Array.from({ length: MAX_VISIBLE_PAGE }, (_, index) => {
      const pageNum = start + index;
      if (pageNum > totalPage) return;
      return pageNum;
    }).filter(Boolean);

    return pages as number[];
  }, [totalPage, page, MAX_VISIBLE_PAGE]);
  
  function getPageLink(targetPage: number) {
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > totalPage) {
      targetPage = totalPage;
    }
    const params = new URLSearchParams(searchParams!);
    params.set('page', targetPage.toString());
    return `?${params.toString()}`;
  }
 
  return (
    <div className='flex justify-center items-center mt-8 overflow-x-auto'>
      <Link
        href={getPageLink(page - 1)}
        className={clsx('cursor-pointer', page <= 1 && 'text-slate-300 cursor-not-allowed')}
      >
        <ArrowLeft />
      </Link>
      {visiblePages.map((pageNum: number, index: number) => {
        return (
          <Link
            key={index}
            className={clsx('mx-1 min-w-4 h-auto px-2 flex justify-center items-center', page !== pageNum && 'bg-slate-300')}
            href={getPageLink(pageNum as number)}
          >
            {pageNum}
          </Link>
        )
      })}
      <Link
        href={getPageLink(page + 1)}
        className={clsx('cursor-pointer', page >= totalPage && 'text-slate-300 cursor-not-allowed')}
      >
        <ArrowRight />
      </Link>
    </div>
  )
}
