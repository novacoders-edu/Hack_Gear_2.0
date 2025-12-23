"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';

const judges = [
  {
    name: 'Member 1',
    role: 'TBA',
    image: '/user.jpg',
    bio: 'Industry expert with 10+ years of experience in software development.'
  },
  {
    name: 'Member 2',
    role: 'TBA',
    image: '/user.jpg',
    bio: 'Startup founder and tech evangelist passionate about innovation.'
  },
  {
    name: 'Member 3',
    role: 'TBA',
    image: '/user.jpg',
    bio: 'Open source contributor and community builder.'
  },
  {
    name: 'Member 4',
    role: 'TBA',
    image: '/user.jpg',
    bio: 'AI researcher and machine learning specialist.'
  }
];

export const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="judges" className="py-24 md:py-32 bg-cyber-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-electric/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <h2 className="sub-font text-sm font-bold uppercase tracking-[0.5em] text-purple-electric mb-4">VERIFIED_AGENTS</h2>
          <h3 className="heading-font text-4xl md:text-5xl lg:text-7xl font-black text-white">THE_PANEL.</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {judges.map((judge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <TiltCard 
                className="h-full"
                glowColor="#4D00FF"
                intensity={12}
              >
                <div className="group relative border border-neutral-800 bg-black overflow-hidden h-full">
                  {/* Image with RGB split effect */}
                  <div className="aspect-[3/4] overflow-hidden relative">
                    {/* Base image */}
                    <img 
                      src={judge.image} 
                      alt={judge.name} 
                      className={`w-full h-full object-cover scale-105 transition-all duration-700 ${hoveredIndex === idx ? 'scale-100 grayscale-0' : 'grayscale'}`}
                    />
                    
                    {/* RGB Split layers on hover */}
                    {hoveredIndex === idx && (
                      <>
                        <motion.img
                          src={judge.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50"
                          style={{ filter: 'hue-rotate(180deg)' }}
                          initial={{ x: 0 }}
                          animate={{ x: [-3, 3, -3] }}
                          transition={{ duration: 0.2, repeat: Infinity }}
                        />
                        <motion.img
                          src={judge.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50"
                          style={{ filter: 'hue-rotate(90deg)' }}
                          initial={{ x: 0 }}
                          animate={{ x: [3, -3, 3] }}
                          transition={{ duration: 0.2, repeat: Infinity }}
                        />
                      </>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    
                    {/* Scanning Effect */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-cyan-neon/60 shadow-[0_0_15px_#00E0FF]"
                      initial={{ y: '-100%' }}
                      animate={hoveredIndex === idx ? { y: ['0%', '400%'] } : { y: '-100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Bio overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-black/80 flex items-center justify-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="sub-font text-sm text-neutral-300 text-center leading-relaxed">
                        {judge.bio}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Info section */}
                  <div className="p-5 md:p-6 relative z-10 border-t border-neutral-800">
                    <motion.h4 
                      className="heading-font text-lg md:text-xl font-black tracking-tight text-white mb-1 transition-colors"
                      animate={{ color: hoveredIndex === idx ? '#00E0FF' : '#ffffff' }}
                    >
                      {judge.name}
                    </motion.h4>
                    <p className="sub-font text-[10px] md:text-xs font-bold text-neutral-500 uppercase tracking-[0.3em]">{judge.role}</p>
                    
                    {/* Social links placeholder */}
                    <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 border border-neutral-700 flex items-center justify-center hover:border-cyan-neon hover:text-cyan-neon transition-colors cursor-pointer">
                        <span className="text-xs">in</span>
                      </div>
                      <div className="w-8 h-8 border border-neutral-700 flex items-center justify-center hover:border-cyan-neon hover:text-cyan-neon transition-colors cursor-pointer">
                        <span className="text-xs">X</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <motion.div 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-neon rotate-45"
                    animate={{ 
                      x: hoveredIndex === idx ? 2 : 4,
                      y: hoveredIndex === idx ? 2 : 4
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
