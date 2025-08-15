'use client';

import { content } from '@/data/content';

export default function AboutSection() {
  const { about } = content;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {about.greeting}
        </h2>
        <h3 className="text-lg text-primary font-semibold mb-4">
          {about.name}
        </h3>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {about.description}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">
            {about.approach.title}
          </h4>
          <p className="text-secondary text-sm leading-relaxed">
            {about.approach.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">
            {about.specialization.title}
          </h4>
          <p className="text-secondary text-sm leading-relaxed">
            {about.specialization.description}
          </p>
        </div>
      </div>
    </div>
  );
}
