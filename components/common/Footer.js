
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-cyber-black border-t border-cyan-neon/20 pt-20 md:pt-32 pb-10 md:pb-12 relative overflow-hidden">
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-32 bg-purple-electric/10 blur-[80px] md:blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative overflow-hidden group">
                <img src='/hglogo.png' className="heading-font text-cyan-neon font-black text-lg sm:text-xl border border-cyan-neon rounded-full relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="heading-font text-2xl md:text-3xl font-black text-white leading-none">HACK<span className="text-cyan-neon">GEAR 2.0</span></span>
                <span className="sub-font text-[10px] md:text-xs text-purple-electric tracking-[0.4em] font-bold">NovaCoders</span>
              </div>
            </div>
            <p className="sub-font text-base md:text-lg text-neutral-500 max-w-sm leading-tight uppercase font-medium">
              THE FUTURE IS NOT FOUND. IT IS WRITTEN IN REPOS, COMPILED IN TERMINALS, AND DEPLOYED IN THE VOID.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-0 md:contents">
            <div>
              <h4 className="heading-font text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white mb-6 md:mb-10">DIRECTORY</h4>
              <ul className="space-y-3 md:space-y-5">
                {['PROTOCOL', 'DOMAINS', 'TIMELINE', 'REWARDS', 'SPONSORS', 'REGISTER'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="sub-font text-xs md:text-sm font-bold text-neutral-500 hover:text-cyan-neon transition-all tracking-widest uppercase">
                      &gt; {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="heading-font text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white mb-6 md:mb-10">CHANNELS</h4>
              <ul className="space-y-3 md:space-y-5">
                {['Linkedin', 'Discord', 'Whatsapp'].map(item => (
                  <li key={item}>
                    <a href={`${item.toLocaleLowerCase()}`} className="sub-font text-xs md:text-sm font-bold text-neutral-500 hover:text-purple-electric transition-all tracking-widest uppercase">
                      &gt; {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-neutral-900 gap-6 md:gap-8 text-center md:text-left">
          <div className="sub-font text-[9px] md:text-xs text-neutral-600 font-bold tracking-widest">
            STAMP_ID: {new Date().getFullYear()}.HACK GEAR 2.0
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 sub-font text-[8px] md:text-[10px] text-neutral-600 font-bold tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-cyan-neon transition-colors">SECURITY_POLICY</a>
            <a href="#" className="hover:text-cyan-neon transition-colors">HACKER_ETHICS</a>
            <a href="#" className="hover:text-cyan-neon transition-colors">OS_TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
