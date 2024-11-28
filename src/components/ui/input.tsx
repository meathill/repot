import * as React from 'react'
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation';
import { FormEvent, forwardRef, InputHTMLAttributes, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

export type InputProps = InputHTMLAttributes<HTMLInputElement>
type InputSearchProps = InputProps & {
  isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, isLoading, onInput, ...props }, ref) => {
    const router = useRouter();
    const [query, setQuery] = useState(props.value || '');
    const Icon = isLoading ? Spinner : Search;

    function doSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      router.push(`/search?q=${query}`);
    }
    function onInputHandler(event: React.FormEvent<HTMLInputElement>) {
      setQuery((event.target as HTMLInputElement).value);
      onInput?.(event);
    }

    return (
      <form
        className="input-search-wrapper w-full relative mb-0"
        onSubmit={doSubmit}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon className="w-4 h-4" />
        </div>
        <input
          disabled={isLoading}
          type="search"
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary-800 focus:bg-light-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          onInput={onInputHandler}
          ref={ref}
          value={query}
          {...props}
        />
      </form>
    );
  }
);
InputSearch.displayName = 'InputSearch';

export { Input, InputSearch };
