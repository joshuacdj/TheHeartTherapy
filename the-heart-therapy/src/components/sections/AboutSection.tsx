'use client';

import { content } from '@/data/content';

export default function AboutSection() {
  const { about } = content;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-patrick-hand">
          {about.greeting}
        </h2>
        <h3 className="text-xl text-primary font-semibold mb-4 font-patrick-hand">
          {about.name}
        </h3>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-foreground leading-relaxed whitespace-pre-line font-ubuntu-mono">
          {about.description}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold italic text-foreground mb-2 font-ubuntu-mono">
            {about.specialization.title}
          </h4>
          <p className="text-secondary leading-relaxed whitespace-pre-line font-ubuntu-mono">
            {about.specialization.description}
          </p>
        </div>

        <div>
          <h4 className="font-bold italic text-foreground mb-2 font-ubuntu-mono">
            {about.approach.title}
          </h4>
          <p className="text-secondary leading-relaxed font-ubuntu-mono">
            {about.approach.description}
          </p>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-bold italic text-foreground mb-4 font-ubuntu-mono">
          {about.qualifications.title}
        </h4>
        
        <div className="space-y-4">
          {/* Education */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-secondary font-ubuntu-mono text-sm whitespace-pre-line">
              {about.qualifications.education}
            </p>
          </div>

          {/* Professional Memberships */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-secondary font-ubuntu-mono text-sm whitespace-pre-line">
              {about.qualifications.professional}
            </p>
          </div>

          {/* Specialized Training */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-secondary font-ubuntu-mono text-sm whitespace-pre-line">
              {about.qualifications.training}
            </p>
          </div>

          {/* Professional Development */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-secondary font-ubuntu-mono text-sm whitespace-pre-line">
              {about.qualifications.commitment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
