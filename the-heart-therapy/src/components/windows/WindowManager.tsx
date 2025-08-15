'use client';

import PopupWindow from './PopupWindow';
import { useWindows } from '@/contexts/WindowContext';
import AboutSection from '@/components/sections/AboutSection';
import FAQSection from '@/components/sections/FAQSection';
import FeesSection from '@/components/sections/FeesSection';
import ContactSection from '@/components/sections/ContactSection';

const sectionComponents = {
  about: AboutSection,
  faq: FAQSection,
  fees: FeesSection,
  contact: ContactSection,
};

export default function WindowManager() {
  const { state } = useWindows();

  return (
    <>
      {state.windows.map((window) => {
        const SectionComponent = sectionComponents[window.type];
        
        return (
          <PopupWindow key={window.id} window={window}>
            <SectionComponent />
          </PopupWindow>
        );
      })}
    </>
  );
}
