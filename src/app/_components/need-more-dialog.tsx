'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { UploadIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { FormEvent, PropsWithChildren, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { sleep } from '@/utils';
import PurpleLeaf from '@/assets/images/leaf-purple.svg';

type Props = PropsWithChildren & {
  isProtocol?: boolean;
}

export default function NeedMoreDialog({
  children,
  isProtocol,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [request, setRequest] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  async function doSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setStatus(false);
    if (isLoading) return;
    if ((event.target as HTMLFormElement).matches(':invalid')) return;

    if (!request) {
      setMessage(`Please describe your favorite ${isProtocol ? 'protocol' : 'contract'}.`);
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
      <DialogTrigger onClick={() => setIsOpen(true)}>
        {children || <Button
          className="text-lg gap-2 font-bold hover:bg-main-green"
          size="xl"
          type="button"
          variant="ghost"
        >
          <UploadIcon size={24} color="currentColor" strokeWidth={2} />
          Upload
        </Button>}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none max-w-2xl"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            {status ? <>
              <div className="w-16 h-16 rounded-full border border-dark-green bg-lime-green flex items-center justify-center mx-auto">
                <Image
                  alt="Leaf"
                  className="w-6.5 h-7.5"
                  src={PurpleLeaf}
                  width={26}
                  height={30}
                />
              </div>
              <p className="text-2xl font-bold mt-6 text-center">Thank you for your submission</p>
            </> : 'Propose More Contracts?'}

          </DialogTitle>
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
        {status ? <div className="pt-2 pb-8 px-8">
          <p className="text-sm leading-6">Please wait for our review. Once the review is completed, the reward points will be automatically sent to your account</p>
          <footer className="flex justify-center mt-6">
            <Button
              className="font-bold text-base leading-normal py-2 px-6"
              onClick={() => setIsOpen(false)}
              variant="primary-bordered"
            >
              Close
            </Button>
          </footer>
        </div>
      : <form
          className="pt-2 pb-8 px-8"
          onSubmit={doSubmit}
        >
          <p className="font-bold leading-loose mb-4">Description what contracts you need</p>
          <p className="text-sm mb-2">Get rewarded faster by telling us more !</p>
          <div className="form-control w-full mb-4">
              <textarea
                className="w-full min-h-32 block px-4 py-3 border border-gray rounded-lg"
                onChange={(e) => setRequest(e.target.value)}
                placeholder={`Please describe your favorite ${isProtocol ? 'protocol' : 'contact'} here, and please explain a bit about why you like it.`}
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
          <footer>
            <Button
              className="font-bold text-base leading-normal py-2 px-6"
              disabled={!request || isLoading}
              variant="outline"
            >
              {isLoading && <Spinner className="w-6 h-6" />}
              Submit
            </Button>
          </footer>
        </form>}
      </DialogContent>
    </Dialog>
  )
}
