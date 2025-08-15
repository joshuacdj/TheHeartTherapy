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

export function getIconBasedPosition(type: NavigationType): Position {
  // Calculate position based on icon grid layout
  // Grid is 2x2 on mobile, 1x4 on desktop
  // About: position 0, FAQ: position 1, Fees: position 2, Contact: position 3
  
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
    // 2x2 grid layout on mobile
    const row = Math.floor(gridIndex / 2);
    const col = gridIndex % 2;
    return {
      x: 50 + (col * 200), // Closer horizontal positioning for mobile
      y: 150 + (row * 50), // Keep within screen, slight vertical offset per row
    };
  } else {
    // 1x4 grid layout on desktop
    const col = gridIndex;
    // Adjust Contact window to stay within screen bounds
    const baseX = col === 3 ? 400 : 150 + (col * 180); // Contact (index 3) gets special positioning
    return {
      x: baseX,
      y: 120, // Keep in upper portion of screen
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