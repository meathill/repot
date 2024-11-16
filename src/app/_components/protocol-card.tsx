import { Protocol } from '@/types';
import { clsx } from 'clsx';
import Link from 'next/link';

interface ProtocolCardProps {
  className?: string;
  protocol: Protocol;
}
export default function ProtocolCard({
  className = '',
  protocol,
}: ProtocolCardProps) {
  const logo = protocol.logo?.url || protocol.logo_url;

  return (
    <Link
      className={clsx('flex flex-col gap-4 border border-gray p-6 hover:bg-main-green rounded-lg', className)}
      href={`/protocol/${protocol.name}`}
    >
      <div className="flex items-center gap-4 h-12">
        {logo && <img
          src={logo}
          alt={protocol.name}
          className="w-12 h-12 rounded-lg block"
        />}
        <h4 className="font-bold text-primary-800">{protocol.name}</h4>
      </div>
      {protocol.overview && <p className="text-sm line-clamp-2 text-primary-800">{protocol.overview}</p>}
    </Link>
  );
}
