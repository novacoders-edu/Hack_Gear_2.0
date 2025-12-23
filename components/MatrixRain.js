"use client"
import React, { useEffect, useRef, useState } from 'react';

export const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    // Lower resolution for performance
    const scale = 0.5;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    
    resizeCanvas();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    window.addEventListener('resize', handleResize);

    const chars = '01アイウエオカキクケコ<>{}[]';
    const charArray = chars.split('');
    
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Get theme color from CSS variable or use defaults
    const getThemeColors = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      switch(theme) {
        case 'green': return ['#00FF41', '#00CC33', '#009922'];
        case 'red': return ['#FF0040', '#CC0033', '#990022'];
        case 'gold': return ['#FFD700', '#CCAA00', '#997700'];
        default: return ['#00E0FF', '#00B4CC', '#008899']; // cyan
      }
    };
    
    let colors = getThemeColors();
    const columnColors = Array(columns).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]);

    let animationId;
    let lastTime = 0;
    const fps = 15; // Lower FPS for performance
    const interval = 1000 / fps;

    const draw = (currentTime) => {
      animationId = requestAnimationFrame(draw);
      
      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Skip some columns for performance
        if (i % 3 !== 0) continue;
        
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = columnColors[i];
        ctx.globalAlpha = 0.6;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(draw);

    // Pause when tab is not visible
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
