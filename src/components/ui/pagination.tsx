'use client'

import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type PaginationProps = {
  total: number; // 数据总数
  pageSize?: number; // 每页数据量 默认值:20
  pageChange?: (page: number) => void; // 页码改变时的回调
}

export default function Pagination({
  total,
  pageSize,
  pageChange
}: PaginationProps) {
  // const [_total, setTotal] = useState(total);
  const [_pageSize] = useState( pageSize || 20);
  const [current, setCurrent] = useState(1);

  // 总页数
  const totalPage = useMemo(() => {
    return Math.ceil(total / _pageSize);
  }, [total, _pageSize])

  /**
   * 上一页
   */
  function handlePrevPage() {
    if (current > 1) {
      setCurrent(current - 1)
      if (pageChange) pageChange(current)
    }
  }

  /**
   * 下一页
   */
  function handleNextPage() {
    if (current < totalPage) {
      setCurrent(current + 1)
      if (pageChange) pageChange(current)
    }
  }

  /**
   * 跳转指定页
   * @param page 页码
   */
  function handleChangePage(page: number) {
    if (page === current) return
    setCurrent(page)
    if (pageChange) pageChange(current)
  }

  return (
  <div className='flex justify-center items-center mt-8 overflow-x-auto'>
    <ArrowLeft className={clsx('cursor-pointer', current === 1 && 'text-slate-300 cursor-not-allowed')} onClick={handlePrevPage}/>
    {Array.from({ length: totalPage }).map((_: unknown, index: number) => {
      const pageNum = index + 1;
      return (
        <Button
          key={index}
          className={clsx('mx-1', current !== pageNum && 'bg-slate-300')}
          onClick={() => handleChangePage(pageNum)}
        >{pageNum}</Button>
      )
    })}
    <ArrowRight className={clsx('cursor-pointer', current === totalPage && 'text-slate-300 cursor-not-allowed')} onClick={handleNextPage}/>
  </div>
  )
}
