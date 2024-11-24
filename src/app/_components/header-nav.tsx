'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, GitBranch, ArrowRight, AlignJustify } from 'lucide-react';
import ContractsIcon from '@/components/icons/contracts-icon';
import SocialIcon from '@/components/icons/social-icon';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import SearchBox from '@/app/_components/search-box';
import LoginDialog from '@/app/_components/login-dialog';
import Logo from '@/assets/images/logo-text.svg';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';

const NavLinks = () => {
  return (
    <>
      <Link
        href="/search?category=contracts"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <ContractsIcon className="w-4 h-4" />
        Contracts
      </Link>
      <Link
        href="/search?category=chains"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <Box className="w-4 h-4" />
        Chains
      </Link>
      <Link
        href="/search?category=protocols"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <GitBranch className="w-4 h-4" />
        Protocols
      </Link>
      <Link
        href="/social"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <SocialIcon className="w-4 h-4" />
        Social Media
      </Link>
    </>
  );
};

export default function HeaderNav() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q');
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <nav className="z-10 container mx-auto h-auto sm:h-20 flex sm:items-center sm:flex-row w-full px-4 sm:px-10 py-4 sm:py-3.5 sm:rounded-b-2.5xl bg-background sticky top-0 border-b-neutral-300 sm:border-primary-800 border-b sm:border-l sm:border-r sm:gap-6">
        {/* mobile menu */}
        <Collapsible
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          className="sm:hidden me-auto"
        >
          <CollapsibleTrigger asChild>
            <Button
              className="[&_svg]:size-6 sm:hidden"
              size={'icon'}
              variant={'ghost'}
            >
              <AlignJustify className="w-9 h-9" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="fixed top-17 border-t left-0 right-0 bottom-0 bg-white pt-6 px-9">
            <div className="flex flex-col sm:items-center gap-4 sm:gap-3 text-primary-800 font-bold sm:font-normal">
              <SearchBox />
              <NavLinks />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link href="/">
          <Image src={Logo} alt="Repot Logo" className="h-9" priority />
        </Link>
        {!q && <div className="hidden sm:flex sm:items-center gap-4 sm:gap-3 text-primary-800 font-bold sm:font-normal me-auto">
          <NavLinks />
        </div>}
        <SearchBox className={clsx('hidden sm:flex', q ? 'sm:w-125 me-auto' : 'sm:w-80')} />
        <Button
          onClick={() => setLoginOpen(true)}
          className={clsx('bg-main-purple rounded-lg aspect-square p-0 border-black border text-primary-800 font-bold ms-auto sm:ms-0 sm:px-6 hover:bg-main-purple')}
          effect="raised"
        >
          <span className="hidden sm:inline">Sign in</span>
          <ArrowRight className="sm:ml-1 w-4 h-4" />
        </Button>
      </nav>

      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}
