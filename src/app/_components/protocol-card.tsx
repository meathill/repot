import { Protocol } from '@/types';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import slugify from 'slugify';

interface ProtocolCardProps {
  className?: string;
  hasDetails?: boolean;
  protocol: Protocol;
}
export default function ProtocolCard({
  className = '',
  hasDetails,
  protocol,
}: ProtocolCardProps) {
  const logo = protocol.logo?.url || protocol.logo_url;
  const Component = hasDetails ? 'div' : Link;

  return (
    <Component
      className={clsx(
        'flex flex-col gap-4 border border-gray p-6 rounded-lg',
        { 'hover:bg-main-green ': !hasDetails },
        className,
      )}
      href={`/protocol/${protocol.documentId}-${slugify(protocol.name)}`}
    >
      <div className="flex items-center gap-4 h-12">
        {logo && <Image
          src={logo}
          alt={protocol.name}
          className="w-12 h-12 rounded-lg block"
          width={48}
          height={48}
        />}
        <h4 className="font-bold text-primary-800">{protocol.name}</h4>
      </div>
      {protocol.overview && <p className="text-sm line-clamp-2 text-primary-800">{protocol.overview}</p>}
      {hasDetails && <>
        <div className="flex border-y border-light-gray bg-lighter-gray h-12 -mx-6">
          <div className="w-1/2 flex-none flex justify-center items-center gap-1.5 border-r border-light-gray">
            {(protocol.chains || []).map((chain) => (
              <Avatar
                key={chain.id}
                src={chain.logo?.url || chain.logo_url}
                name={chain.name}
                className="w-4 h-4"
              />
            ))}
          </div>
          <div className="w-1/2 flex-none flex justify-center items-center gap-1.5">
            <Star size={16} />
            123
          </div>
        </div>
        <Button
          asChild
          className="bg-ivory border-dark-gray font-bold hover:bg-main-green active:bg-light-green"
          size="lg"
          variant="outline"
        >
          <Link href={`/protocol/${protocol.documentId}-${slugify(protocol.name)}`}>
            Go to Protocol
          </Link>
        </Button>
      </>}
    </Component>
  );
}
