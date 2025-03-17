'use client';

import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useUserStore } from '@/store';
import { ApiResponse, ItemType, ItemTypePlural } from '@/types';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/app/_components/login-dialog';

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
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [value, setValue] = useState<number>(number);
  const [loginOpen, setLoginOpen] = useState(false);
  const isStarred = useMemo(() => {
    if (!user) {
      return false;
    }

    const items = stars[ type + 's' as ItemTypePlural ] || {};
    return id in items;
  }, [id, stars, type]);

  async function doStar() {
    if (isStarring) return;

    if (!user) {
      setLoginOpen(true);
    }

    if (isStarred) {
      setIsConfirm(true);
      return;
    }

    return toggleStar();
  }
  async function toggleStar() {
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

  return <>
    <button
      className={cn('flex items-center gap-2 text-xs hover:bg-main-green disabled:opacity-50', className)}
      disabled={isStarring}
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
    <Dialog
      open={isConfirm}
      onOpenChange={setIsConfirm}
    >
      <DialogContent
        className="p-0 sm:rounded-3xl border border-black"
        hasClose={false}
        onEscapeKeyDown={() => setIsConfirm(false)}
        onInteractOutside={() => setIsConfirm(false)}
      >
        <DialogHeader
          className="bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            Delete Contract?
          </DialogTitle>
        </DialogHeader>
        <div className="pt-6 pb-8 px-8">
          <p className="font-bold leading-6 mb-6">Confirm delete contract?</p>
          <div className="flex gap-6 justify-center items-center">
            <Button
              className="font-bold text-base h-10 border-black px-6 rounded-lg"
              onClick={() => setIsConfirm(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="font-bold text-base h-10 px-6 border border-black rounded-lg"
              onClick={() => toggleStar()}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
  </>
}
