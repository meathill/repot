'use client'

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { PAGE_SIZE } from '@/constants';

type PaginationProps = {
  total: number; // 数据总数
  pageSize?: number; // 每页数据量
  page: number;
}

type PageItem = {
  type: PageType.Page | PageType.Prev | PageType.Next;
  pageNum: number;
}
const enum PageType {
  Page = 'page',
  Prev = 'prev',
  Next = 'next',
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


    const maxVisiblePages = 11; // 最多显示的页数（左 + 右 + 1[当前页]）
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(totalPage);
    const visiblePages = useMemo(() => {
      const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPage, start + maxVisiblePages - 1);
      setStart(start);
      setEnd(end);

      const hasPrevEllipsis = start > 2;
      const hasNextEllipsis = end < totalPage - 1;

      const pages = Array.from({ length: maxVisiblePages }, (_, index) => {
        const pageNum = start + index;
        if (pageNum > totalPage) return;
        return {
          type: PageType.Page,
          pageNum,
        }
      }).filter(Boolean);

      return [
        ...(start > 1 ? [{ type: PageType.Page, pageNum: 1 }] : []),
        ...(hasPrevEllipsis ? [{ type: PageType.Prev, pageNum: -1 }] : []),
        ...pages,
        ...(hasNextEllipsis ? [{ type: PageType.Next, pageNum: -1 }] : []),
        ...(end < totalPage ? [{ type: PageType.Page, pageNum: totalPage }] : []),
      ] as PageItem[];
    }, [totalPage, page, maxVisiblePages]);
  
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
      {visiblePages.map((pageItem: PageItem, index: number) => {
        const type = pageItem.type;
        const pageNum = pageItem.pageNum;
        if (type === PageType.Prev || type === PageType.Next) {
          return <Link
                    key={index}
                    className="mx-1 min-w-4 h-auto px-2 flex justify-center items-center bg-slate-300"
                    href={getPageLink(type === PageType.Prev ? start - 1 : end + 1)}
                  >...</Link>;
        }
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
