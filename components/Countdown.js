"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Countdown = ({ targetDate, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds }
  ];

  if (compact) {
    return (
      <div className="flex justify-between gap-2">
        {timeUnits.map((unit, idx) => (
          <div key={unit.label} className="flex-1 text-center">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.1, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="heading-font text-xl sm:text-2xl md:text-3xl font-black text-white"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <p className="sub-font text-[7px] sm:text-[8px] text-neutral-500 uppercase tracking-wider mt-0.5">
              {unit.label}
            </p>
            {idx < timeUnits.length - 1 && (
              <motion.span
                className="absolute right-0 top-1/2 -translate-y-1/2 text-cyan-neon/50 text-lg hidden"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
      {timeUnits.map((unit, idx) => (
        <div key={unit.label} className="relative text-center">
          <div className="p-3 sm:p-4 md:p-6 border border-neutral-800 bg-black/50 backdrop-blur-sm rounded-lg relative overflow-hidden group">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="heading-font text-2xl sm:text-3xl md:text-5xl font-black text-white relative z-10"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
          </div>
          <p className="sub-font text-[8px] sm:text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em] mt-2">
            {unit.label}
          </p>
          
          {idx < timeUnits.length - 1 && (
            <motion.span
              className="absolute -right-2 sm:-right-3 top-1/3 text-cyan-neon text-xl sm:text-2xl font-bold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              :
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Countdown;