export const content = {
  hero: {
    greeting: "hi! i'm hanyu",
    subtitle: 'professional counsellor of 3 years (Master of Counselling)',
  },
  about: {
    greeting: 'Hello there! :)',
    name: "I'm Hanyu...",
    description: `I create a safe space where you can share freely.
Life gets overwhelming—but you don't have to face it alone.

Whether it's stress, anxiety, relationship challenges, or personal concerns, I'm here to support you with warmth and tailored practical strategies.

Therapy is our collaborative journey to explore new perspectives and build resilience together. Our sessions feel like judgment-free conversations where you process emotions at your own pace, all from the comfort of your chosen space online.`,
    approach: {
      title: 'My Approach:',
      description: 'Collaborative, client-centered therapy with a warm and conversational style to explore your personal strengths whilst developing practical strategies.',
    },
    specialization: {
      title: 'I Specialize In:',
      description: 'Stress & anxiety management, emotional regulation, relationship challenges, workplace pressures, and career transitions.',
    },
  },
  faq: [
    {
      question: 'ARE SESSIONS CONFIDENTIAL?',
      answer: "Yes. All information shared remains private. I only disclose information when legally required or if there's risk of harm to yourself or others.",
    },
    {
      question: 'HOW OFTEN DO WE MEET?',
      answer: 'We typically begin with weekly sessions, then adjust based on your progress and needs. We can discuss a schedule that accommodates your comfort, finances, and availability.',
    },
    {
      question: 'HOW MANY SESSIONS WILL I NEED?',
      answer: "This varies by individual and complexity. Noticeable benefits generally appear after 8-14 weekly sessions, with significant improvements after 16+ sessions. There's no fixed requirement.",
    },
    {
      question: 'WHAT TO EXPECT IN THE FIRST SESSION?',
      answer: 'Your first session is an intake session where I learn more about you, your concerns, and your goals. Please share openly to help me understand your situation better.',
    },
    {
      question: 'HOW DO I BOOK A SESSION?',
      answer: "Click the 'Contact' button to email me about availability. Once we confirm your preferred time slot, please send payment confirmation within one hour to secure your booking. You'll receive a confirmation email promptly.",
    },
  ],
  fees: {
    price: 'SGD110 Per Session (60mins)',
    question: 'WHY DO THERAPY SESSIONS COST SGD 110?',
    answer: 'Therapy is an investment in your wellbeing - Your fee covers not just our time together, but also my preparation and effort for each session.',
    benefits: [
      {
        title: '1. Tailored Support',
        description: 'Every session is designed around you - your needs, pace & goals',
      },
      {
        title: '2. Professional Expertise',
        description: 'I hold a Master of Counselling and have worked with over 100 clients aged 7 to 35, (mainly 15 - 35), addressing stress, anxiety, relationships, and work-life balance.',
      },
      {
        title: '3. Practical Tools for Real Life',
        description: 'Youll walk away with actionable strategies that fit your life.',
      },
      {
        title: '4. Safe & Judgement-Free Space',
        description: 'Our sessions are confidential, supportive and built on trust.',
      },
      {
        title: '5. Continuous Growth',
        description: 'I stay committed to delivering evidence-based care through ongoing training and clinical supervision',
      },
    ],
    conclusion: "Your mental health is worth it. Let's take this step together.",
  },
  contact: {
    email: 'thehearttherapysg@gmail.com',
    message: 'For further inquiries, please email',
    form: {
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'service', label: 'Select Service', type: 'select', required: true },
        { name: 'dateTime', label: 'Preferred Date & Time Slots', type: 'textarea', required: false },
      ],
      serviceOptions: [
        'Individual Therapy Session',
        'Initial Consultation',
        'Follow-up Session',
      ],
    },
  },
};
