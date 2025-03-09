import { FocusEvent, FormEvent, MouseEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { sleep } from '@/utils';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { Spinner } from '@/components/ui/spinner';

type Props = PropsWithChildren & {
  className?: string;
}

export default function SubmitGithub({
  children,
  className,
}: Props) {
  const trigger = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  function doOpenDialog(event: FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) {
    if (!trigger.current?.contains(event.target as Element)) return;

    setIsOpen(true);
  }
  async function doSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setStatus(false);
    if (isLoading) return;
    if ((event.target as HTMLFormElement).matches(':invalid')) return;
    if (!URL.canParse(github)) {
      setMessage('Please provide a valid GitHub link.');
      return;
    }
    const url = new URL(github);
    if (url.hostname !== 'github.com') {
      setMessage('Please provide a valid GitHub link.');
      return;
    }

    setIsLoading(true);
    try {
      await fetch('/api/ugc/repot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          github,
          description,
        }),
      });
      setName('');
      setStatus(true);
      setMessage('Thank you for your submission! Your points will be added after we review your request.');
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
    setName('');
    setGithub('');
    setDescription('');
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
      >
        <div
          className={className}
          onFocus={event => doOpenDialog(event)}
          onClick={event => doOpenDialog(event)}
          ref={trigger}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            Upload Contract / Protocol
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
        <form
          className="pt-2 pb-8 flex flex-col justify-center items-center gap-4"
          onSubmit={event => doSubmit(event)}
        >
          <div className="form-control w-full px-6">
            <input
              className="w-full block px-4 py-2 border border-gray rounded-lg"
              onChange={(e) => setName(e.target.value)}
              placeholder="Contract / Protocol name"
              required
              value={name}
            />
          </div>
          <div className="form-control w-full px-6">
            <input
              className="w-full block px-4 py-2 border border-gray rounded-lg"
              onChange={(e) => setGithub(e.target.value)}
              placeholder="GitHub Link"
              required
              type="url"
              value={github}
            />
          </div>
          <div className="form-control w-full px-6">
            <textarea
              className="w-full min-h-24 block px-4 py-2 border border-gray rounded-lg"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Get rewarded faster by telling us more about the Repot!"
              value={description}
            />
          </div>
          {message && (
            <p className={clsx(
              'text-sm rounded-lg px-3 py-1',
              status ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'
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
