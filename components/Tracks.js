"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";
import { TiltCard } from "./TiltCard";

const token = process.env.NEXT_PUBLIC_HS_API_TOKEN

export const Tracks = () => {
  const [trackList, setTrackList] = useState([]); // State to store tracks
  const [activeTrack, setActiveTrack] = useState(null);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  // Fetch tracks data from the API
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/api/problem-statements", {
          headers: {
            "hg-api-token": token
          }
        }); // Replace with your API endpoint
        const result = await response.json();

        if (result.success) {
          setTrackList(result.data); // Update the state with fetched data
        } else {
          console.error("Failed to fetch tracks:", result.message);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  const mapEmojiToFontAwesome = (emojiIcon) => {
    const iconMap = {
      "🤖 🧠": "fa-solid fa-brain",
      "🌐 💻": "fa-solid fa-code",
      "🔐 🛡️": "fa-solid fa-shield-halved",
      "⛓️ 🧩": "fa-solid fa-link",
      "🚀 💡": "fa-solid fa-rocket"
    };

    return iconMap[emojiIcon] || "fa-solid fa-circle-question";
  };

  const handleOpenModal = (track) => {
    console.log("Opening modal for:", track.title); // Debug log
    setActiveTrack(track);
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); // Debug log
    setActiveTrack(null);
  };

  return (
    <section id="domains" className="py-20 md:py-32 bg-cyber-black relative overflow-hidden">
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
          <h2 className="sub-font text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-purple-electric mb-4">
            MISSION_OBJECTIVES
          </h2>
          <h3 className="heading-font text-4xl md:text-7xl font-black text-white uppercase">
            SELECT_SECTOR.
          </h3>
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
                    ${hoveredTrack === idx ? track.shadowColor : ""}
                  `}
                >
                  {/* Tag in top-right corner */}
                  <motion.div
                    className="absolute top-0 right-0 px-3 py-1.5 text-[9px] font-black tracking-widest uppercase sub-font"
                    style={{
                      backgroundColor: track.hexColor,
                      color: "#000000",
                      clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
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
                    animate={{ height: hoveredTrack === idx ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br to-transparent"
                    style={{
                      background: `linear-gradient(to bottom right, ${track.hexColor}10, transparent)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredTrack === idx ? 1 : 0 }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-4"
                      animate={hoveredTrack === idx ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                    <i className={`${mapEmojiToFontAwesome(track.icon)} text-3xl ${track.accent}`}></i>
                    </motion.div>

                    <div className="sub-font text-[10px] font-bold text-neutral-600 mb-2 tracking-[0.3em]">
                      {track.id}
                    </div>
                    <h4
                      className={`heading-font text-xl md:text-2xl font-black mb-4 tracking-tight transition-all uppercase`}
                      style={{ color: hoveredTrack === idx ? track.hexColor : "#ffffff" }}
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
    </section>
  );
};