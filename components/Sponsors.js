
import React from 'react';

export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 md:py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="sub-font text-xs font-bold uppercase tracking-[0.5em] text-cyan-neon mb-4">STRATEGIC_NODES</h2>
          <h3 className="heading-font text-3xl md:text-4xl font-black text-white uppercase tracking-tight">SUPPORTING THE ECOSYSTEM.</h3>
        </div>

        {/* Tier 1: Platinum */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="sub-font text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Platinum_Registry</span>
            <div className="flex-grow h-px bg-neutral-800"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 md:h-32 bg-neutral-900/30 border border-neutral-800 flex items-center justify-center group hover:border-cyan-neon/50 transition-colors">
                <div className="w-24 md:w-32 h-6 md:h-8 bg-neutral-700/20 group-hover:bg-cyan-neon/10 transition-colors rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Gold */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="sub-font text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Gold_Handshake</span>
            <div className="flex-grow h-px bg-neutral-800"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-20 md:h-24 bg-neutral-900/30 border border-neutral-800 flex items-center justify-center group hover:border-purple-electric/50 transition-colors">
                 <div className="w-16 md:w-24 h-4 md:h-6 bg-neutral-700/20 group-hover:bg-purple-electric/10 transition-colors rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="sub-font text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-cyan-neon transition-colors border-b border-transparent hover:border-cyan-neon pb-1">
            Interested in sponsoring? Get in touch
          </button>
        </div>
      </div>
    </section>
  );
};
