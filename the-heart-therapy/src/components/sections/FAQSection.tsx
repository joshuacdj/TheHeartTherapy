'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { content } from '@/data/content';
import { cn } from '@/utils/helpers';

export default function FAQSection() {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(index)) {
      newOpenQuestions.delete(index);
    } else {
      newOpenQuestions.add(index);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {content.faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(index)}
              className={cn(
                'w-full px-6 py-4 text-left font-medium text-foreground',
                'hover:bg-gray-50 transition-colors flex items-center justify-between',
                'focus:outline-none focus:ring-2 focus:ring-primary/20'
              )}
            >
              <span className="text-sm">{item.question}</span>
              {openQuestions.has(index) ? (
                <ChevronUp size={20} className="text-gray-500 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown size={20} className="text-gray-500 flex-shrink-0 ml-4" />
              )}
            </button>
            
            {openQuestions.has(index) && (
              <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                <p className="text-secondary text-sm leading-relaxed">
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
