import Link from 'next/link';
import { Box, GitBranch } from 'lucide-react';
import ContractsIcon from '@/components/icons/contracts-icon';
import SocialIcon from '@/components/icons/social-icon';

export default function HeaderNav() {
  return (
    <nav className="container h-20 flex justify-between w-full px-10 py-3.5 rounded-b-2.5xl bg-white fixed top-0 border-primary-800 border-b border-l border-r">
      <div className="inline-flex justify-between items-center gap-6">
        <div className="font-logo font-bold text-primary-800 text-4xl">
          Repot
        </div>
        <div className="inline-flex items-center gap-3 text-primary-800 font-default">
          <Link
            href="/contracts"
            className="px-4 inline-flex items-center gap-2"
          >
            <ContractsIcon className="w-4 h-4" />
            Contracts
          </Link>
          <Link href="/chains" className="px-4 inline-flex items-center gap-2">
            <Box className="w-4 h-4" />
            Chains
          </Link>
          <Link
            href="/protocols"
            className="px-4 inline-flex items-center gap-2"
          >
            <GitBranch className="w-4 h-4" />
            Protocols
          </Link>
          <Link href="/social" className="px-4 inline-flex items-center gap-2">
            <SocialIcon className="w-4 h-4" />
            Social Media
          </Link>
        </div>
      </div>
    </nav>
  );
}
