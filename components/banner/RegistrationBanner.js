"use client"
import React, { useState, useEffect } from 'react';

export const RegistrationNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const timerShow = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // show notification after 2 seconds

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Disappears after 5 seconds

    return () => clearTimeout(timer, timerShow);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="relative bg-black border border-cyan-neon/30 rounded-lg shadow-[0_0_20px_rgba(0,224,255,0.2)] overflow-hidden">
        {/* Progress bar that shrinks over 5 seconds */}
        <div className="h-1 bg-cyan-neon animate-shrink"></div>
        
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-3 h-3 bg-cyan-neon rounded-full animate-pulse flex-shrink-0 mt-1"></div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="heading-font text-base font-black text-white mb-1">
                REGISTRATION_SOON
              </h3>
              <p className="sub-font text-sm text-neutral-400">
                Stay tuned. Portals activating shortly.
              </p>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-neutral-500 hover:text-white transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-shrink {
          animation: shrink 5s linear forwards;
        }
      `}</style>
    </div>
  );
};