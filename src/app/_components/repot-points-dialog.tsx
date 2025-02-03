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
import { X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  points?: number;
}

export default function RepotPointsDialog({
  points = 0,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="ms-auto font-bold"
          effect="raised"
          size="xl"
        >
          Repot Points: {points}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            What are Repot points?
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
        <div className="pt-2 pb-8 flex flex-col justify-center items-center gap-4">
          <ul className="form-control w-full pe-8 ps-12 text-sm leading-6 text-primary-800">
            <li className="list-disc">Earn Points for Your Activity on repot</li>
            <li className="list-disc">You can earn points by actively using Cookbook. Deploy contracts effortlessly with No-Code Deploy, download Foundry, Hardhat, and Scaffold ETH boilerplates, and import our resources into Remix, ChainIDE, and VS Code.</li>
            <li className="list-disc">Although we don&apos;t have a direct use for these points yet, we&apos;re working on rewarding our most active users with exclusive perks and benefits. Stay tuned for exciting updates!</li>
          </ul>
          <Button
            className="font-bold text-base leading-normal py-2 px-6 border border-black"
            onClick={() => setIsOpen(false)}
            variant="primary"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
