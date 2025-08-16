import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavigationType } from '@/types/window';
import { Position } from '@/types/window';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWindowId(type: NavigationType): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateCascadePosition(
  basePosition: Position,
  windowCount: number,
  offset: number
): Position {
  return {
    x: basePosition.x + (windowCount * offset),
    y: basePosition.y + (windowCount * offset),
  };
}

export function getIconBasedPosition(type: NavigationType): Position {
  const iconPositions = {
    about: { gridIndex: 0 },
    faq: { gridIndex: 1 },
    fees: { gridIndex: 2 },
    contact: { gridIndex: 3 }
  };
  
  const { gridIndex } = iconPositions[type];
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const isMobile = screenWidth < 768;
  
  if (isMobile) {
    const row = Math.floor(gridIndex / 2);
    const col = gridIndex % 2;
    return {
      x: 50 + (col * 200),
      y: 150 + (row * 50),
    };
  } else {
    const col = gridIndex;
    const baseX = col === 3 ? 400 : 150 + (col * 180);
    return {
      x: baseX,
      y: 120,
    };
  }
}

export function formatTitle(type: NavigationType): string {
  if (type === 'faq') {
    return 'FAQ';
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}