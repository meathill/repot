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

const NavLinks = () => {
  return (
    <>
      <Link
        href="/search?category=contracts&page=1"
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
        href="/search?category=protocols&page=1"
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <nav className="z-10 container mx-auto h-auto sm:h-20 flex flex-col sm:flex-row justify-center sm:justify-between w-full px-4 sm:px-10 py-4 sm:py-3.5 sm:rounded-b-2.5xl bg-background sticky top-0 border-b-neutral-300 sm:border-primary-800 border-b sm:border-l sm:border-r">
        <div className="flex justify-center sm:justify-between items-center sm:gap-6 relative">
          <Link href="/">
            <Image src={Logo} alt="Repot Logo" className="h-9" />
          </Link>
          <div className="hidden sm:inline-flex sm:items-center gap-4 sm:gap-3 text-primary-800 font-bold sm:font-normal">
            <NavLinks />
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center justify-between gap-6">
          <SearchBox />
          <Button
            onClick={() => setLoginOpen(true)}
            className="bg-main-purple rounded-lg border-black border text-primary-800 font-bold hover:bg-main-purple"
            effect="raised"
          >
            Sign in
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

        {/* mobile menu */}
        <Collapsible
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          className="sm:hidden"
        >
          <CollapsibleTrigger asChild>
            <Button
              className="absolute left-6 top-4 [&_svg]:size-6 sm:hidden"
              size={'icon'}
              variant={'ghost'}
            >
              <AlignJustify className="w-9 h-9" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 px-4">
            <div className="flex flex-col sm:items-center gap-4 sm:gap-3 text-primary-800 font-bold sm:font-normal">
              <NavLinks />
              <SearchBox />
              <Button
                onClick={() => setLoginOpen(true)}
                className="bg-main-purple rounded-lg border-black border text-primary-800 font-bold hover:bg-main-purple hover:shadow-[0_3px_0_0_#000]"
              >
                Sign in
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </nav>
      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}
