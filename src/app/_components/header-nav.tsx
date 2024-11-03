'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Box, GitBranch, ArrowRight } from 'lucide-react';
import ContractsIcon from '@/components/icons/contracts-icon';
import SocialIcon from '@/components/icons/social-icon';
import { Button } from '@/components/ui/button';
import SearchBox from '@/app/_components/search-box';
import LoginDialog from '@/app/_components/login-dialog';

export default function HeaderNav() {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <>
      <nav className="z-10 container h-20 flex justify-between w-full px-10 py-3.5 rounded-b-2.5xl bg-background fixed top-0 border-primary-800 border-b border-l border-r">
        <div className="inline-flex justify-between items-center gap-6">
          <Link
            href="/"
            className="font-logo font-bold text-primary-800 text-4xl"
          >
            <img src="/logo-text.svg" alt="Repot Logo" className="h-9" />
          </Link>
          <div className="inline-flex items-center gap-3 text-primary-800 font-default">
            <Link
              href="/contracts"
              className="px-4 inline-flex items-center gap-2"
            >
              <ContractsIcon className="w-4 h-4" />
              Contracts
            </Link>
            <Link
              href="/chains"
              className="px-4 inline-flex items-center gap-2"
            >
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
            <Link
              href="/social"
              className="px-4 inline-flex items-center gap-2"
            >
              <SocialIcon className="w-4 h-4" />
              Social Media
            </Link>
          </div>
        </div>
        <div className="inline-flex items-center justify-between gap-6">
          <SearchBox />
          <Button
            onClick={() => setLoginOpen(true)}
            className="bg-main-purple rounded-lg border-black border text-primary-800 font-bold hover:bg-main-purple hover:shadow-[0_3px_0_0_#000]">
            Sign in
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </nav>
      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}
