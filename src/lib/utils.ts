import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasMetaKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  const isMac = navigator.userAgent.includes('Mac OS X');
  return isMac ? event.metaKey : event.ctrlKey;
}
