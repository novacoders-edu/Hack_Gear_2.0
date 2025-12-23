"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Team Alpha',
    project: 'Neural Network Visualizer',
    quote: 'HackGear pushed us to build something we never thought possible in 8 hours. The mentors were incredible!',
    year: '2024',
    prize: '1st Place',
    image: '/user.jpg'
  },
  {
    id: 2,
    name: 'Team ByteForce',
    project: 'Eco-Track App',
    quote: 'The energy at HackGear is unmatched. We came as strangers and left as a team ready to change the world.',
    year: '2024',
    prize: '2nd Place',
    image: '/user.jpg'
  },
  {
    id: 3,
    name: 'Team Quantum',
    project: 'AR Study Buddy',
    quote: 'Best hackathon experience ever! The problem statements were challenging but achievable.',
    year: '2024',
    prize: 'Best Innovation',
    image: '/user.jpg'
  }
];

export const PastWinners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 md:py-24 bg-cyber-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-neon rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-electric rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-purple-electric"></span>
            <h2 className="sub-font text-sm font-bold uppercase tracking-[0.5em] text-purple-electric">HALL_OF_FAME</h2>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-purple-electric"></span>
          </div>
          <h3 className="heading-font text-3xl md:text-5xl font-black text-white">
            PAST CHAMPIONS<span className="text-purple-electric">.</span>
          </h3>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] md:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="p-6 md:p-10 border border-neutral-800 bg-black/60 backdrop-blur-sm relative overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-purple-electric/30"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-cyan-neon/30"></div>

                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-purple-electric">
                        <img 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-purple-electric text-black text-xs font-bold">
                        {testimonials[currentIndex].prize}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="mb-4">
                        <span className="sub-font text-xs text-cyan-neon tracking-widest">{testimonials[currentIndex].year}</span>
                      </div>
                      
                      <blockquote className="sub-font text-lg md:text-xl text-neutral-300 italic mb-6 leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </blockquote>
                      
                      <div>
                        <h4 className="heading-font text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
                        <p className="sub-font text-sm text-neutral-500">{testimonials[currentIndex].project}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-purple-electric shadow-[0_0_10px_#4D00FF] scale-125' 
                    : 'bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
