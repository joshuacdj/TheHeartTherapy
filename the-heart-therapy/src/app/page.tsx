'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import ContentCard from "@/components/layout/ContentCard";
import WindowManager from "@/components/windows/WindowManager";
import MuteButton from "@/components/ui/MuteButton";
import { useWindows, WindowProvider } from "@/contexts/WindowContext";
import { NavigationType } from "@/types/window";
import { testimonials, Testimonial } from "@/data/testimonials";
import { TESTIMONIAL_CONFIG } from "@/utils/constants";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useSoundEffects } from "@/contexts/SoundEffectsContext";

function HomePage() {
  const { dispatch } = useWindows();
  const { playHover, playClick } = useSoundEffects();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldStartTypewriter, setShouldStartTypewriter] = useState(true);

  const currentTestimonial = useMemo(() => 
    testimonials[currentTestimonialIndex], 
    [currentTestimonialIndex]
  );
  
  const { displayedText, isComplete } = useTypewriter({
    text: shouldStartTypewriter ? currentTestimonial.text : '',
    speed: 25,
    startDelay: 300,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setShouldStartTypewriter(false);
      
      setTimeout(() => {
        setCurrentTestimonialIndex((prevIndex) => 
          (prevIndex + 1) % testimonials.length
        );
        setIsVisible(true);
        setShouldStartTypewriter(true);
      }, TESTIMONIAL_CONFIG.TRANSITION_DURATION);
      
    }, TESTIMONIAL_CONFIG.ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleNavigationClick = useCallback((type: NavigationType) => {
    playClick();
    dispatch({ type: 'OPEN_WINDOW', windowType: type });
  }, [playClick, dispatch]);

  return (
    <PageContainer>
      <div className="relative">
        {/* Logo positioned above the card */}
        <div className="relative z-10 flex justify-center mb-[-50px]">
          <Image
            src="/images/logo.png"
            alt="The Heart Therapy Logo"
            width={160}
            height={160}
            className="drop-shadow-lg"
            priority
          />
        </div>
        
        <ContentCard className="pt-16 pb-12 px-12">
          {/* Header section with "home" and border */}
          <div 
            className="absolute top-0 left-0 right-0 px-6 py-3 rounded-t-3xl border-b border-foreground"
            style={{
              background: 'linear-gradient(to bottom, #D9D9D9, #B7B7B7)'
            }}
          >
            <span className="text-foreground font-medium font-josefin-sans text-lg">home</span>
          </div>
          
          <div className="text-center mt-4">
            <h1 className="text-5xl font-bold text-foreground mb-4 font-patrick-hand">
              hi! <span className="text-primary">i&apos;m hanyu</span>
            </h1>
            
            <p className="text-lg text-secondary mb-8 font-ubuntu italic">
              professional counsellor (Master of Counselling)
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <button 
                onClick={() => handleNavigationClick('about')}
                onMouseEnter={playHover}
                className="text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/icons/about.png"
                  alt="About"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium font-patrick-hand text-lg">About</span>
              </button>
              
              <button 
                onClick={() => handleNavigationClick('faq')}
                onMouseEnter={playHover}
                className="text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/icons/faq.png"
                  alt="FAQ"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium font-patrick-hand text-lg">FAQ</span>
              </button>
              
              <button 
                onClick={() => handleNavigationClick('fees')}
                onMouseEnter={playHover}
                className="text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/icons/fees.png"
                  alt="Fees"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium font-patrick-hand text-lg">Fees</span>
              </button>
              
              <button 
                onClick={() => handleNavigationClick('contact')}
                onMouseEnter={playHover}
                className="text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/icons/contact.png"
                  alt="Contact"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium font-patrick-hand text-lg">Contact</span>
              </button>
            </div>
          </div>
        </ContentCard>
      </div>
      
      {/* Testimonial cat in bottom right */}
      <div className="fixed bottom-8 right-4 sm:right-8">
        <div className="relative">
          {/* Thought bubble positioned above the cat */}
          <div className="absolute bottom-full mb-6 -right-8 sm:right-1/2 sm:transform sm:translate-x-16">
            {/* Cloud-like thought bubble */}
            <div 
              className="relative bg-white p-3 border border-gray-200 w-48 max-w-sm transition-opacity duration-500"
              style={{
                borderRadius: '25px 30px 25px 15px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <p className="text-base text-foreground leading-relaxed mb-2 pr-1 font-patrick-hand">
                &ldquo;{displayedText}
                {!isComplete && (
                  <span className="animate-pulse text-primary">|</span>
                )}
                &rdquo;
              </p>
              <div className="text-right">
                <span className="text-primary text-sm font-medium font-patrick-hand">~{currentTestimonial.author}</span>
              </div>
            </div>
            
            {/* Small connecting circles for thought bubble effect */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-2 transition-opacity duration-500"
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <div 
                className="w-3 h-3 bg-white rounded-full border border-gray-200 mb-1"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)' }}
              ></div>
              <div 
                className="w-2 h-2 bg-white rounded-full border border-gray-200 ml-2 mb-1"
                style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)' }}
              ></div>
              <div 
                className="w-1 h-1 bg-white rounded-full border border-gray-200 ml-1"
                style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)' }}
              ></div>
            </div>
          </div>
          
          {/* Cat image */}
          <Image
            src="/images/testimonial.png"
            alt="Testimonial Cat"
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>
      </div>
      
      <WindowManager />
      <MuteButton />
    </PageContainer>
  );
}

export default function Home() {
  return (
    <WindowProvider>
      <HomePage />
    </WindowProvider>
  );
}
