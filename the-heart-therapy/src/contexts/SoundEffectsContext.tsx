'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface SoundEffectsContextValue {
  playMinimize: () => void;
  playMaximize: () => void;
  playClose: () => void;
  playHover: () => void;
  playClick: () => void;
  playScroll: () => void;
  playAccordionOpen: () => void;
  playAccordionClose: () => void;

  isMuted: boolean;
  toggleMute: () => void;
}

const SoundEffectsContext = createContext<SoundEffectsContextValue | undefined>(undefined);

interface SoundEffectsProviderProps {
  children: React.ReactNode;
}

export function SoundEffectsProvider({ children }: SoundEffectsProviderProps) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [isMuted, setIsMuted] = useState(false);

  const createAudio = useCallback((soundPath: string): HTMLAudioElement | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const audio = new Audio(soundPath);
      audio.preload = 'auto';
      audio.volume = 0.3;
      return audio;
    } catch (error) {
      console.warn(`Failed to load sound: ${soundPath}`, error);
      return null;
    }
  }, []);

  const playSound = useCallback((soundKey: string, soundPath: string) => {
    if (isMuted) return;
    
    if (!audioRefs.current[soundKey]) {
      audioRefs.current[soundKey] = createAudio(soundPath);
    }
    
    const audio = audioRefs.current[soundKey];
    if (audio) {
      try {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.debug(`Audio play prevented: ${soundKey}`, error);
        });
      } catch (error) {
        console.warn(`Failed to play sound: ${soundKey}`, error);
      }
    }
  }, [createAudio, isMuted]);

  const playMinimize = useCallback(() => {
    playSound('minimize', '/sounds/Minimize.mp3');
  }, [playSound]);

  const playMaximize = useCallback(() => {
    playSound('maximize', '/sounds/Maximize.mp3');
  }, [playSound]);

  const playClose = useCallback(() => {
    playSound('close', '/sounds/Close.mp3');
  }, [playSound]);

  const playHover = useCallback(() => {
    playSound('hover', '/sounds/Hover.mp3');
  }, [playSound]);

  const playClick = useCallback(() => {
    playSound('click', '/sounds/Click.mp3');
  }, [playSound]);

  const playScroll = useCallback(() => {
    playSound('scroll', '/sounds/Scroll.mp3');
  }, [playSound]);

  const playAccordionOpen = useCallback(() => {
    playSound('accordionOpen', '/sounds/AccordionOpen.mp3');
  }, [playSound]);

  const playAccordionClose = useCallback(() => {
    playSound('accordionClose', '/sounds/AccordionClose.mp3');
  }, [playSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const value: SoundEffectsContextValue = {
    playMinimize,
    playMaximize,
    playClose,
    playHover,
    playClick,
    playScroll,
    playAccordionOpen,
    playAccordionClose,
    isMuted,
    toggleMute,
  };

  return (
    <SoundEffectsContext.Provider value={value}>
      {children}
    </SoundEffectsContext.Provider>
  );
}

export function useSoundEffects(): SoundEffectsContextValue {
  const context = useContext(SoundEffectsContext);
  if (context === undefined) {
    throw new Error('useSoundEffects must be used within a SoundEffectsProvider');
  }
  return context;
}
