'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-white text-foreground',
        'transition-colors duration-300',
        className
      )}
      style={{ backgroundColor: '#ffffff' }} // Force white background inline
    >
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
