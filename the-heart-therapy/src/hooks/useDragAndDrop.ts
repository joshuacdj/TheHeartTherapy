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

          if (dragRef.current.element) {
            dragRef.current.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          }
        };

    const mouseUpHandler = () => {
      if (!dragRef.current) return;
      
      if (dragRef.current.element) {
        dragRef.current.element.style.transform = '';
      }
      
      setPosition(currentPosition);
      options.onDrag?.(currentPosition);
      
      setIsDragging(false);
      dragRef.current = null;
      options.onDragEnd?.();
      
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    
    options.onDragStart?.();
  }, [position, options, constrainPosition]);

  return {
    position,
    isDragging,
    handleMouseDown,
    setPosition,
  };
}
