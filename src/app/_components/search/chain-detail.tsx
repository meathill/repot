import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { sleep } from '@/utils';

interface ChainDetailProps {
  chainId: string;
}

export function ChainDetail({
  chainId,
}: ChainDetailProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    sleep(1000).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="border border-gray rounded-2.5xl bg-white p-6 flex justify-center items-center">
      <Spinner /> Loading...
    </div>;
  }

  return <div>Chain detail</div>;
}
