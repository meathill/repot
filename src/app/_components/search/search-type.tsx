import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { Box, Code, GitBranch } from 'lucide-react';
import FileNetwork from '@/components/icons/file-network';
import Link from 'next/link';

interface SearchTypeProps {
  className?: string;
  current: string;
}

const TabItems = [
  {
    name: 'chains',
    label: 'Chains',
    icon: Box,
  },
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
  {
    name: 'code',
    label: 'Code Search',
    icon: Code,
  },
];

export default function SearchType({
  className = '',
  current,
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
          <Link href={`?category=${item.name}`}>
            <item.icon size={24} strokeWidth={2} />
            {item.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
