"use client"
import React, { useState, useEffect, useRef } from 'react';

export const GlitchText = ({ text, className = '', intensity = 'medium' }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const glitchChars = '!@#$%^&*アイウエオ';

  useEffect(() => {
    // Reduced frequency glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) { // Less frequent
        let iterations = 0;
        const maxIterations = intensity === 'high' ? 3 : 2;
        
        const glitchEffect = setInterval(() => {
          setDisplayText(
            text.split('').map((char) => {
              if (char === ' ') return ' ';
              if (Math.random() > 0.8) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            }).join('')
          );
          
          iterations++;
          if (iterations >= maxIterations) {
            clearInterval(glitchEffect);
            setDisplayText(text);
          }
        }, 80);
      }
    }, 3000); // Less frequent checks

    intervalRef.current = glitchInterval;
    return () => clearInterval(glitchInterval);
  }, [text, intensity]);

  return <span className={className}>{displayText}</span>;
};

export const RGBSplitImage = ({ src, alt, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {isHovered && (
        <div className="absolute inset-0 mix-blend-screen opacity-30 animate-pulse"
          style={{ 
            background: 'linear-gradient(90deg, #00E0FF 0%, transparent 50%, #4D00FF 100%)',
          }}
        />
      )}
    </div>
  );
};
