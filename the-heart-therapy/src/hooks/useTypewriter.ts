'use client';

import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number; // milliseconds per character
  startDelay?: number; // delay before starting
  onComplete?: () => void;
}

export function useTypewriter({ 
  text, 
  speed = 30, 
  startDelay = 0, 
  onComplete 
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);

    if (!text) return;

    const startTimeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= text.length) {
            clearInterval(typeInterval);
            setIsComplete(true);
            onComplete?.();
            return prevIndex;
          }
          
          setDisplayedText(text.slice(0, prevIndex + 1));
          return prevIndex + 1;
        });
      }, speed);

      return () => clearInterval(typeInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, onComplete]);

  return {
    displayedText,
    isComplete,
    progress: text.length > 0 ? currentIndex / text.length : 0
  };
}
