import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { clsx } from 'clsx';

type RadioItem = {
  label: string;
  value: string;
}
interface RadioGroupProps {
  className?: string;
  items: RadioItem[];
  onChange: (value: string) => void;
  value: string;
}

const toggleGroupItemClasses = 'flex h-12 px-6 items-center justify-center bg-lighter-gray text-primary-800 first:rounded-l-lg last:rounded-r-lg border border-black border-l-0 first:border-l hover:bg-light-gray data-[state=on]:bg-primary-800 data-[state=on]:text-white';

export default function RadioGroup ({
  className,
  items,
  onChange,
  value,
}: RadioGroupProps) {
    return (
      <ToggleGroup.Root
        aria-label={value}
        className={clsx('flex', className)}
        defaultValue={value}
        type="single"
        onValueChange={onChange}
      >
        {items.map(item => (
          <ToggleGroup.Item
            className={toggleGroupItemClasses}
            key={item.value}
            value={item.value}
            aria-label={item.label}
          >
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    );
}
