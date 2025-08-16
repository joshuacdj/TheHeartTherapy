'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { WindowState, NavigationType } from '@/types/window';
import { generateWindowId, getIconBasedPosition } from '@/utils/helpers';
import { WINDOW_CONFIG } from '@/utils/constants';

interface WindowContextState {
  windows: WindowState[];
  highestZIndex: number;
}

type WindowAction =
  | { type: 'OPEN_WINDOW'; windowType: NavigationType }
  | { type: 'CLOSE_WINDOW'; windowId: string }
  | { type: 'FOCUS_WINDOW'; windowId: string }
  | { type: 'UPDATE_POSITION'; windowId: string; position: { x: number; y: number } }
  | { type: 'MINIMIZE_WINDOW'; windowId: string };

const WindowContext = createContext<{
  state: WindowContextState;
  dispatch: (action: WindowAction) => void;
} | null>(null);

const windowReducer = (state: WindowContextState, action: WindowAction): WindowContextState => {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const existingWindow = state.windows.find(w => w.type === action.windowType && w.isOpen);
      if (existingWindow) {
        return {
          ...state,
          highestZIndex: state.highestZIndex + 1,
          windows: state.windows.map(w =>
            w.id === existingWindow.id
              ? { ...w, zIndex: state.highestZIndex + 1, isFocused: true, isMinimized: false }
              : { ...w, isFocused: false }
          ),
        };
      }

      const openWindowsCount = state.windows.filter(w => w.isOpen).length;
      
      const basePosition = getIconBasedPosition(action.windowType);
      const position = {
        x: Math.max(0, basePosition.x + (openWindowsCount * WINDOW_CONFIG.OFFSET_INCREMENT)),
        y: Math.max(0, basePosition.y + (openWindowsCount * WINDOW_CONFIG.OFFSET_INCREMENT)),
      };

      const windowSize = WINDOW_CONFIG.DEFAULT_SIZE;

      const newWindow: WindowState = {
        id: generateWindowId(action.windowType),
        type: action.windowType,
        isOpen: true,
        position,
        size: windowSize,
        zIndex: state.highestZIndex + 1,
        isMinimized: false,
        isFocused: true,
      };

      return {
        ...state,
        highestZIndex: state.highestZIndex + 1,
        windows: [
          ...state.windows.map(w => ({ ...w, isFocused: false })),
          newWindow,
        ],
      };
    }

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.windowId),
      };

    case 'FOCUS_WINDOW':
      return {
        ...state,
        highestZIndex: state.highestZIndex + 1,
        windows: state.windows.map(w =>
          w.id === action.windowId
            ? { ...w, zIndex: state.highestZIndex + 1, isFocused: true }
            : { ...w, isFocused: false }
        ),
      };

    case 'UPDATE_POSITION': {
      const windowIndex = state.windows.findIndex(w => w.id === action.windowId);
      if (windowIndex === -1) return state;
      
      const window = state.windows[windowIndex];
      if (window.position.x === action.position.x && window.position.y === action.position.y) {
        return state; // No change needed
      }
      
      const newWindows = [...state.windows];
      newWindows[windowIndex] = { ...window, position: action.position };
      
      return {
        ...state,
        windows: newWindows,
      };
    }

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, isMinimized: !w.isMinimized } : w
        ),
      };

    default:
      return state;
  }
};

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, {
    windows: [],
    highestZIndex: WINDOW_CONFIG.MIN_Z_INDEX,
  });

  return (
    <WindowContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within WindowProvider');
  }
  return context;
}
