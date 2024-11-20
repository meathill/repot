'use client';

import { CircleArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/ui/animated-list';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import { Protocol } from '@/types';

interface FeaturedListProps {
  className?: string;
  items: Protocol[];
}

const FeatureItem = ({
  documentId,
  name,
  overview,
  logo,
  logo_url,
}: Protocol) => {
  const icon = logo?.url || logo_url || '';
  return (
    <Link
      className="block bg-white hover:bg-lighter-gray p-6 border border-primary-800 rounded-2.5xl shadow-[0_4px_0_0_#000] raised-button"
      href={`/contract/${documentId}-${slugify(name)}`}
      style={{ '--shadow-size': '8px' }}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          {icon && <Image
            alt={name}
            src={icon}
            className="w-12 h-12 rounded-lg"
            width={48}
            height={48}
            unoptimized
          />}
          <div className="font-bold text-lg text-primary-800">{name}</div>
        </div>
        <CircleArrowRight
          className="w-6 h-6 stroke-dark-green"
          stroke="#08320F"
          strokeWidth={1.3}
        />
      </div>
      <p className="text-primary-800 capitalize text-sm h-10 line-clamp-2">{overview}</p>
    </Link>
  );
}

export default function FeaturedList({
  className,
  items,
}: FeaturedListProps) {
  return (
    <div
      className={cn(
        'relative flex w-full sm:h-[540px] flex-col sm:p-6 overflow-hidden',
        className
      )}
    >
      <AnimatedList delay={2000}>
        {items.map((item, idx) => (
          <FeatureItem {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
