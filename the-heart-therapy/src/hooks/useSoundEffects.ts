'use client';

import { useCallback, useRef } from 'react';

interface SoundEffectsHook {
  playMinimize: () => void;
  playMaximize: () => void;
  playClose: () => void;
  playHover: () => void;
  playClick: () => void;
  playScroll: () => void;
  playAccordionOpen: () => void;
  playAccordionClose: () => void;
}

export function useSoundEffects(): SoundEffectsHook {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const createAudio = useCallback((soundPath: string): HTMLAudioElement | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const audio = new Audio(soundPath);
      audio.preload = 'auto';
      audio.volume = 0.3; // Set volume to 30% to be non-intrusive
      return audio;
    } catch (error) {
      console.warn(`Failed to load sound: ${soundPath}`, error);
      return null;
    }
  }, []);

  const playSound = useCallback((soundKey: string, soundPath: string) => {
    if (!audioRefs.current[soundKey]) {
      audioRefs.current[soundKey] = createAudio(soundPath);
    }
    
    const audio = audioRefs.current[soundKey];
    if (audio) {
      try {
        // Reset to beginning and play
        audio.currentTime = 0;
        audio.play().catch(error => {
          // Ignore autoplay policy errors
          console.debug(`Audio play prevented: ${soundKey}`, error);
        });
      } catch (error) {
        console.warn(`Failed to play sound: ${soundKey}`, error);
      }
    }
  }, [createAudio]);

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

  return {
    playMinimize,
    playMaximize,
    playClose,
    playHover,
    playClick,
    playScroll,
    playAccordionOpen,
    playAccordionClose,
  };
}
