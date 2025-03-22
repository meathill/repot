import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { Box, GitBranch, UploadIcon } from 'lucide-react';
import FileNetwork from '@/components/icons/file-network';
import Link from 'next/link';
import { ElementType } from 'react';
import SubmitGithub from '@/app/_components/submit-github';
import { Chain } from '@/types';

interface SearchTypeProps {
  className?: string;
  current: string;
  isProtocol?: boolean;
  chains: Chain[];
}

type TabItem = {
  name: string;
  label: string;
  icon: ElementType;
  type?: 'button' | 'link';
}
const TabItems: TabItem[] = [
  {
    name: 'protocols',
    label: 'Protocols',
    icon: GitBranch,
  },
  {
    name: 'contracts',
    label: 'Contracts',
    icon: FileNetwork,
  },
];
if (!process.env.FIXED_CHAIN_ID) {
  TabItems.unshift({
    name: 'chains',
    label: 'Chains',
    icon: Box,
  });
}

export default function SearchType({
  className = '',
  current,
  chains,
}: SearchTypeProps) {
  return (
    <div
      className={clsx('flex gap-6 items-center max-w-full overflow-auto', className)}
      style={{ '--shadow-size': '4px' }}
    >
      {TabItems.map(item => (
        <Button
          asChild
          className="text-lg gap-2 font-bold hover:bg-main-green"
          effect={current === item.name ? 'active' : 'none'}
          key={item.name}
          size="xl"
          type="button"
          variant="ghost"
        >
          <Link href={
            (item.name === 'chains' || item.name === 'protocols') && chains?.length
              ? `?category=${item.name}&chain=${chains[ 0 ].name}`
              : `?category=${item.name}`
          }>
            <item.icon size={24} strokeWidth={2} />
            {item.label}
          </Link>
        </Button>
      ))}
      <SubmitGithub>
        <Button
          className="text-lg gap-2 font-bold hover:bg-main-green"
          size="xl"
          type="button"
          variant="ghost"
        >
          <UploadIcon size={24} strokeWidth={2} /> Upload
        </Button>
      </SubmitGithub>
    </div>
  );
}
