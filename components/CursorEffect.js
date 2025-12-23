"use client"
import React, { useEffect, useState, useCallback } from 'react';

export const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const updateMousePosition = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY });
          setIsVisible(true);
          rafId = null;
        });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isClient) return null;

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - (isHovering ? 20 : 10)}px, ${mousePosition.y - (isHovering ? 20 : 10)}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.1s ease-out, opacity 0.2s',
        }}
      >
        <div 
          className="rounded-full border-2 border-cyan-neon transition-all duration-150"
          style={{ 
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            backgroundColor: isHovering ? 'rgba(0, 224, 255, 0.1)' : 'transparent',
            boxShadow: '0 0 10px #00E0FF'
          }} 
        />
      </div>

      {/* Cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - 3}px, ${mousePosition.y - 3}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </>
  );
};
