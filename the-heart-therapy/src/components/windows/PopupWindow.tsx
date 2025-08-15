'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
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

export default function PopupWindow({ window: windowState, children, className }: PopupWindowProps) {
  const { dispatch } = useWindows();
  const windowRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({
    minX: 0,
    maxX: 1200,
    minY: 0,
    maxY: 800,
  });
  
  // Set constraints after hydration to avoid SSR mismatch
  useEffect(() => {
    const updateConstraints = () => {
      setConstraints({
        minX: 0,
        maxX: window.innerWidth - windowState.size.width,
        minY: 0,
        maxY: window.innerHeight - windowState.size.height,
      });
    };
    
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [windowState.size.width, windowState.size.height]);
  
  const { position, isDragging, handleMouseDown } = useDragAndDrop(
    windowState.position,
    {
      onDrag: (newPosition) => {
        dispatch({ type: 'UPDATE_POSITION', windowId: windowState.id, position: newPosition });
      },
      onDragStart: () => {
        dispatch({ type: 'FOCUS_WINDOW', windowId: windowState.id });
      },
      constraints,
      elementRef: windowRef,
    }
  );

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLOSE_WINDOW', windowId: windowState.id });
  };

  const handleMinimize: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch({ type: 'MINIMIZE_WINDOW', windowId: windowState.id });
  };

  const handleWindowClick = () => {
    if (!windowState.isFocused) {
      dispatch({ type: 'FOCUS_WINDOW', windowId: windowState.id });
    }
  };

  return (
    <AnimatePresence>
      {windowState.isOpen && (
        <motion.div
          ref={windowRef}
          data-draggable
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: windowState.isMinimized ? 0.3 : 1, 
            scale: windowState.isMinimized ? 0.8 : 1 
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed bg-white rounded-3xl shadow-xl border border-border/10',
            'backdrop-blur-sm',
            windowState.isFocused ? 'shadow-2xl' : 'shadow-lg',
            isDragging && 'cursor-grabbing select-none',
            className
          )}
          style={{
            left: position.x,
            top: position.y,
            width: windowState.size.width,
            height: windowState.size.height,
            zIndex: windowState.zIndex,
            willChange: isDragging ? 'transform' : 'auto',
          }}
          onClick={handleWindowClick}
        >
          <WindowHeader
            title={windowState.type}
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
