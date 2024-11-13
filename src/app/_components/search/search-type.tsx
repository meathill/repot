import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { Box, Code, GitBranch } from 'lucide-react';
import FileNetwork from '@/components/icons/file-network';

interface SearchTypeProps {
  className?: string;
}

export default function SearchType({
  className = '',
}: SearchTypeProps) {
  return (
    <div
      className={clsx('flex gap-6 items-center', className)}
      style={{ '--shadow-size': '4px' }}
    >
      <Button
        className="text-lg gap-2 font-bold"
        effect="active"
        size="xl"
        type="button"
        variant="ghost"
      >
        <Box size={24} strokeWidth={2} />
        Chains
      </Button>
      <Button
        className="text-lg gap-2 font-bold"
        size="xl"
        type="button"
        variant="ghost"
      >
        <GitBranch size={24} strokeWidth={2} />
        Protocols
      </Button>
      <Button
        className="text-lg gap-2 font-bold"
        size="xl"
        type="button"
        variant="ghost"
      >
        <FileNetwork />
        Contracts
      </Button>
      <Button
        className="text-lg gap-2 font-bold"
        size="xl"
        type="button"
        variant="ghost"
      >
        <Code size={24} strokeWidth={2} />
        Code Search
      </Button>
    </div>
  );
}
