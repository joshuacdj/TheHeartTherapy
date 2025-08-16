'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { content } from '@/data/content';
import { cn } from '@/utils/helpers';
import { useSoundEffects } from '@/contexts/SoundEffectsContext';

export default function FAQSection() {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const { playAccordionOpen, playAccordionClose } = useSoundEffects();

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = new Set(openQuestions);
    const isCurrentlyOpen = newOpenQuestions.has(index);
    
    if (isCurrentlyOpen) {
      // Closing accordion
      playAccordionClose();
      newOpenQuestions.delete(index);
    } else {
      // Opening accordion
      playAccordionOpen();
      newOpenQuestions.add(index);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center font-patrick-hand">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {content.faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(index)}
              className={cn(
                'w-full px-6 py-4 text-left font-bold italic text-foreground',
                'hover:bg-gray-50 transition-colors flex items-center justify-between',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 font-ubuntu-mono'
              )}
            >
              <span>{item.question}</span>
              {openQuestions.has(index) ? (
                <ChevronUp size={20} className="text-gray-500 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown size={20} className="text-gray-500 flex-shrink-0 ml-4" />
              )}
            </button>
            
            {openQuestions.has(index) && (
              <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                <p className="text-secondary leading-relaxed font-ubuntu-mono">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
