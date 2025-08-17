export const content = {
  hero: {
    greeting: "hi! i'm hanyu",
    subtitle: 'professional counsellor of 3 years (Master of Counselling)',
  },
  about: {
    greeting: 'Hello there! :)',
    name: "I'm Hanyu...",
    description: `I was born and raised in Singapore, and hold a Master of Counselling as well as a Postgraduate Diploma in Counselling Psychology. Over the years, I've had the privilege of working in local secondary schools, tertiary institutions, international schools, and private practice. These experiences have given me meaningful insight into the social, emotional, and developmental needs of clients from adolescence through young adulthood, and have shaped my grounded, client-centred approach.

In our sessions, I bring warmth and a calm, supportive presence to the therapeutic space. My hope is for clients to feel truly seen, heard, and safe. With patience and genuine care, I walk alongside each person at their own pace, listening deeply, without judgment, and offering both comfort and practical guidance along the way.

At the heart of my practice is the belief that counselling is not about "fixing" someone, but about gently guiding them to recognise their strengths, reflect on their experiences, and grow into a fuller sense of who they are. For me, it is a privilege to be part of this journey: to help someone feel less alone, and to remind them that they already carry the strength and capacity to move forward.`,
    specialization: {
      title: 'Specialisations',
      description: `Adults (26–35 years) – supporting clients in work or further studies with career development, workplace stress, relationship challenges, life transitions, goal setting, and personal growth.

Young adults (18–25 years) – guiding clients in university or early career stages through academic or workplace pressures, time and stress management, decision-making, building independence, relationships, motivation, and navigating life transitions.

Adolescents and teenagers (10–18 years) – supporting adolescents and teenagers through school challenges, peer and family relationships, self-esteem, identity exploration, stress, exam pressures, and developing coping skills.

Emotional and social wellbeing – helping clients across all ages manage stress, anxiety, anger, frustration, sadness, self-confidence, friendships, relationships, personal growth, and other areas of life that matter to my clients.

Personal challenges in work or academic settings – assisting clients to develop practical strategies, strengthen problem-solving skills, and build on existing strengths to manage challenges effectively.`,
    },
    approach: {
      title: 'My Approach',
      description: 'I take a collaborative, client-centred approach, creating a warm and conversational space where you feel safe to explore your experiences. Together, we focus on your strengths and resources, building on what\'s already working in your life. I draw on approaches such as Motivational Interviewing (MI), Solution-Focused Brief Therapy (SFBT), Person-Centred Therapy (PCT), and Cognitive Behavioural Therapy (CBT), using techniques like reframing and practical strategies to support growth in ways that feel meaningful and manageable for you.',
    },
    qualifications: {
      title: 'Qualifications & Credentials',
      education: `Education
• Master of Counselling, Executive Counselling & Training Academy (ECTA)
• Post Graduate Diploma in Counselling Psychology, College of Allied Educators
• BSc in Business Management`,
      professional: `Professional Memberships
• Provisional Clinical Member (PCM), Singapore Association for Counselling (SAC)`,
      training: `Specialized Training
• Choice Theory Reality Therapy (CTRT) – Basic Intensive Training (William Glasser Institute Singapore)
• Acceptance & Commitment Therapy (ACT) (Certification)`,
      commitment: `Commitment to Excellence
Committed to continuous learning through training, research, and professional development to ensure high-quality care for my clients`,
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
    price: 'SGD120 Per Session (60mins)',
    question: 'Why Do Therapy Sessions Cost SGD 120?',
    answer: 'Therapy is an investment in your wellbeing. The fee reflects not just the time we spend together, but also the preparation, care, and expertise I bring to each session.',
    benefits: [
      {
        title: '1. Tailored Support',
        description: 'Every session is designed around you - your needs, pace & goals',
      },
      {
        title: '2. Professional Expertise',
        description: 'I bring my professional qualifications and experience to provide guidance and strategies that help you navigate stress, anxiety, relationships, and the pressures of work, school, or daily life, always tailoring my approach to your unique needs.',
      },
      {
        title: '3. Practical Tools for Real Life',
        description: "You'll walk away with actionable strategies and coping methods that can be applied beyond our sessions, helping you make meaningful progress.",
      },
      {
        title: '4. Safe & Judgement-Free Space',
        description: 'Our sessions are confidential, supportive and built on trust.',
      },
      {
        title: '5. Commitment to Growth',
        description: 'I stay updated with evidence-based practices through ongoing training and supervision, ensuring that the care you receive is thoughtful, effective, and tailored to you.',
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
        'Online Individual Counselling - SG$120/hr',
      ],
    },
  },
};
