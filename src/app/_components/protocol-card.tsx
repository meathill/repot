'use client';

import { Protocol } from '@/types';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import slugify from 'slugify';
import StarButton from '@/components/ui/star-button';
import StringLogo from './string-logo';

interface ProtocolCardProps {
  className?: string;
  hasDetails?: boolean;
  data: Protocol;
}
export default function ProtocolCard({
  className = '',
  hasDetails,
  data,
}: ProtocolCardProps) {
  const logo = data.logo?.url || data.logo_url;
  const Component = hasDetails ? 'div' : Link;

  return (
    <Component
      className={clsx(
        'flex flex-col gap-4 border border-gray p-6 rounded-lg',
        { 'hover:bg-main-green ': !hasDetails },
        className,
      )}
      href={`/protocol/${data.documentId}-${slugify(data.name)}`}
    >
      <div className="flex items-center gap-4 h-12">
        {logo && <Image
          src={logo}
          alt={data.name}
          className="w-12 h-12 rounded-lg block"
          width={48}
          height={48}
          unoptimized
        />}
        {
          !logo && <StringLogo name={data.name} />
        }
        <h4 className="font-bold text-primary-800">{data.name}</h4>
      </div>
      {data.overview && <p className="text-sm line-clamp-2 text-primary-800">{data.overview}</p>}
      {hasDetails && <>
        <div className="flex border-y border-light-gray bg-lighter-gray h-12 -mx-6">
          <div className="w-1/2 flex-none flex justify-center items-center gap-1.5 border-r border-light-gray">
            {(data.chains || []).map((chain) => (
              <Avatar
                key={chain.id}
                src={chain.logo?.url || chain.logo_url}
                name={chain.name}
                className="w-4 h-4"
              />
            ))}
          </div>
          <StarButton
            className="flex justify-center items-center w-1/2 gap-1.5 cursor-pointer hover:bg-lime-green transition-colors"
            id={data.documentId}
            number={data.stars?.stars || 0}
            type="protocol"
          />
        </div>
        <Button
          asChild
          className="bg-ivory border-dark-gray font-bold hover:bg-main-green active:bg-light-green"
          size="lg"
          variant="outline"
        >
          <Link href={`/protocol/${data.documentId}-${slugify(data.name)}`}>
            Go to Protocol
          </Link>
        </Button>
      </>}
    </Component>
  );
}
