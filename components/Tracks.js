"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { TiltCard } from './TiltCard';

const trackList = [
  {
    id: 'TRK_01',
    title: 'Problem Statements',
    description: 'All problem statements are designed to challenge your skills and push the boundaries of innovation. Choose a track that aligns with your expertise and interests.',
    color: 'border-cyan-neon',
    accent: 'text-cyan-neon',
    icon: '🎯',
    resources: ['TBA']
  }
];

export const Tracks = () => {
  const [activeTrack, setActiveTrack] = useState(null);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  return (
    <section id="tracks" className="py-20 md:py-32 bg-cyber-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-electric/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <h2 className="sub-font text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-purple-electric mb-4">MISSION_OBJECTIVES</h2>
          <h3 className="heading-font text-4xl md:text-7xl font-black text-white uppercase">SELECT_SECTOR.</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackList.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredTrack(idx)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <TiltCard glowColor="#4D00FF" intensity={10}>
                <div 
                  className={`
                    group p-8 md:p-10 bg-cyber-black border border-neutral-800
                    hover:border-cyan-neon/50 transition-all relative overflow-hidden 
                    min-h-[300px] flex flex-col justify-between rounded-xl
                    ${hoveredTrack === idx ? 'shadow-[0_0_40px_rgba(0,224,255,0.2)]' : ''}
                  `}
                >
                  {/* Animated side bar */}
                  <motion.div 
                    className="absolute top-0 left-0 w-1 bg-cyan-neon"
                    initial={{ height: 0 }}
                    animate={{ height: hoveredTrack === idx ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredTrack === idx ? 1 : 0 }}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className="text-3xl mb-4"
                      animate={hoveredTrack === idx ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {track.icon}
                    </motion.div>
                    
                    <div className="sub-font text-[10px] font-bold text-neutral-600 mb-2 tracking-[0.3em]">{track.id}</div>
                    <h4 className={`heading-font text-xl md:text-2xl font-black mb-4 tracking-tight transition-all uppercase ${hoveredTrack === idx ? 'neon-text-cyan text-white' : 'text-white'}`}>
                      {track.title}
                    </h4>
                    <p className="sub-font text-neutral-400 leading-relaxed text-base md:text-lg">
                      {track.description}
                    </p>
                  </div>

                  <motion.button 
                    onClick={() => setActiveTrack(track)}
                    className="mt-8 inline-flex items-center gap-4 sub-font text-xs font-bold tracking-widest text-neutral-500 group-hover:text-white transition-colors uppercase"
                    whileHover={{ x: 5 }}
                  >
                    ACCESS_DATA_PACK
                    <motion.div 
                      className="h-px bg-neutral-800 group-hover:bg-cyan-neon transition-all"
                      initial={{ width: 32 }}
                      whileHover={{ width: 48 }}
                    />
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!activeTrack} 
        onClose={() => setActiveTrack(null)} 
        title={`${activeTrack?.title} DATA_PACK`}
      >
        <div className="space-y-6 md:space-y-8">
          <div className="p-4 border-l-4 border-cyan-neon bg-cyan-neon/5">
            <p className="sub-font text-sm md:text-base text-neutral-300 italic tracking-wide">
              "System integrity depends on the robustness of the build. Use these resources to stabilize your prototype."
            </p>
          </div>
          <div className="grid gap-3">
            <h4 className="heading-font text-[10px] text-neutral-500 uppercase tracking-widest">Available_Assets</h4>
            {activeTrack?.resources.map((res, i) => (
              <motion.div 
                key={i} 
                className="flex items-center justify-between p-4 border border-neutral-800 bg-black group cursor-pointer hover:border-cyan-neon"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <span className="sub-font text-base md:text-lg font-bold text-neutral-400 group-hover:text-white tracking-wider">{res}</span>
                <span className="text-[10px] font-bold text-cyan-neon opacity-0 group-hover:opacity-100 hidden sm:block">DOWNLOAD_READY</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
};
