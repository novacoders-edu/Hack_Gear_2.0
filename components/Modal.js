"use client"
import React, { useEffect } from 'react';
export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-cyber-black border border-cyan-neon/40 shadow-[0_0_40px_rgba(0,224,255,0.2)] md:shadow-[0_0_80px_rgba(0,224,255,0.2)] animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        {/* Decorative Grid Layer */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[size:15px_15px] md:bg-[size:20px_20px] bg-[linear-gradient(to_right,#00E0FF_1px,transparent_1px),linear-gradient(to_bottom,#00E0FF_1px,transparent_1px)]"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-8 border-b border-neutral-800 relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
             <div className="w-1 h-6 md:h-8 bg-cyan-neon"></div>
             <h3 className="heading-font text-lg md:text-2xl font-black tracking-tighter text-white uppercase">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 md:p-2 text-neutral-500 hover:text-cyan-neon transition-colors"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-10 max-h-[60vh] md:max-h-[65vh] overflow-y-auto custom-scrollbar relative z-10">
          {children}
        </div>
        
        {/* Footer */}
        <div className="p-5 md:p-8 border-t border-neutral-800 flex justify-end relative z-10">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-black border border-cyan-neon text-cyan-neon heading-font text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-cyan-neon hover:text-black transition-all"
          >
            TERMINATE_VIEW
          </button>
        </div>
      </div>
    </div>
  );
};
