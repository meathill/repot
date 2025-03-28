import { Button } from '@/components/ui/button';
import { Database, Droplets, Link2, Wallet } from 'lucide-react';
import Link from 'next/link';
import ProtocolsDisplay from '@/app/_components/protocols-display';
import { Chain } from '@/types';

interface ChainContentProps {
  chainData: Chain;
}

export default function ChainContent({
    chainData,
  }: ChainContentProps) {
  return <>
    <article className="bg-light-gray border-gray rounded-lg p-6 mb-6">
      <h3 className="font-bold mb-2">What Is {chainData.name}</h3>
      <p className="ps-4">{chainData.overview}</p>
    </article>
    <h3 className="font-bold mb-4">{chainData.name} Links</h3>
    <div className="flex items-center flex-wrap gap-4 mb-6">
      {chainData.website && (
        <Button
          asChild
          className="h-12 font-bold hover:bg-main-green"
          size="xl"
          variant="outline"
        >
          <Link
            href={chainData.website}
            target="_blank"
          >
            <Link2 size={16} color="currentColor" />
            Official links
          </Link>
        </Button>
      )}
      {chainData.developer_docs && (
        <Button
          asChild
          className="h-12 font-bold hover:bg-main-green active:bg-light-green"
          size="xl"
          variant="outline"
        >
          <Link
            href={chainData.developer_docs}
            target="_blank"
          >
            <Database size={16} color="currentColor" />
            Documentation
          </Link>
        </Button>
      )}
      {chainData.whitepaper && (
        <Button
          asChild
          className="h-12 font-bold hover:bg-main-green"
          size="xl"
          variant="outline"
        >
          <Link
            href={chainData.whitepaper}
            target="_blank"
          >
            <Droplets size={16} color="currentColor" />
            White paper
          </Link>
        </Button>
      )}
      {chainData.explorer && (
        <Button
          asChild
          className="h-12 font-bold hover:bg-main-green active:bg-light-green"
          size="xl"
          variant="outline"
        >
          <Link
            href={chainData.explorer}
            target="_blank"
          >
            <Wallet size={16} color="currentColor" />
            Explorer
          </Link>
        </Button>
      )}
    </div>
    <h3 className="font-bold mb-4">Chain Details</h3>
    <div className="border border-gray flex py-6 rounded-lg mb-6">
      <div className="flex-none w-1/4 relative after:content-[''] after:h-12 after:border-l after:border-gray after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2">
        <h4 className="font-bold mb-4 w-1/3 mx-auto">Language</h4>
        <p className="text-sm w-1/3 mx-auto">{chainData.chain_language}</p>
      </div>
      <div className="flex-none w-1/4 relative after:content-[''] after:h-12 after:border-l after:border-gray after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2">
        <h4 className="font-bold mb-4 w-1/3 mx-auto">Consensus</h4>
        <p className="text-sm w-1/3 mx-auto">{chainData.consensus}</p>
      </div>
      <div className="flex-none w-1/4 relative after:content-[''] after:h-12 after:border-l after:border-gray after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2">
        <h4 className="font-bold mb-4 w-1/3 mx-auto">Network Layer</h4>
        <p className="text-sm w-1/3 mx-auto">{chainData.network_layer}</p>
      </div>
      <div className="flex-none w-1/4 relative">
        <h4 className="font-bold mb-4 w-1/3 min-w-32 mx-auto">Network Type</h4>
        <p className="text-sm w-1/3 mx-auto">{chainData.network_type}</p>
      </div>
    </div>
    {chainData.protocols && <ProtocolsDisplay items={chainData.protocols} name={chainData.name}/>}
    </>;
}