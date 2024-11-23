'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, GitBranch, AlignJustify } from 'lucide-react';
import ContractsIcon from '@/components/icons/contracts-icon';
import SocialIcon from '@/components/icons/social-icon';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import SearchBox from '@/app/_components/search-box';
import Logo from '@/assets/images/logo-text.svg';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { UserProfile } from '@/types';
import NavUser from '@/components/user/nav-user';
import { useUserStore } from '@/store';

const NavLinks = ({
  className = '',
}: { className?: string }) => {
  const hasChain = !process.env.FIXED_CHAIN_ID;
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';

  return (
    <div className={clsx('gap-4 sm:gap-3 text-primary-800 font-bold sm:font-normal', className, { 'sm:hidden': q })}>
      <Link
        href="/search?category=contracts&page=1"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <ContractsIcon className="w-4 h-4"/>
        Contracts
      </Link>
      {hasChain && <Link
        href="/search?category=chains"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <Box className="w-4 h-4"/>
        Chains
      </Link>}
      <Link
        href="/search?category=protocols&page=1"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <GitBranch className="w-4 h-4"/>
        Protocols
      </Link>
      <Link
        href="/social"
        className="py-2 sm:px-4 inline-flex rounded-lg items-center gap-2 hover:bg-main-green active:bg-light-green"
      >
        <SocialIcon className="w-4 h-4"/>
        Social Media
      </Link>
    </div>
  );
};

export default function HeaderNav({
  user,
}: { user?: UserProfile}) {
  const setUser = useUserStore((state) => state.setUser);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUser(user || null);
  }, [ user ]);

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
              <Suspense>
                <SearchBox />
                <NavLinks className="flex flex-col" />
              </Suspense>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link href="/">
          <Image src={Logo} alt="Repot Logo" className="h-9" priority />
        </Link>
        <Suspense>
          <NavLinks className="hidden sm:flex sm:items-center me-auto" />
          <SearchBox className="hidden sm:flex" />
        </Suspense>
        <NavUser user={user} />
      </nav>
    </>
  );
}
