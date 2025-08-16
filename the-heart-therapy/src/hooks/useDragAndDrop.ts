'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Position } from '@/types/window';

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
  
  // Sync position with external changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);
  const dragRef = useRef<{ 
    startX: number; 
    startY: number; 
    startPos: Position;
    element: HTMLElement | null;
  } | null>(null);
  const constraintsRef = useRef(options.constraints);

  useEffect(() => {
    constraintsRef.current = options.constraints;
  }, [options.constraints]);

  const constrainPosition = useCallback((pos: Position): Position => {
    const constraints = constraintsRef.current;
    if (!constraints) return pos;
    
    const { minX, maxX, minY, maxY } = constraints;
    
    // Ensure constraints are valid before applying them
    if (maxX <= minX || maxY <= minY) {
      return pos; // Return unconstrained position if constraints are invalid
    }
    
    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y)),
    };
  }, []);

  const startDrag = useCallback((clientX: number, clientY: number, element: HTMLElement) => {
    setIsDragging(true);
    
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      startPos: position,
      element,
    };
    
    let currentPosition = { ...position };
    let lastDeltaX = 0;
    let lastDeltaY = 0;
    
    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;

      const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      lastDeltaX = clientX - dragRef.current.startX;
      lastDeltaY = clientY - dragRef.current.startY;
      
      currentPosition = {
        x: dragRef.current.startPos.x + lastDeltaX,
        y: dragRef.current.startPos.y + lastDeltaY,
      };

      if (dragRef.current.element) {
        dragRef.current.element.style.transform = `translate(${lastDeltaX}px, ${lastDeltaY}px)`;
      }
    };

    const endHandler = () => {
      if (!dragRef.current) return;
      
      // Use the last calculated position, but apply constraints only at the end
      const finalPosition = constrainPosition(currentPosition);
      
      if (dragRef.current.element) {
        dragRef.current.element.style.transform = '';
      }
      
      setPosition(finalPosition);
      options.onDrag?.(finalPosition);
      
      setIsDragging(false);
      dragRef.current = null;
      options.onDragEnd?.();
      
      document.removeEventListener('mousemove', moveHandler as any);
      document.removeEventListener('mouseup', endHandler);
      document.removeEventListener('touchmove', moveHandler as any);
      document.removeEventListener('touchend', endHandler);
    };
    
    document.addEventListener('mousemove', moveHandler as any);
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchmove', moveHandler as any, { passive: false });
    document.addEventListener('touchend', endHandler);
    
    options.onDragStart?.();
  }, [position, options, constrainPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = options.elementRef?.current || (e.target as HTMLElement).closest('[data-draggable]');
    if (element) {
      startDrag(e.clientX, e.clientY, element as HTMLElement);
    }
  }, [startDrag]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = options.elementRef?.current || (e.target as HTMLElement).closest('[data-draggable]');
    if (element && e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY, element as HTMLElement);
    }
  }, [startDrag]);

  return {
    position,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    setPosition,
  };
}
