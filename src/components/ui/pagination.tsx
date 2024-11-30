'use client'

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

type PaginationProps = {
  total: number; // 数据总数
  pageSize?: number; // 每页数据量 默认值:20
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
    return Math.ceil(total / (pageSize || 20));
  }, [total, pageSize])
  
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
      {Array.from({ length: totalPage }).map((_: unknown, index: number) => {
        const pageNum = index + 1;
        return (
          <Link
            key={index}
            className={clsx('mx-1 w-7 h-7 flex justify-center items-center', page !== pageNum && 'bg-slate-300')}
            href={getPageLink(pageNum)}
            >{pageNum}</Link>
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
