"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TiltCard } from './TiltCard';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaYoutube, FaInstagram, FaCrown, FaMedal, FaAward, FaTrophy } from 'react-icons/fa';

export const Team = () => {
  const token = process.env.NEXT_PUBLIC_HS_API_TOKEN
  const [hoveredCard, setHoveredCard] = useState({ section: null, index: null });
  const [activeSection, setActiveSection] = useState('judges');
  const [coreTeam, setCoreTeam] = useState([]);
  const [judges, setJudges] = useState([]);
  const [pastWinners, setPastWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: 'core', label: 'CORE_TEAM', data: coreTeam },
    { id: 'winners', label: 'PAST_WINNERS', data: pastWinners },
    { id: 'judges', label: 'THE_PANEL', data: judges }
  ];

  // Fetch all data on page load
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch core team
        const coreTeamResponse = await fetch("/api/core-team",{
          headers:{
            "hg-api-token":token
          }
        });
        const coreTeamResult = await coreTeamResponse.json();
        if (coreTeamResult.success) {
          setCoreTeam(
            coreTeamResult.data.map((member) => ({
              ...member,
              socials: member.socials.map((social) => ({
                ...social,
                icon:
                  social.platform === "Linkedin" ? <FaLinkedin /> :
                  social.platform === "Github" ? <FaGithub /> :
                  social.platform === "Twitter" ? <FaTwitter /> :
                  social.platform === "Youtube" ? <FaYoutube /> :
                  social.platform === "Instagram" ? <FaInstagram /> :
                  social.platform === "Globe" ? <FaGlobe /> :
                  null,
              })),
            }))
          );
        }

        // Fetch judges
        const judgesResponse = await fetch("/api/judges",{
          headers:{
            "hg-api-token":token
          }
        });
        const judgesResult = await judgesResponse.json();
        if (judgesResult.success) {
          setJudges(
            judgesResult.data.map((judge) => ({
              ...judge,
              socials: judge.socials.map((social) => ({
                ...social,
                icon:
                  social.platform === "Linkedin" ? <FaLinkedin /> :
                  social.platform === "Github" ? <FaGithub /> :
                  social.platform === "Twitter" ? <FaTwitter /> :
                  social.platform === "Youtube" ? <FaYoutube /> :
                  social.platform === "Instagram" ? <FaInstagram /> :
                  social.platform === "Globe" ? <FaGlobe /> :
                  null,
              })),
            }))
          );
        }

        // Fetch past winners
        const winnersResponse = await fetch("/api/past-winners",{
          headers:{
            "hg-api-token":token
          }
        });
        const winnersResult = await winnersResponse.json();
        if (winnersResult.success) {
          setPastWinners(winnersResult.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);

  const getCardDetails = (section, item) => {
    switch (section) {
      case 'core':
        return {
          accentColor: '#00E0FF',
          accentLabel: item.department,
          bio: item.bio
        };
      case 'winners':
        return {
          accentColor: item.rank === 1 ? '#FFD700' :
            item.rank === 2 ? '#C0C0C0' :
              item.rank === 3 ? '#CD7F32' : '#FF00FF',
          accentLabel: item.achievement,
          bio: item.bio,
          icon: item.rank === 1 ? <FaCrown /> :
            item.rank === 2 ? <FaMedal /> :
              item.rank === 3 ? <FaAward /> : <FaTrophy />
        };
      case 'judges':
        return {
          accentColor: '#4D00FF',
          accentLabel: item.company,
          bio: item.bio
        };
      default:
        return {
          accentColor: '#00E0FF',
          accentLabel: '',
          bio: item.bio
        };
    }
  };

  return (
    <section id="judges" className="py-16 md:py-20 bg-cyber-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-electric/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12 text-center"
        >
          <h2 className="sub-font text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-purple-electric mb-2">THE_SQUAD</h2>
          <h3 className="heading-font text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase mb-8">BEHIND THE_SCENES.</h3>

          {/* Section Selector */}
          <div className="flex justify-center gap-4 md:gap-6 mb-12">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="relative px-4 md:px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`sub-font text-xs md:text-sm font-bold uppercase tracking-[0.3em] transition-colors ${activeSection === section.id ? 'text-cyan-neon' : 'text-neutral-500 hover:text-neutral-300'
                  }`}>
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-neon"
                    layoutId="activeSection"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="text-center text-white">
              <p className="text-lg md:text-xl">Loading...</p>
            </div>
          ) : sections.find(s => s.id === activeSection)?.data.length > 0 ? (
            <div className={activeSection === 'winners'
              ? "grid grid-cols-1 gap-6 md:gap-8"
              : "grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6"
            }>
              {sections.find(s => s.id === activeSection)?.data.map((item, idx) => {
                const { accentColor, accentLabel, bio, icon } = getCardDetails(activeSection, item);
                const isHovered = hoveredCard.section === activeSection && hoveredCard.index === idx;

                // Render different layout for winners
                if (activeSection === 'winners') {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onMouseEnter={() => setHoveredCard({ section: activeSection, index: idx })}
                      onMouseLeave={() => setHoveredCard({ section: null, index: null })}
                      className="max-w-4xl mx-auto"
                    >
                      <TiltCard
                        className="h-full"
                        glowColor={accentColor}
                        intensity={15}
                      >
                        <div className="group relative border-2 border-neutral-800 bg-black overflow-hidden h-full hover:border-neutral-700 transition-colors">
                          <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Section - Landscape */}
                            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.teamName}
                                width={800}
                                height={500}
                                className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'
                                  }`}
                              />

                              {/* Rank Badge */}
                              <div className="absolute top-4 left-4 z-20">
                                <motion.div
                                  className="flex items-center gap-2 px-4 py-2 border-2"
                                  style={{
                                    borderColor: accentColor,
                                    backgroundColor: `${accentColor}20`
                                  }}
                                  animate={{
                                    boxShadow: isHovered ? `0 0 20px ${accentColor}80` : 'none'
                                  }}
                                >
                                  <span className="text-2xl" style={{ color: accentColor }}>
                                    {icon}
                                  </span>
                                  <span
                                    className="sub-font text-xs font-bold uppercase tracking-[0.2em]"
                                    style={{ color: accentColor }}
                                  >
                                    {item.position}
                                  </span>
                                </motion.div>
                              </div>

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8 flex flex-col justify-between">
                              <div>
                                <motion.h4
                                  className="heading-font text-2xl md:text-3xl font-black tracking-tight text-white mb-2 uppercase"
                                  animate={{ color: isHovered ? accentColor : '#ffffff' }}
                                >
                                  {item.teamName}
                                </motion.h4>

                                <div className="flex items-center gap-2 mb-4">
                                  <span
                                    className="sub-font text-xs font-bold uppercase tracking-[0.3em] px-3 py-1 border"
                                    style={{
                                      borderColor: accentColor,
                                      color: accentColor,
                                      backgroundColor: `${accentColor}10`
                                    }}
                                  >
                                    {accentLabel}
                                  </span>
                                </div>

                                <div className="mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4" style={{ backgroundColor: accentColor }}></div>
                                  <span className="sub-font text-xs font-bold text-neutral-400 uppercase tracking-[0.15em]">
                                    {item.college}
                                  </span>
                                </div>

                                <div className="mb-4">
                                  <h5 className="sub-font text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">
                                    PROJECT
                                  </h5>
                                  <p className="heading-font text-lg font-bold text-white">
                                    {item.project}
                                  </p>
                                </div>

                                <p className="sub-font text-sm text-neutral-400 leading-relaxed mb-6">
                                  {bio}
                                </p>
                              </div>

                              {/* Decorative Corner */}
                              <motion.div
                                className="absolute bottom-4 right-4 w-8 h-8 rotate-45"
                                style={{ backgroundColor: accentColor }}
                                animate={{
                                  scale: isHovered ? 1.2 : 1,
                                  opacity: isHovered ? 0.8 : 0.5
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                }

                // Existing card layout for core team and judges
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredCard({ section: activeSection, index: idx })}
                    onMouseLeave={() => setHoveredCard({ section: null, index: null })}
                  >
                    <TiltCard
                      className="h-full"
                      glowColor={accentColor}
                      intensity={12}
                    >
                      <div className="group relative border border-neutral-800 bg-black overflow-hidden h-full">
                        <div className="aspect-[3/4] overflow-hidden relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={400}
                            height={533}
                            className={`w-full h-full object-cover scale-105 transition-all duration-700 ${isHovered ? 'scale-100 grayscale-0' : 'grayscale'
                              }`}
                          />

                          <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-black/90 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="sub-font text-xs text-neutral-300 text-center leading-relaxed">
                              {bio}
                            </p>
                          </motion.div>

                          <div className="absolute top-3 left-3 z-20">
                            <span className={`sub-font text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-1 border ${activeSection === 'core' ? 'border-cyan-500 text-cyan-400 bg-cyan-900/20' :
                              activeSection === 'winners' ? 'border-pink-500 text-pink-400 bg-pink-900/20' :
                                'border-purple-500 text-purple-400 bg-purple-900/20'
                              }`}>
                              {accentLabel}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 md:p-4 relative z-10 border-t border-neutral-800">
                          <motion.h4
                            className="heading-font text-base md:text-lg font-black tracking-tight text-white mb-1 transition-colors uppercase"
                            animate={{ color: isHovered ? accentColor : '#ffffff' }}
                          >
                            {item.name}
                          </motion.h4>
                          <p className="sub-font text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em]">
                            {item.role}
                          </p>

                          <div className="flex gap-2 mt-3">
                            {item.socials?.map((social, index) => (
                              <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-6 h-6 border border-neutral-700 flex items-center justify-center hover:border-cyan-neon hover:text-cyan-neon transition-colors cursor-pointer"
                                title={social.platform}
                              >
                                {social.icon}
                              </a>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          className="absolute bottom-0 right-0 w-6 h-6 rotate-45"
                          style={{ backgroundColor: accentColor }}
                          animate={{
                            x: isHovered ? 2 : 3,
                            y: isHovered ? 2 : 3
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-white"
            >
              <p className="text-lg md:text-xl">To Be Announced</p>
              <p className="text-sm md:text-base text-neutral-400">Stay tuned for updates!</p>
            </motion.div>
          )}
        </motion.div>

        {/* Section Indicator */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2">
            {sections.map((section, idx) => (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-2 h-2 rounded-full transition-all ${activeSection === section.id
                    ? activeSection === 'core' ? 'bg-cyan-500 scale-125' :
                      activeSection === 'winners' ? 'bg-pink-500 scale-125' :
                        'bg-purple-500 scale-125'
                    : 'bg-neutral-700'
                    }`}
                />
                {idx < sections.length - 1 && (
                  <div className="w-4 h-px bg-neutral-800"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="sub-font text-xs text-neutral-500 mt-2 uppercase tracking-[0.2em]">
            {activeSection === 'core' && 'MEET_THE_ORGANIZERS'}
            {activeSection === 'winners' && 'PREVIOUS_CHAMPIONS'}
            {activeSection === 'judges' && 'EXPERT_EVALUATORS'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};