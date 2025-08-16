'use client';

import { X, Minus } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface WindowControlsProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onMinimize?: React.MouseEventHandler<HTMLButtonElement>;
  showMinimize?: boolean;
  isMinimized?: boolean;
}

export default function WindowControls({ onClose, onMinimize, showMinimize = false, isMinimized = false }: WindowControlsProps) {
  const { playMinimize, playMaximize, playClose } = useSoundEffects();

  const handleMinimizeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play appropriate sound based on current state
    if (isMinimized) {
      playMaximize();
    } else {
      playMinimize();
    }
    
    // Call the original minimize handler
    onMinimize?.(e);
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play close sound
    playClose();
    
    // Call the original close handler
    onClose(e);
  };

  return (
    <div className="flex items-center gap-2">
      {showMinimize && onMinimize && (
        <button
          onClick={handleMinimizeClick}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            'w-6 h-6 rounded-full bg-yellow-400 hover:bg-yellow-500',
            'flex items-center justify-center transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-yellow-300'
          )}
          aria-label={isMinimized ? "Maximize window" : "Minimize window"}
        >
          <Minus size={12} className="text-yellow-800" />
        </button>
      )}
      
      <button
        onClick={handleCloseClick}
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
