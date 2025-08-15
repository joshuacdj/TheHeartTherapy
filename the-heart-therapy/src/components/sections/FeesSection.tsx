'use client';

import { content } from '@/data/content';

export default function FeesSection() {
  const { fees } = content;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Session Fees
      </h2>
      
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
        <div className="text-3xl font-bold text-primary mb-2">
          {fees.price}
        </div>
        <p className="text-secondary text-sm">
          Professional therapy sessions
        </p>
      </div>

      <div className="text-left space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3">
            {fees.question}
          </h3>
          <p className="text-secondary text-sm leading-relaxed mb-4">
            {fees.answer}
          </p>
        </div>

        <div className="space-y-4">
          {fees.benefits.map((benefit, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-foreground text-sm mb-2">
                {benefit.title}
              </h4>
              <p className="text-secondary text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-primary font-medium">
            {fees.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
}
