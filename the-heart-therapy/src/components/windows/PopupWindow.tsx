'use client';

import { ReactNode, useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WindowHeader from './WindowHeader';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useWindows } from '@/contexts/WindowContext';
import { WindowState } from '@/types/window';
import { cn } from '@/utils/helpers';
import { useSoundEffects } from '@/contexts/SoundEffectsContext';

interface PopupWindowProps {
  window: WindowState;
  children: ReactNode;
  className?: string;
}

export default function PopupWindow({ window: windowState, children, className }: PopupWindowProps) {
  const { dispatch } = useWindows();
  const { playScroll } = useSoundEffects();
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [constraints, setConstraints] = useState({
    minX: 0,
    maxX: 1200,
    minY: 0,
    maxY: 800,
  });
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Check if content is scrollable
  const checkScrollIndicator = useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const hasMoreContent = scrollHeight > clientHeight;
      const isNotAtBottom = scrollTop < scrollHeight - clientHeight - 10; // 10px threshold
      setShowScrollIndicator(hasMoreContent && isNotAtBottom);
    }
  }, []);

  // Set constraints after hydration to avoid SSR mismatch
  useEffect(() => {
    const updateConstraints = () => {
      // Get the actual viewport dimensions (considering CSS scaling)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate safe boundaries with some padding
      const padding = 20;
      const maxX = Math.max(padding, viewportWidth - windowState.size.width - padding);
      const maxY = Math.max(padding, viewportHeight - windowState.size.height - padding);
      
      setConstraints({
        minX: -padding, // Allow slightly off-screen for better UX
        maxX: maxX,
        minY: 0,
        maxY: maxY,
      });
    };
    
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [windowState.size.width, windowState.size.height]);

  // Check scroll indicator on mount and content changes
  useEffect(() => {
    checkScrollIndicator();
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', checkScrollIndicator);
      return () => contentElement.removeEventListener('scroll', checkScrollIndicator);
    }
  }, [checkScrollIndicator, children]);

  // Scroll sound management during drag
  const startScrollSound = useCallback(() => {
    if (scrollIntervalRef.current) return; // Already playing
    
    // Play immediately
    playScroll();
    
    // Then play every 500ms while dragging (0.5 second delay)
    scrollIntervalRef.current = setInterval(() => {
      playScroll();
    }, 500);
  }, [playScroll]);

  const stopScrollSound = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  // Cleanup scroll sound on unmount
  useEffect(() => {
    return () => {
      stopScrollSound();
    };
  }, [stopScrollSound]);
  
  const { position, isDragging, handleMouseDown, handleTouchStart } = useDragAndDrop(
    windowState.position,
    {
      onDrag: (newPosition) => {
        dispatch({ type: 'UPDATE_POSITION', windowId: windowState.id, position: newPosition });
      },
      onDragStart: () => {
        dispatch({ type: 'FOCUS_WINDOW', windowId: windowState.id });
        startScrollSound();
      },
      onDragEnd: () => {
        stopScrollSound();
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
            onTouchStart={handleTouchStart}
            isMinimized={windowState.isMinimized}
          />
          
          <div className="relative" style={{ height: 'calc(100% - 60px)' }}>
            <div 
              ref={contentRef}
              className="p-6 overflow-auto h-full"
            >
              {children}
            </div>
            
            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                {/* Fade gradient */}
                <div 
                  className="h-8 bg-gradient-to-t from-white via-white/90 to-transparent"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)'
                  }}
                />
                {/* Animated scroll indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center text-gray-500">
                    <div className="text-xs font-medium mb-1 font-ubuntu-mono">Scroll for more</div>
                    <div className="animate-bounce">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M7 13l3 3 3-3"/>
                        <path d="M7 6l3 3 3-3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
