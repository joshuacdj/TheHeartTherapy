'use client';

import { Mail } from 'lucide-react';
import { content } from '@/data/content';

export default function ContactSection() {
  const { contact } = content;

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center font-patrick-hand">
        Get In Touch
      </h2>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail size={24} className="text-primary" />
          <span className="text-secondary font-ubuntu-mono text-lg">{contact.message}</span>
        </div>
        <a 
          href={`mailto:${contact.email}`}
          className="text-primary font-medium hover:underline font-ubuntu-mono text-xl"
        >
          {contact.email}
        </a>
      </div>
    </div>
  );
}
