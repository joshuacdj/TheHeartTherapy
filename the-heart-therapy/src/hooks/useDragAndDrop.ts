'use client';

import { useState, useCallback, useRef } from 'react';
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
}

export function useDragAndDrop(initialPosition: Position, options: UseDragOptions = {}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPos: Position } | null>(null);

  const constrainPosition = useCallback((pos: Position): Position => {
    if (!options.constraints) return pos;
    
    const { minX, maxX, minY, maxY } = options.constraints;
    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y)),
    };
  }, [options.constraints]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: position,
    };
    
    options.onDragStart?.();
  }, [position, options]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    const newPosition = constrainPosition({
      x: dragRef.current.startPos.x + deltaX,
      y: dragRef.current.startPos.y + deltaY,
    });

    setPosition(newPosition);
    options.onDrag?.(newPosition);
  }, [isDragging, constrainPosition, options]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    dragRef.current = null;
    options.onDragEnd?.();
  }, [isDragging, options]);

  return {
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setPosition,
  };
}
