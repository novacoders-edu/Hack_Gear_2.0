"use client"
import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './TiltCard';

const prizeCards = [
  {
    place: 'TBA',
    amount: 'TBA',
    perks: ["TBA"],
    highlight: false,
    details: 'The primary bounty for the squad that achieves total technical dominance. Includes full integration into our accelerated development network and direct access to Tier-1 capital.',
    glowColor: 'rgba(0, 224, 255, 0.3)',
    requirements: ['TBA'],
    teamSize: '1-4 Hackers'
  },
];

const specialCategories = [
  { 
    name: 'TBA', 
    amount: 'TBA',
    description: 'TBA',
    icon: '⌗',
    criteria: ['Visual Hierarchy', 'Interaction Design', 'Accessibility Compliance']
  }
];

export const Prizes = () => {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedPrizes, setRevealedPrizes] = useState([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dramatic reveal sequence
          prizeCards.forEach((_, idx) => {
            setTimeout(() => {
              setRevealedPrizes(prev => [...prev, idx]);
            }, idx * 300 + 500);
          });
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('rewards');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rewards" className="py-16 md:py-28 bg-cyber-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-neon/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-matrix-green/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #00E0FF 1px, transparent 1px),
                           linear-gradient(to bottom, #00E0FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-neon"></span>
            <h2 className="sub-font text-sm font-bold uppercase tracking-[0.5em] text-cyan-neon">
              DATA_BOUNTIES
            </h2>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-neon"></span>
          </div>
          
          <h3 className="heading-font text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            REWARD ALLOCATION
            <span className="text-cyan-neon animate-pulse">.</span>
          </h3>
          
          <p className="sub-font text-base md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Digital assets allocated for protocol disruption. Bounties scale with technical complexity and neural impact.
          </p>
        </motion.div>

        {/* Main Prize Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 mb-16 md:mb-24">
          {prizeCards.map((prize, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, rotateY: -90 }}
              animate={revealedPrizes.includes(idx) ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
              onMouseEnter={() => setIsHovered(idx)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative ${prize.highlight ? 'z-10' : ''}`}
            >
              <TiltCard 
                glowColor={prize.highlight ? '#00E0FF' : '#4D00FF'}
                intensity={12}
              >
                {/* Glow Effect */}
                {prize.highlight && (
                  <div className="absolute -inset-4 bg-gradient-to-br from-cyan-neon/20 to-transparent rounded-2xl blur-xl"></div>
                )}

                {/* Card Container */}
                <div 
                  className={`
                    relative p-6 md:p-8 rounded-2xl border-2 backdrop-blur-sm cursor-pointer
                    ${prize.highlight 
                      ? 'bg-gradient-to-b from-cyan-neon/15 to-black/80 border-cyan-neon shadow-[0_0_60px_rgba(0,224,255,0.3)]' 
                      : 'bg-black/60 border-neutral-800 hover:border-purple-electric hover:shadow-[0_0_40px_rgba(155,89,182,0.2)]'
                    }
                    transition-all duration-300
                  `}
                  onClick={() => setSelectedPrize(prize)}
                >
                  
                  {/* Priority Badge */}
                  {prize.highlight && (
                    <motion.div 
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <div className="px-6 py-2 bg-gradient-to-r from-cyan-neon to-blue-500 text-black heading-font text-xs font-black tracking-[0.3em] whitespace-nowrap rounded-full shadow-lg">
                        PRIORITY_TARGET
                      </div>
                    </motion.div>
                  )}

                  {/* Tier Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="sub-font text-xs font-black uppercase tracking-[0.3em] text-neutral-500">
                      {prize.place}
                    </span>
                    <span className="sub-font text-xs text-cyan-neon font-bold px-3 py-1 border border-cyan-neon/30 rounded-full">
                      {prize.teamSize}
                    </span>
                  </div>

                  {/* Amount with dramatic reveal */}
                  <div className="relative mb-8 md:mb-10">
                    <motion.div
                      className={`
                        heading-font text-3xl sm:text-4xl md:text-5xl font-black mb-2
                        ${prize.highlight ? 'text-white' : 'text-neutral-300'}
                      `}
                      animate={isHovered === idx ? { 
                        textShadow: '0 0 30px #00E0FF',
                        scale: 1.05
                      } : {}}
                    >
                      {prize.amount}
                    </motion.div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-3 md:space-y-4 mb-8">
                    {prize.perks.map((perk, pIdx) => (
                      <motion.div 
                        key={pIdx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={revealedPrizes.includes(idx) ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: pIdx * 0.1 + 0.3 }}
                        className="flex items-center gap-3 sub-font text-sm tracking-widest font-bold group/item"
                      >
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${prize.highlight ? 'bg-cyan-neon' : 'bg-purple-electric'}`}
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className={`${prize.highlight ? 'text-cyan-neon/90' : 'text-neutral-400'} group-hover/item:text-white transition-colors`}>
                          {perk}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button 
                    className={`
                      w-full py-4 heading-font text-xs font-black uppercase tracking-widest
                      transition-all duration-300 relative overflow-hidden
                      ${prize.highlight 
                        ? 'bg-gradient-to-r from-cyan-neon to-blue-500 text-black' 
                        : 'border-2 border-neutral-700 text-white hover:border-cyan-neon hover:text-cyan-neon'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">REQUEST_INTEL</span>
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Special Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8 md:mb-12">
            <h4 className="heading-font text-2xl md:text-3xl font-black text-white mb-2">
              SPECIAL_CATEGORIES
            </h4>
            <p className="sub-font text-neutral-400 text-sm md:text-base">
              Additional recognition for excellence in specific domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {specialCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setActiveCategory(idx)}
                onMouseLeave={() => setActiveCategory(null)}
                className="relative group"
              >
                <div className="relative p-6 md:p-8 border border-neutral-800 bg-gradient-to-b from-neutral-900/20 to-black/60 rounded-xl hover:border-matrix-green transition-all duration-300 overflow-hidden">
                  
                  {/* Animated Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-matrix-green/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCategory === idx ? 1 : 0 }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="text-3xl md:text-4xl text-matrix-green mb-4 font-bold"
                    animate={activeCategory === idx ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  {/* Category Name */}
                  <div className="sub-font text-base md:text-lg font-bold mb-2 text-neutral-400 group-hover:text-white transition-colors tracking-widest">
                    {category.name}
                  </div>
                  
                  {/* Amount */}
                  <div className="heading-font text-xl md:text-2xl font-black text-matrix-green mb-3">
                    {category.amount}
                  </div>
                  
                  {/* Description (Hover) */}
                  <AnimatePresence>
                    {activeCategory === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="sub-font text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-800">
                          {category.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              {[
                { label: 'TOTAL_POOL', value: 'TBA', color: 'text-cyan-neon' },
                { label: 'WINNING_TEAMS', value: 'TBA', color: 'text-matrix-green' },
                { label: 'EVENT_WINDOW', value: '8H', color: 'text-purple-electric' },
                { label: 'PAYOUT_GUARANTEE', value: '100%', color: 'text-white' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`heading-font text-2xl md:text-3xl font-black ${item.color} mb-1 md:mb-2`}>
                    {item.value}
                  </div>
                  <div className="sub-font text-xs text-neutral-500 uppercase tracking-widest">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <Modal 
        isOpen={!!selectedPrize} 
        onClose={() => setSelectedPrize(null)} 
        title={`${selectedPrize?.place} - FULL_INTEL`}
        size="lg"
      >
        {selectedPrize && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-neutral-800">
              <div>
                <motion.div 
                  className="heading-font text-4xl md:text-6xl font-black text-cyan-neon neon-text-cyan mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  {selectedPrize.amount}
                </motion.div>
                <div className="sub-font text-sm text-neutral-400">
                  Team Size: <span className="text-white font-bold">{selectedPrize.teamSize}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="sub-font text-lg font-bold text-white mb-4 tracking-widest">MISSION_BRIEF</h4>
              <p className="sub-font text-lg text-neutral-300 leading-relaxed">
                {selectedPrize.details}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="sub-font text-sm font-bold text-cyan-neon mb-4 uppercase tracking-widest">PERKS & BENEFITS</h5>
                <div className="space-y-3">
                  {selectedPrize.perks.map((perk, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-3 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-2 h-2 mt-2 rounded-full bg-cyan-neon"></div>
                      <span className="sub-font text-sm font-bold text-neutral-300">{perk}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="sub-font text-sm font-bold text-matrix-green mb-4 uppercase tracking-widest">TECH_REQUIREMENTS</h5>
                <div className="space-y-2">
                  {selectedPrize.requirements.map((req, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-1 h-6 bg-matrix-green"></div>
                      <span className="sub-font text-sm text-neutral-400">{req}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
