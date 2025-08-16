'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { content } from '@/data/content';
import { cn } from '@/utils/helpers';

export default function ContactSection() {
  const { contact } = content;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    dateTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailBody = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Preferred Date & Time: ${formData.dateTime}`;

    const mailtoLink = `mailto:${contact.email}?subject=Therapy Session Inquiry&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center font-patrick-hand">
        Get In Touch
      </h2>
      
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Mail size={20} className="text-primary" />
          <span className="text-secondary font-ubuntu-mono">{contact.message}</span>
        </div>
        <a 
          href={`mailto:${contact.email}`}
          className="text-primary font-medium hover:underline font-ubuntu-mono"
        >
          {contact.email}
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
            Select Service *
          </label>
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Choose a service...</option>
            {contact.form.serviceOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold italic text-foreground mb-1 font-ubuntu-mono">
            Preferred Date & Time Slots
          </label>
          <textarea
            name="dateTime"
            rows={3}
            value={formData.dateTime}
            onChange={handleChange}
            placeholder="Please share your availability..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        <button
          type="submit"
          className={cn(
            'w-full bg-primary text-white py-3 px-4 rounded-md font-medium font-ubuntu-mono',
            'hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20'
          )}
        >
          Send Email Inquiry
        </button>
      </form>
    </div>
  );
}
