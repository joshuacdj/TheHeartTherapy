import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavigationType } from '@/types/window';
import { Position } from '@/types/position';

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

export function formatTitle(type: NavigationType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}