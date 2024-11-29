import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import LoginDialog from '@/app/_components/login-dialog';
import { UserProfile } from '@/types';

interface NavUserProps {
  user?: UserProfile;
}

export default function NavUser({
  user,
}: NavUserProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const username = useMemo(() => {
    return user?.username || user?.email || 'User';
  }, [user]);

  if (user) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            className="max-w-25 truncate bg-lime-green hover:bg-main-green border border-black text-primary"
            effect="raised"
            size="sm"
          >
            {username}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="min-w-40 rounded-md border border-gray bg-white p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={4}
          >
            <DropdownMenu.Item
              asChild
              className="group relative flex h-8 select-none items-center rounded-md px-2 text-sm leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
            >
              <a href="/api/auth/logout">Logout</a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }

  return <>
    <Button
      onClick={() => setLoginOpen(true)}
      className={clsx('bg-main-purple rounded-lg aspect-square p-0 border-black border text-primary-800 font-bold ms-auto sm:ms-0 sm:px-6 hover:bg-main-purple')}
      effect="raised"
    >
      <span className="hidden sm:inline">Sign in</span>
      <ArrowRight className="sm:ml-1 w-4 h-4" />
    </Button>

    <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
  </>;
}
