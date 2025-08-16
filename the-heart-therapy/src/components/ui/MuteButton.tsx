'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '@/contexts/SoundEffectsContext';
import { cn } from '@/utils/helpers';

export default function MuteButton() {
  const { isMuted, toggleMute } = useSoundEffects();

  const handleClick = () => {
    toggleMute();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-200',
        'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30',
        'shadow-lg backdrop-blur-sm border border-gray-200/50',
        isMuted 
          ? 'bg-red-100 hover:bg-red-200 text-red-600 border-red-200' 
          : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
      )}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <VolumeX size={20} />
      ) : (
        <Volume2 size={20} />
      )}
    </button>
  );
}
