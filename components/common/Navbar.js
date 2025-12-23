"use client"
import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    closeMenu();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navHeight = 100;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'PROTOCOL', href: '#protocol' },
    { name: 'DOMAINS', href: '#domains' },
    { name: 'TIMELINE', href: '#timeline' },
    { name: 'REWARDS', href: '#rewards' },
    { name: 'AGENTS', href: '#judges' },
    { name: 'FAQ', href: '#faq' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md border-b border-cyan-neon/30 py-3' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-neon/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <img src='/hglogo.png' className="heading-font text-cyan-neon font-black text-lg sm:text-xl border border-cyan-neon rounded-full relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="heading-font text-white font-bold tracking-tighter text-xs sm:text-sm md:text-lg leading-none">HACK<span className="text-cyan-neon">GEAR 2.0</span></span>
            <span className="sub-font text-[10px] sm:text-[8px] md:text-[10px] text-purple-electric font-bold tracking-[0.2em] leading-none">NovaCoders</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="sub-font text-xs xl:text-sm font-semibold text-neutral-400 hover:text-cyan-neon hover:neon-text-cyan transition-all tracking-wider whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleSmoothScroll(e, '#register')}
            className="px-4 xl:px-6 py-2 border border-cyan-neon text-cyan-neon text-xs heading-font font-bold uppercase tracking-widest relative group overflow-hidden flex-shrink-0"
          >
            <span className="absolute inset-0 bg-cyan-neon translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative z-10 group-hover:text-black transition-colors">Register</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-cyan-neon p-2 z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-md border-b border-cyan-neon/30 transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-full'
          }`}
        style={{ paddingTop: '80px' }}
      >
        <div className="flex flex-col p-6 sm:p-8 space-y-6 sm:space-y-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="sub-font text-xl sm:text-2xl font-bold text-neutral-400 hover:text-cyan-neon transition-colors tracking-widest"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: isMenuOpen ? 1 : 0,
                transition: 'all 0.3s ease'
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleSmoothScroll(e, "#register")}
            className="w-full py-4 sm:py-5 border border-cyan-neon text-cyan-neon text-center heading-font font-bold uppercase tracking-widest bg-cyan-neon/10 text-lg"
            style={{
              transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.3s ease'
            }}
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};