'use client';

import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useUserStore } from '@/store';
import { ApiResponse, ItemType, ItemTypePlural } from '@/types';
import { cn } from '@/lib/utils';

interface StarButtonProps {
  className?: string;
  id: string;
  number: number;
  type: ItemType;
}
export default function StarButton({
  className = '',
  id,
  number,
  type,
}: StarButtonProps) {
  const stars = useUserStore(state => state.stars);
  const user = useUserStore(state => state.user);
  const [isStarring, setIsStarring] = useState<boolean>(false);
  const [value, setValue] = useState<number>(number);
  const isStarred = useMemo(() => {
    if (!user) return false;

    const items = stars[ type + 's' as ItemTypePlural ] || {};
    return id in items;
  }, [id, stars, type]);

  async function doStar() {
    if (isStarring) return;

    setIsStarring(true);
    try {
      const response = await fetch('/api/stars', {
        method: 'POST',
        body: JSON.stringify({
          id,
          type,
        }),
      });
      const json: ApiResponse<number> = await response.json();
      setValue(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsStarring(false);
    }
  }

  return (
    <button
      className={cn('flex items-center gap-2 text-xs hover:bg-main-green disabled:opacity-50 disabled:cursor-not-allowed', className)}
      disabled={!user || isStarring}
      onClick={doStar}
      title={!user ? 'Please Sign in before star' : ''}
      type="button"
    >
      {isStarring
        ? <Spinner className="w-4 h-4" />
        : <Star
            size={18}
            {...isStarred ? { fill: 'hsl(var(--light-green))' } : { color: '#636363' }}
          />
      }
      {value}
    </button>
  )
}
