'use client';
import { CircleArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/ui/animated-list';

interface Item {
  name: string;
  description: string;
  icon: string;
}

const features: Item[] = Array.from({ length: 20 }, () => ({
  name: 'Cutting Edge',
  description:
    'Discover the most innovative Web3 contracts, showcasing fresh ideas and advanced techniquesthat keep you at the forefront of smart contract development.',
  icon: '/ce.png',
}));

const FeatureItem = ({ name, description, icon}: Item) => {
  return (
    <div className="bg-white transition-all hover:bg-lighter-gray p-6 border border-primary-800 rounded-2.5xl shadow-[0_4px_0_0_#000] hover:shadow-[0_8px_0_0_#000]">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          <img src={icon} className="w-12 h-12 rounded-lg" />
          <div className="font-bold text-lg text-primary-800">{name}</div>
        </div>
        <CircleArrowRight
          className="w-6 h-6 stroke-dark-green"
          stroke="#08320F"
          strokeWidth={1.3}
        />
      </div>
      <div className="text-primary-800 capitalize text-sm">{description}</div>
    </div>
  );
}

export default function FeaturedList({
  className,
}: {
  className?: string;
  }) {
  return (
    <div
      className={cn(
        'relative flex w-full h-[540px] flex-col p-6 overflow-hidden',
        className
      )}
    >
      <AnimatedList delay={2000}>
        {features.map((item, idx) => (
          <FeatureItem {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
