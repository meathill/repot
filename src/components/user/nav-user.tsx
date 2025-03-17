import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button, ButtonProps } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import LoginDialog from '@/app/_components/login-dialog';
import { UserProfile } from '@/types';
import Link from 'next/link';
import { useUserStore } from '@/store';

interface NavUserProps {
  className?: string;
  size?: ButtonProps['size'];
  user?: UserProfile;
}

export default function NavUser({
  className = '',
  size = 'default',
  user,
}: NavUserProps) {
  const loadStars = useUserStore(state => state.loadStars);
  const isModalOpen = useUserStore(state => state.isModalOpen);
  const [loginOpen, setLoginOpen] = useState(false);
  const username = useMemo(() => {
    return user?.username || user?.email || 'User';
  }, [user]);

  useEffect(() => {
    if (user) loadStars();
  }, []);
  useEffect(() => {
    if (!user) return;

    setLoginOpen(isModalOpen);
  }, [isModalOpen]);

  if (user) {
    return (
      <div className={className}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              className={clsx('max-w-25 truncate', className)}
              effect="active"
              size="sm"
            >
              {username}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              className="min-w-48 rounded-md border border-gray bg-white p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
              sideOffset={4}
            >
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  asChild
                  className="group relative flex h-12 select-none items-center rounded-md px-4 text-sm leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-main-green data-[disabled]:text-dark-gray hover:bg-main-green"
                >
                  <Link href="/my/dashboard">Dashboard</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  asChild
                  className="group relative flex h-12 select-none items-center rounded-md px-4 text-sm leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-main-green data-[disabled]:text-dark-gray hover:bg-main-green"
                >
                  <a href="/api/auth/logout">Logout</a>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

    )
  }

  return <div className={className}>
    <Button
      onClick={() => setLoginOpen(true)}
      className={clsx('bg-main-purple rounded-lg aspect-square p-0 border-black border text-primary-800 font-bold ms-auto sm:ms-0 sm:px-6 hover:bg-main-purple')}
      effect="raised"
      size={size}
    >
      <span className="hidden sm:inline">Sign in</span>
      <ArrowRight className="sm:ml-1 w-4 h-4" />
    </Button>

    <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
  </div>;
}
