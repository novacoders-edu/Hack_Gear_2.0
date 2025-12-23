"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, color: 'cyan-neon' },
    { label: 'HOURS', value: timeLeft.hours, color: 'purple-electric' },
    { label: 'MINS', value: timeLeft.minutes, color: 'matrix-green' },
    { label: 'SECS', value: timeLeft.seconds, color: 'white' }
  ];

  if (!isClient) return null;

  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-3 md:gap-4">
      {timeUnits.map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative"
        >
          <div className={`
            relative p-2 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[70px] md:min-w-[80px]
            border border-neutral-700 bg-black/60 backdrop-blur-sm rounded
            hover:border-cyan-neon/50 transition-all duration-300
          `}>
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-neon/50"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-neon/50"></div>
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-neon/50"></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-neon/50"></div>
            
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`heading-font text-2xl sm:text-3xl md:text-4xl font-black text-center`}
              style={{
                color: unit.color === 'cyan-neon' ? '#00E0FF' :
                       unit.color === 'purple-electric' ? '#4D00FF' :
                       unit.color === 'matrix-green' ? '#00FF41' : '#fff',
                textShadow: unit.color === 'cyan-neon' ? '0 0 15px #00E0FF' :
                           unit.color === 'purple-electric' ? '0 0 15px #4D00FF' :
                           unit.color === 'matrix-green' ? '0 0 15px #00FF41' : '0 0 15px #fff'
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            
            <div className="sub-font text-[8px] sm:text-[9px] md:text-[10px] text-neutral-500 text-center mt-1 tracking-[0.2em]">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
