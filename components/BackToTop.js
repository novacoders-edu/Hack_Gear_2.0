"use client"
import React, { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-50 p-3 bg-black/80 border border-neutral-700 hover:border-cyan-neon rounded-lg transition-all duration-300 group hover:shadow-[0_0_20px_var(--primary-neon)]"
      aria-label="Back to top"
      title="Back to top"
      style={{ 
        animation: 'fadeInUp 0.3s ease-out'
      }}
    >
      <svg 
        className="w-5 h-5 text-neutral-400 group-hover:text-cyan-neon transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        style={{ color: 'var(--primary-neon)' }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};
