import { Root, Image, Fallback } from '@radix-ui/react-avatar';
import { clsx } from 'clsx';

interface AvatarProps {
  className?: string;
  name: string;
  src?: string;
}

export default function Avatar({
  className = 'size-12',
  name,
  src,
}: AvatarProps) {
  const letters = name.substring(0, 2);

  return (
    <Root className={clsx('flex select-none items-center justify-center overflow-hidden rounded-full bg-gray', className)}>
      <Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt={name}
        unoptimized
      />
      <Fallback
        className="leading-1 flex size-full items-center justify-center bg-white font-medium"
        delayMs={600}
      >
        {letters}
      </Fallback>
    </Root>
  )
}
