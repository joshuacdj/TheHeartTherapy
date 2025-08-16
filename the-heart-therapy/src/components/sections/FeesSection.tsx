'use client';

import { content } from '@/data/content';

export default function FeesSection() {
  const { fees } = content;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-foreground mb-6 font-patrick-hand">
        Session Fees
      </h2>
      
      <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="text-3xl font-bold text-blue-700 mb-2 font-ubuntu-mono">
          {fees.price}
        </div>
      </div>

      <div className="text-left space-y-6">
        <div>
          <h3 className="font-bold italic text-foreground mb-3 font-ubuntu-mono">
            {fees.question}
          </h3>
          <p className="text-secondary leading-relaxed mb-4 font-ubuntu-mono">
            {fees.answer}
          </p>
        </div>

        <div className="space-y-4">
          {fees.benefits.map((benefit, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold italic text-foreground mb-2 font-ubuntu-mono">
                {benefit.title}
              </h4>
              <p className="text-secondary leading-relaxed font-ubuntu-mono">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-primary font-medium font-ubuntu-mono">
            {fees.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
}
