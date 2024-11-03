import { CircleArrowRight } from 'lucide-react';
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

export default function PointsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-50 w-2/3 bg-white rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000] inline-flex flex-col justify-between">
          <div className="font-title text-2xl text-dark-green">
            How to Earn Repot points?
          </div>
          <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-2/5 sm:rounded-3xl p-0 border border-black"
        hasClose={false}
      >
        <DialogHeader className="bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl">
          <DialogTitle className="font-bold text-2xl text-dark-green">
            What are points?
          </DialogTitle>
          <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center">
            <img src="/logo.svg" alt="Repot Logo" className="w-8 h-8" />
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
              Although we don't have a direct use for these points yet, we're
              working on rewarding our most active users with exclusive perks
              and benefits. Stay tuned for exciting updates!
            </li>
          </ul>
        </div>
        <DialogFooter className="pb-8 sm:justify-center sm:items-center sm:flex-row">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="bg-lime-green rounded-lg border border-black px-6 font-bold text-base text-dark-green hover:bg-lime-green hover:shadow-[0_4px_0_0_#000]"
            >
              Got It
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
