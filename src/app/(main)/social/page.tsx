import { CircleArrowRight } from 'lucide-react';

import Footer from '@/app/_components/footer';
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
    <div className="min-h-screen pt-20 px-8 sm:px-0 pb-8 container mx-auto">
      <Footer>
        <div className="flex flex-col sm:flex-row justify-between mb-16">
          <div className="font-title text-2xl sm:text-5.5xl w-full sm:max-w-52 mb-6">
            Social Media
          </div>
          <div className="w-full sm:w-3/5 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="h-50 w-full sm:w-7/12 bg-white rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <X className="w-11 h-10" />
                <SocialArrow name="X" />
              </div>
              <div className="grow h-50 bg-main-purple rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Discord className="w-12 h-12" />
                <SocialArrow name="Discord" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="grow h-50 bg-[#e3fbff] rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Telegram className="w-12 h-12" />
                <SocialArrow name="Telegram" />
              </div>
              <div className="h-50 w-full sm:w-7/12 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000]">
                <Medium className="w-12 h-12" />
                <SocialArrow name="Medium" />
              </div>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
