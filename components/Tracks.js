"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from './Modal';
import { TiltCard } from './TiltCard';

const trackList = [
  {
    id: 'TRK_01',
    tag:"AI/ML",
    title: 'Intelligent Systems & Smart Automation',
    description: 'Build data-driven solutions using Artificial Intelligence and Machine Learning to solve real-world problems. This domain encourages innovations in prediction, automation, computer vision, NLP, recommendation systems, and intelligent decision-making.',
    color: 'border-cyan-neon',
    accent: 'text-cyan-neon',
    bgColor: 'bg-cyan-neon',
    shadowColor: 'shadow-cyan-neon',
    hexColor: '#00E0FF',
    icon: '🤖 🧠',
    resources: ['TBA']
  },
  {
    id: 'TRK_02',
    tag:"Web Dev",
    title: 'Next-Gen Web Experiences',
    description: 'Design and develop scalable, responsive, and user-centric web applications. Focus on modern frontend and backend technologies, APIs, cloud integration, and performance optimization to create impactful digital experiences.',
    color: 'border-blue-neon',
    accent: 'text-blue-neon',
    bgColor: 'bg-blue-neon',
    shadowColor: 'shadow-blue-neon',
    hexColor: '#0080FF',
    icon: '🌐 💻',
    resources: ['TBA']
  },
  {
    id: 'TRK_03',
    tag:"Cyber Security",
    title: 'Securing the Digital Future',
    description: 'Develop solutions that protect systems, networks, and data from cyber threats. This domain covers ethical hacking, threat detection, cryptography, secure authentication, privacy protection, and cyber resilience.',
    color: 'border-cyan-neon',
    accent: 'text-cyan-neon',
    bgColor: 'bg-cyan-neon',
    shadowColor: 'shadow-cyan-neon',
    hexColor: '#00E0FF',
    icon: '🔐 🛡️',
    resources: ['TBA']
  },
  {
    id: 'TRK_04',
    tag:"Blockchain",
    title: 'Decentralized Innovation & Web3',
    description: 'Explore decentralized technologies to build transparent, secure, and trustless applications. Projects may include smart contracts, decentralized finance (DeFi), NFTs, digital identity, supply chain tracking, and blockchain-based governance.',
    color: 'border-purple-neon',
    accent: 'text-purple-neon',
    bgColor: 'bg-purple-neon',
    shadowColor: 'shadow-purple-neon',
    hexColor: '#4D00FF',
    icon: '⛓️ 🧩',
    resources: ['TBA']
  },
  {
    id: 'TRK_05',
    tag:"Open Innovation",
    title: 'Open Innovation',
    description: "An open domain for groundbreaking ideas that don't fit into a single category. Participants are encouraged to identify real-world challenges and propose creative, interdisciplinary solutions using any technology stack.",
    color: 'border-green-neon',
    accent: 'text-green-neon',
    bgColor: 'bg-green-neon',
    shadowColor: 'shadow-green-neon',
    hexColor: '#00FF41',
    icon: '🚀 💡',
    resources: ['TBA']
  }
];

export const Tracks = () => {
  const [activeTrack, setActiveTrack] = useState(null);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const handleOpenModal = (track) => {
    console.log('Opening modal for:', track.title); // Debug log
    setActiveTrack(track);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Debug log
    setActiveTrack(null);
  };

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
              <TiltCard glowColor={track.hexColor} intensity={10}>
                <div
                  className={`
                    group p-8 md:p-10 bg-cyber-black border border-neutral-800
                    hover:${track.color} transition-all relative overflow-hidden 
                    min-h-[300px] flex flex-col justify-between rounded-xl
                    ${hoveredTrack === idx ? track.shadowColor : ''}
                  `}
                >
                  {/* Tag in top-right corner */}
                  <motion.div
                    className="absolute top-0 right-0 px-3 py-1.5 text-[9px] font-black tracking-widest uppercase sub-font"
                    style={{
                      backgroundColor: track.hexColor,
                      color: '#000000',
                      clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    {track.tag}
                  </motion.div>
                  {/* Animated side bar */}
                  <motion.div
                    className="absolute top-0 left-0 w-1"
                    style={{ backgroundColor: track.hexColor }}
                    initial={{ height: 0 }}
                    animate={{ height: hoveredTrack === idx ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br to-transparent"
                    style={{
                      background: `linear-gradient(to bottom right, ${track.hexColor}10, transparent)`
                    }}
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
                    <h4
                      className={`heading-font text-xl md:text-2xl font-black mb-4 tracking-tight transition-all uppercase`}
                      style={{ color: hoveredTrack === idx ? track.hexColor : '#ffffff' }}
                    >
                      {track.title}
                    </h4>
                    <p className="sub-font text-neutral-400 leading-relaxed text-base md:text-lg">
                      {track.description}
                    </p>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <AnimatePresence>
        {activeTrack && (
          <Modal
            isOpen={!!activeTrack}
            onClose={handleCloseModal}
            title={`${activeTrack.title} DATA_PACK`}
            description={`${activeTrack.description}`}
          >
            <div className="space-y-6 md:space-y-8">
              <div
                className="p-4 border-l-4"
                style={{
                  borderColor: activeTrack.hexColor,
                  backgroundColor: `${activeTrack.hexColor}0D`
                }}
              >
                <p className="sub-font text-sm md:text-base text-neutral-300 italic tracking-wide">
                  "System integrity depends on the robustness of the build. Use these resources to stabilize your prototype."
                </p>
              </div>
              <div className="grid gap-3">
                <h4 className="heading-font text-[10px] text-neutral-500 uppercase tracking-widest">Available_Assets</h4>
                {activeTrack.resources.map((res, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between p-4 border border-neutral-800 bg-black group cursor-pointer hover:${activeTrack.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="sub-font text-base md:text-lg font-bold text-neutral-400 group-hover:text-white tracking-wider">{res}</span>
                    <span
                      className="text-[10px] font-bold opacity-0 group-hover:opacity-100 hidden sm:block"
                      style={{ color: activeTrack.hexColor }}
                    >
                      DOWNLOAD_READY
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence> */}
    </section>
  );
};