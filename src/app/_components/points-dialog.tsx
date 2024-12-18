import { CircleArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Logo from '@/assets/images/logo.svg';

export default function PointsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-50 w-full sm:w-2/3 bg-white rounded-2.5xl border border-dark-green p-6 relative cursor-pointer inline-flex flex-col justify-between raised-button">
          <div className="font-title text-2xl text-dark-green">
            How to Earn Repot points?
          </div>
          <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl p-0 border border-black"
        hasClose={false}
      >
        <DialogHeader className="bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            What are points?
          </DialogTitle>
          <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center">
            <Image
              src={Logo}
              alt="Repot Logo"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </div>
        </DialogHeader>
        <div className="py-2 pl-12 px-8 text-sm text-primary-800 leading-6 capitalize">
          <ul className="list-disc">
            <li className="list-outside">
              Earn Points for Your Activity on repot
            </li>
            <li className="list-outside">
              You can earn points by actively using Repot. Deploy contracts
              effortlessly with No-Code Deploy, download Foundry, Hardhat, and
              Scaffold ETH boilerplates, and import our resources into Remix,
              ChainIDE, and VS Code.
            </li>
            <li className="list-outside">
              Although we don&apos;t have a direct use for these points yet,
              we&apos;re working on rewarding our most active users with
              exclusive perks and benefits. Stay tuned for exciting updates!
            </li>
          </ul>
        </div>
        <DialogFooter className="pb-8 sm:justify-center items-center sm:flex-row">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              effect="raised"
              className="bg-lime-green rounded-lg border border-black px-6 font-bold text-base text-dark-green hover:bg-lime-green"
              style={{ '--shadow-size': '3px' }}
            >
              Got It
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
