"use client"
import React, { useState } from 'react';

const rules = [
  'Teams can consist of 1 to 4 members.',
  'All code must be written during the 8-hour hacking window.',
  'Existing projects or pre-built modules are not allowed unless explicitly declared.',
  'Use of open-source libraries and APIs is highly encouraged.',
  'Submissions must include a GitHub repository link and a demo video.',
  'Decisions made by the panel of judges are final and binding.'
];

const faqs = [
  {
    question: 'Who can participate in Cyber Strike?',
    answer: 'The hackathon is open to developers, designers, and innovators globally. You must be at least 18 years old.'
  },
  {
    question: 'Is it a physical or virtual event?',
    answer: 'It is a physical event held at our main campus, with select virtual participation options available.'
  },
  {
    question: 'Are there registration fees?',
    answer: 'No, participation is completely free. However, registration does not guarantee a spot as we vet applications.'
  },
  {
    question: 'What is the selection process?',
    answer: 'We review your GitHub profile, portfolio, and previous experience to ensure a high-quality competitive environment.'
  },
  {
    question: 'What hardware/software is provided?',
    answer: 'On-site participants get high-speed internet, power, and meals. Virtual participants get access to private discord channels.'
  }
];

export const RulesFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 md:py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {/* Rules Section */}
          <div>
            <div className="mb-10 md:mb-12">
              <h2 className="sub-font text-sm font-bold uppercase tracking-[0.3em] text-cyan-neon mb-4">THE_PROTOCOL</h2>
              <h3 className="heading-font text-3xl md:text-4xl font-black text-white uppercase">RULES & ELIGIBILITY.</h3>
            </div>
            <div className="space-y-4 md:space-y-6">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex gap-4 p-4 md:p-5 border border-neutral-900 bg-neutral-900/20 group hover:border-cyan-neon transition-colors">
                  <div className="w-6 h-6 rounded-sm bg-cyan-neon/20 border border-cyan-neon flex-shrink-0 flex items-center justify-center text-[10px] font-black text-cyan-neon">
                    {idx + 1}
                  </div>
                  <p className="sub-font text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="mb-10 md:mb-12">
              <h2 className="sub-font text-sm font-bold uppercase tracking-[0.3em] text-purple-electric mb-4">INQUIRIES</h2>
              <h3 className="heading-font text-3xl md:text-4xl font-black text-white uppercase">FREQUENTLY ASKED.</h3>
            </div>
            <div className="space-y-2 md:space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-neutral-800">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full py-5 md:py-6 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className="sub-font text-base md:text-lg font-bold text-neutral-300 group-hover:text-cyan-neon transition-colors tracking-widest">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-cyan-neon shadow-[0_0_5px_#00E0FF]' : 'text-neutral-600'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="sub-font text-neutral-500 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
