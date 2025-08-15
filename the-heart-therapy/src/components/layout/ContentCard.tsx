'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

export default function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div
      className={cn(
        'relative mx-auto max-w-4xl',
        'rounded-3xl bg-card shadow-xl',
        'border border-border/10',
        'backdrop-blur-sm',
        'transition-all duration-300',
        'hover:shadow-2xl',
        'overflow-hidden', // Ensure header border radius is clipped
        className
      )}
    >
      {children}
    </div>
  );
}
