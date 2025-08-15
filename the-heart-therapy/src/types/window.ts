import { NavigationType } from './navigation';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  type: NavigationType;
  isOpen: boolean;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isFocused: boolean;
}

export interface WindowManagerState {
  windows: WindowState[];
  highestZIndex: number;
  focusedWindowId: string | null;
}

export interface DragState {
  isDragging: boolean;
  dragOffset: Position;
  dragConstraints: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}
