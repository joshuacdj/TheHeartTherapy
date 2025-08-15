import { Position, Size, Bounds } from '@/types/position';

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getWindowBounds = (
  windowSize: Size,
  containerSize: Size
): Bounds => {
  return {
    minX: 0,
    maxX: containerSize.width - windowSize.width,
    minY: 0,
    maxY: containerSize.height - windowSize.height,
  };
};

export const constrainPosition = (
  position: Position,
  bounds: Bounds
): Position => {
  return {
    x: clamp(position.x, bounds.minX, bounds.maxX),
    y: clamp(position.y, bounds.minY, bounds.maxY),
  };
};

export const generateWindowId = (type: string): string => {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateCascadePosition = (
  basePosition: Position,
  index: number,
  offset: number = 30
): Position => {
  return {
    x: basePosition.x + index * offset,
    y: basePosition.y + index * offset,
  };
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
