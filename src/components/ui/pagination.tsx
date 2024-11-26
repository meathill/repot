'use client'

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

type PaginationProps = {
  total: number; // 数据总数
  pageSize?: number; // 每页数据量 默认值:20
  page?: string | number | undefined;
}

export default function Pagination({
  total,
  pageSize,
  page,
}: PaginationProps) {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(page ? +page : 1);
  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const searchParamsObj = new URLSearchParams(urlObj.search);
    searchParamsObj.set('page', page?.toString() || '1');
    setCurrent(page ? +page : 1);
  }, [page]);

  // 总页数
  const totalPage = useMemo(() => {
    return Math.ceil(total / (pageSize || 20));
  }, [total, pageSize])

  /**
   * 上一页
   */
  function handlePrevPage() {
    if (current > 1) {
      const newPage = current - 1;
      const newSearch = setSearchParams(window.location.search, newPage);
      router.push(newSearch);
      setCurrent(newPage);
    }
  }

  /**
   * 下一页
   */
  function handleNextPage() {
    if (current < totalPage) {
      const newPage = current + 1;
      const newSearch = setSearchParams(window.location.search, newPage)
      router.push(newSearch);
      setCurrent(newPage);
    }
  }

  function setSearchParams(search: string, page: number) {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', page.toString());
    return `?${searchParams.toString()}`;
  }
 
  return (
    <div className='flex justify-center items-center mt-8 overflow-x-auto'>
      <ArrowLeft className={clsx('cursor-pointer', current === 1 && 'text-slate-300 cursor-not-allowed')} onClick={handlePrevPage}/>
      {Array.from({ length: totalPage }).map((_: unknown, index: number) => {
        const pageNum = index + 1;
        return (
          <Link
            key={index}
            className={clsx('mx-1 w-7 h-7 flex justify-center items-center', current !== pageNum && 'bg-slate-300')}
            href={`?page=${pageNum}`}
            >{pageNum}</Link>
        )
      })}
      <ArrowRight className={clsx('cursor-pointer', current === totalPage && 'text-slate-300 cursor-not-allowed')} onClick={handleNextPage}/>
    </div>
  )
}
