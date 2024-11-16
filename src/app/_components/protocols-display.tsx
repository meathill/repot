'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProtocolCard from '@/app/_components/protocol-card';
import { Protocol } from '@/types';
import { clsx } from 'clsx';

interface ProtocolsDisplayProps {
  className?: string;
  items: Protocol[];
  name: string;
}

export default function ProtocolsDisplay({
  className = '',
  name,
  items,
}: ProtocolsDisplayProps) {
  return (
    <>
      <Carousel
        opts={{ align: 'start' }}
        className={clsx('w-full', className)}
      >
        <div className="flex flex-row justify-between items-center mb-6 sm:mb-8">
          <h3 className="font-bold">{name} Projects</h3>
          <div className="flex gap-4">
            <CarouselPrevious
              className="static transform-none w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000] hover:bg-light-green"/>
            <CarouselNext
              className="static transform-none w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000] hover:bg-light-green"/>
          </div>
        </div>

        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <ProtocolCard protocol={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
