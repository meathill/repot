'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Blocks, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { sleep } from '@/utils';

export default function NeedMoreDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [request, setRequest] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  async function doSubmit() {
    setMessage('');
    setStatus(false);
    if (isLoading) return;
    if ((event.target as HTMLFormElement).matches(':invalid')) return;

    if (!request) {
      setMessage('Please describe your favorite protocol.');
      return;
    }

    setIsLoading(true);
    try {
      await fetch('/api/ugc/need-more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request,
        }),
      });
      setRequest('');
      setStatus(true);
      setMessage('Thank you for your submission!');
      await sleep(2000);
      setIsOpen(false);
    } catch (e) {
      console.log(e);
      setMessage('Failed to submit the request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen) return;

    setMessage('');
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-lg gap-2 font-bold hover:bg-main-green"
          size="xl"
          type="button"
          variant="ghost"
          onClick={() => setIsOpen(true)}
        >
          <Blocks size={24} color="currentColor" strokeWidth={2} />
          Need more?
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            Submit your favorite protocol
          </DialogTitle>
          <DialogDescription>
            Don&apos;t see your favorite protocol? Let us know!
          </DialogDescription>
          <DialogClose
            asChild
            className="absolute right-0 -top-16 sm:top-0 sm:-right-20"
            style={{ marginTop: 0 }}
          >
            <Button
              type="button"
              variant="outline"
              className="outline-none bg-main-green rounded-xl border border-black h-12 w-12 hover:bg-lime-green hover:shadow-[0_4px_0_0_#000]"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <form
          className="pt-2 pb-8 flex flex-col justify-center items-center gap-4"
          onSubmit={doSubmit}
        >
          <div className="form-control w-full px-6">
            <textarea
              className="w-full min-h-32 block px-4 py-3 border border-gray rounded-lg"
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Please describe your favorite protocol here, and please explain a bit about why you like it."
              required
              value={request}
            />
          </div>
          {message && (
            <p className={clsx(
              'text-sm rounded-lg',
              status ? 'text-green-500 text-green-100' : 'text-red-500 bg-red-100'
            )}>{message}</p>
          )}
          <Button
            className="font-bold text-base leading-normal py-2 px-6"
            disabled={isLoading}
          >
            {isLoading && <Spinner className="w-6 h-6" />}
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
