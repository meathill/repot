import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GitHub from '@/assets/images/github.svg';
import Logo from '@/assets/images/repot.svg'

export default function LoginDialog({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-8 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center relative">
            <Image src={Logo} alt="Repot" className="h-3" />
            <Image
              src={GitHub}
              alt="GitHub"
              className="w-6 h-6 absolute bottom-0 right-0"
            />
          </div>
          <DialogTitle className="font-bold text-2xl text-dark-green">
            Log in with GitHub
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
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="pt-2 pb-8 flex flex-col justify-center items-center gap-6">
          <Button className="font-bold text-base leading-normal py-2 px-6">
            Continut To GitHub
            <ExternalLink className="w-4 h-4" />
          </Button>
          <div className="capitalize text-primary-800 text-sm leading-6">
            Logging in will enable you to Earn repot point
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
