'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Position } from '@/types/position';

interface UseDragOptions {
  onDrag?: (position: Position) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  constraints?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  elementRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

export function useDragAndDrop(initialPosition: Position, options: UseDragOptions = {}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ 
    startX: number; 
    startY: number; 
    startPos: Position;
    element: HTMLElement | null;
  } | null>(null);
  const constraintsRef = useRef(options.constraints);

  // Update constraints ref when they change
  useEffect(() => {
    constraintsRef.current = options.constraints;
  }, [options.constraints]);

  const constrainPosition = useCallback((pos: Position): Position => {
    const constraints = constraintsRef.current;
    if (!constraints) return pos;
    
    const { minX, maxX, minY, maxY } = constraints;
    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y)),
    };
  }, []);



  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = options.elementRef?.current || (e.target as HTMLElement).closest('[data-draggable]');
    
    setIsDragging(true);
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: position,
      element: element as HTMLElement,
    };
    
    // Create fresh handlers to avoid stale closure issues
    let currentPosition = { ...position };
    
            const mouseMoveHandler = (moveEvent: MouseEvent) => {
          if (!dragRef.current) {
            return;
          }

          const deltaX = moveEvent.clientX - dragRef.current.startX;
          const deltaY = moveEvent.clientY - dragRef.current.startY;
          
          currentPosition = constrainPosition({
            x: dragRef.current.startPos.x + deltaX,
            y: dragRef.current.startPos.y + deltaY,
          });

          // Direct DOM manipulation for immediate visual feedback
          // Apply transform as offset from original position, not absolute position
          if (dragRef.current.element) {
            dragRef.current.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          }
        };

    const mouseUpHandler = () => {
      if (!dragRef.current) return;
      
      // Reset transform and rely on position state
      if (dragRef.current.element) {
        dragRef.current.element.style.transform = '';
      }
      
      // Update final position
      setPosition(currentPosition);
      options.onDrag?.(currentPosition);
      
      setIsDragging(false);
      dragRef.current = null;
      options.onDragEnd?.();
      
      // Clean up event listeners
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    
    // Add event listeners immediately for responsiveness
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    
    options.onDragStart?.();
  }, [position, options, constrainPosition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Event listeners are cleaned up inline in mouseUpHandler
    };
  }, []);

  return {
    position,
    isDragging,
    handleMouseDown,
    setPosition,
  };
}
