'use client';

import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WindowHeader from './WindowHeader';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useWindows } from '@/contexts/WindowContext';
import { WindowState } from '@/types/window';
import { cn } from '@/utils/helpers';

interface PopupWindowProps {
  window: WindowState;
  children: ReactNode;
  className?: string;
}

export default function PopupWindow({ window, children, className }: PopupWindowProps) {
  const { dispatch } = useWindows();
  
  const { position, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragAndDrop(
    window.position,
    {
      onDrag: (newPosition) => {
        dispatch({ type: 'UPDATE_POSITION', windowId: window.id, position: newPosition });
      },
      onDragStart: () => {
        dispatch({ type: 'FOCUS_WINDOW', windowId: window.id });
      },
      constraints: {
        minX: 0,
        maxX: typeof globalThis !== 'undefined' && globalThis.innerWidth ? globalThis.innerWidth - window.size.width : 1200,
        minY: 0,
        maxY: typeof globalThis !== 'undefined' && globalThis.innerHeight ? globalThis.innerHeight - window.size.height : 800,
      },
    }
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_WINDOW', windowId: window.id });
  };

  const handleMinimize = () => {
    dispatch({ type: 'MINIMIZE_WINDOW', windowId: window.id });
  };

  const handleWindowClick = () => {
    if (!window.isFocused) {
      dispatch({ type: 'FOCUS_WINDOW', windowId: window.id });
    }
  };

  return (
    <AnimatePresence>
      {window.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: window.isMinimized ? 0.3 : 1, 
            scale: window.isMinimized ? 0.8 : 1 
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed bg-white rounded-3xl shadow-xl border border-border/10',
            'backdrop-blur-sm transition-all duration-200',
            window.isFocused ? 'shadow-2xl' : 'shadow-lg',
            isDragging && 'cursor-grabbing',
            className
          )}
          style={{
            left: position.x,
            top: position.y,
            width: window.size.width,
            height: window.size.height,
            zIndex: window.zIndex,
          }}
          onClick={handleWindowClick}
        >
          <WindowHeader
            title={window.type}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMouseDown={handleMouseDown}
          />
          
          <div className="p-6 overflow-auto" style={{ height: 'calc(100% - 60px)' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
