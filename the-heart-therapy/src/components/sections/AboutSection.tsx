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
            {about.approach.title}
          </h4>
          <p className="text-secondary leading-relaxed font-ubuntu-mono">
            {about.approach.description}
          </p>
        </div>

        <div>
          <h4 className="font-bold italic text-foreground mb-2 font-ubuntu-mono">
            {about.specialization.title}
          </h4>
          <p className="text-secondary leading-relaxed font-ubuntu-mono">
            {about.specialization.description}
          </p>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-bold italic text-foreground mb-4 font-ubuntu-mono">
          Qualifications & Credentials
        </h4>
        
        <div className="space-y-4">
          {/* Education */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-bold text-foreground mb-2 font-ubuntu-mono text-sm">
              Education
            </h5>
            <ul className="space-y-1 text-secondary font-ubuntu-mono text-sm">
              <li>• Master of Counselling, Executive Counselling & Training Academy (ECTA)</li>
              <li>• Post Graduate Diploma in Counselling Psychology, College of Allied Educators</li>
              <li>• BSc in Business Management</li>
            </ul>
          </div>

          {/* Professional Memberships */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-bold text-foreground mb-2 font-ubuntu-mono text-sm">
              Professional Memberships
            </h5>
            <p className="text-secondary font-ubuntu-mono text-sm">
              • Provisional Clinical Member (PCM), Singapore Association for Counselling (SAC)
            </p>
          </div>

          {/* Specialized Training */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-bold text-foreground mb-2 font-ubuntu-mono text-sm">
              Specialized Training
            </h5>
            <ul className="space-y-1 text-secondary font-ubuntu-mono text-sm">
              <li>• Choice Theory Reality Therapy (CTRT) – Basic Intensive Training (William Glasser Institute Singapore)</li>
              <li>• Acceptance & Commitment Therapy (ACT) (Certification)</li>
            </ul>
          </div>

          {/* Professional Development */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-bold text-foreground mb-2 font-ubuntu-mono text-sm">
              Commitment to Excellence
            </h5>
            <p className="text-secondary font-ubuntu-mono text-sm mb-3">
              Committed to continuous learning through training, research, and professional development to ensure high-quality care for my clients
            </p>
          </div>

          {/* Experience */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-bold text-foreground mb-2 font-ubuntu-mono text-sm">
              Clinical Experience
            </h5>
            <p className="text-secondary font-ubuntu-mono text-sm mb-3">
              Supported over <span className="font-bold text-blue-700">100 clients</span>, including:
            </p>
            <ul className="space-y-1 text-secondary font-ubuntu-mono text-sm">
              <li>• Youths & young adults in university and secondary schools (13-25)</li>
              <li>• Corporate clients managing workplace stress, career transitions, and burnout</li>
              <li>• Children (7-16) and parents in private practice</li>
            </ul>
            <p className="text-secondary font-ubuntu-mono text-sm mt-3">
              Provided close clinical supervision, ensuring high-quality, evidence-based care
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
