'use client';

import { ReactNode } from 'react';
import WindowControls from './WindowControls';
import { cn, formatTitle } from '@/utils/helpers';
import { NavigationType } from '@/types/window';

interface WindowHeaderProps {
  title: NavigationType;
  onClose: () => void;
  onMinimize?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  children?: ReactNode;
  className?: string;
}

export default function WindowHeader({ 
  title, 
  onClose, 
  onMinimize, 
  onMouseDown,
  children,
  className 
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 cursor-move select-none',
        'rounded-t-3xl border-b border-foreground',
        className
      )}
      style={{
        background: 'linear-gradient(to bottom, #D9D9D9, #B7B7B7)'
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-3">
        <span className="text-foreground font-medium">{formatTitle(title)}</span>
        {children}
      </div>
      
      <WindowControls 
        onClose={onClose}
        onMinimize={onMinimize}
        showMinimize={!!onMinimize}
      />
    </div>
  );
}
