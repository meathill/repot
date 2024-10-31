import Link from 'next/link';
import { CircleArrowRight } from 'lucide-react';

import X from '@/components/icons/x-icon';
import Discord from '@/components/icons/discord-icon';
import Telegram from '@/components/icons/telegram-icon';
import Medium from '@/components/icons/medium-icon';

const SocialArrow = ({ name }: { name: string }) => {
  return (
    <div className="absolute bottom-6 right-6 ml-auto flex items-center">
      <div className="leading-relaxed text-dark-green">{name}</div>
      <CircleArrowRight className="w-6 h-6 ml-4 stroke-primary-800" />
    </div>
  );
};

export default function SocialMedia() {
  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-col mt-8 p-14 border border-primary-800 bg-main-green rounded-2.5xl shadow-[0_8px_0_0_#000]">
        <div className="flex flex-row justify-between">
          <div className="font-title text-5.5xl max-w-52">Social Media</div>
          <div className="w-3/5 flex flex-col gap-8">
            <div className="flex flex-row gap-8">
              <div className="h-50 w-7/12 bg-white rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <X className="w-11 h-10" />
                <SocialArrow name="X" />
              </div>
              <div className="grow h-50 bg-main-purple rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Discord className="w-12 h-12" />
                <SocialArrow name="Discord" />
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="grow h-50 bg-[#e3fbff] rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Telegram className="w-12 h-12" />
                <SocialArrow name="Telegram" />
              </div>
              <div className="h-50 w-7/12 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Medium className="w-12 h-12" />
                <SocialArrow name="Medium" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-16">
          <div className="font-logo font-bold text-4xl text-primary-800">
            Repot
          </div>
          <div className="flex flex-row gap-28">
            <div className="flex flex-col gap-10">
              <div className="font-title font-bold text-lg text-dark-green">
                Repot
              </div>
              <div className="flex flex-row gap-6">
                <Link href="#">Documentation</Link>
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="font-title font-bold text-lg text-dark-green">
                Social
              </div>
              <div className="flex flex-row gap-6">
                <Link href="#">Discord</Link>
                <Link href="#">X</Link>
                <Link href="#">Telegram</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
