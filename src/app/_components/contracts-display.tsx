'use client';

import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import LoginDialog from '@/app/_components/login-dialog';
import ContractCard from '@/app/_components/contract-card';
import { Contract } from '@/types';
import { clsx } from 'clsx';

interface ContractsDisplayProps {
  className?: string;
  items: Contract[];
}

export default function ContractsDisplay({
  className = '',
  items,
}: ContractsDisplayProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <>
      <Carousel
        opts={{ align: 'start' }}
        className={clsx('w-full', className)}
      >
        <div className="flex flex-row justify-between items-center mb-6 sm:mb-8">
          <div className="font-title text-3xl text-dark-green">Contracts</div>
          <div className="flex gap-4">
            <CarouselPrevious className="static transform-none w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000] hover:bg-light-green" />
            <CarouselNext className="static transform-none w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000] hover:bg-light-green" />
          </div>
        </div>

        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <ContractCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}
