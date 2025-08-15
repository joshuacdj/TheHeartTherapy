'use client';

import { X, Minus } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface WindowControlsProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  showMinimize?: boolean;
}

export default function WindowControls({ onClose, onMinimize, showMinimize = false }: WindowControlsProps) {
  return (
    <div className="flex items-center gap-2">
      {showMinimize && onMinimize && (
        <button
          onClick={onMinimize}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            'w-6 h-6 rounded-full bg-yellow-400 hover:bg-yellow-500',
            'flex items-center justify-center transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-yellow-300'
          )}
          aria-label="Minimize window"
        >
          <Minus size={12} className="text-yellow-800" />
        </button>
      )}
      
      <button
        onClick={onClose}
        onMouseDown={(e) => e.stopPropagation()}
        className={cn(
          'w-6 h-6 rounded-full bg-red-400 hover:bg-red-500',
          'flex items-center justify-center transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-red-300'
        )}
        aria-label="Close window"
      >
        <X size={12} className="text-red-800" />
      </button>
    </div>
  );
}
