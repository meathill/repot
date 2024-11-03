'use client';
import { useState } from 'react';

import {
  Code,
} from 'lucide-react';
import { InputSearch } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import ContractsIcon from '@/components/icons/contracts-icon';

export default function SearchBox() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <InputSearch
          placeholder="Search Keywords or Contract Address"
          className="border-gray w-80"
          role="combobox"
          aria-expanded={open}
          onInput={() => {
            console.log('input');
            setOpen(true);
          }}
        />
      </PopoverTrigger>
      <PopoverContent asChild onOpenAutoFocus={(e) => e.preventDefault()}>
        <Command className="border border-black p-0 w-80">
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandItem className="bg-main-green">
              <ContractsIcon className="w-4 h-4" />
              <span className="font-bold text-sm">
                Search for all contracts
              </span>
            </CommandItem>
            <CommandItem>
              <Code className="w-4 h-4" />
              <span className="font-bold text-sm">
                Search for code snippets
              </span>
            </CommandItem>
            <CommandSeparator />
            <CommandGroupLabel className="text-[#8561eb]">
              Contracts
            </CommandGroupLabel>
            <CommandGroup className="p-0">
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 1</span>
              </CommandItem>
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 2</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroupLabel className="text-[#3ebd1a]">
              Protocols
            </CommandGroupLabel>
            <CommandGroup className="p-0">
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 3</span>
              </CommandItem>
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 4</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroupLabel className="text-[#eb5f35]">
              Learning
            </CommandGroupLabel>
            <CommandGroup className="p-0">
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 5</span>
              </CommandItem>
              <CommandItem>
                <img src="/token-icon.png" className="w-5 h-5" />
                <span className="font-bold text-sm">Simple ERC20 Token 6</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
