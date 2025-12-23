"use client"
import React from 'react';

export const TiltCard = ({ children, className = '', glowColor = '#00E0FF' }) => {
  return (
    <div
      className={`relative group ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Simple hover glow effect using CSS */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
        }}
      />
      
      {/* Content with simple CSS transform on hover */}
      <div className="transition-transform duration-300 ease-out group-hover:scale-[1.02]">
        {children}
      </div>
    </div>
  );
};
