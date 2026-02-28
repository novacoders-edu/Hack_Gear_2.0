import React from 'react';

const SPONSORS = {
  platinum: [
    {
      id: 1,
      name: 'Where U Elevate',
      url: 'https://www.linkedin.com/company/whereuelevate/',
      tag: 'Software Development',
      image: '/cp/whereuelevate.jpg'
    },
    {
      id: 2,
      name: 'TechieHelp',
      url: 'https://www.linkedin.com/company/techiehelp/',
      tag: 'IT Service and IT Consulting',
      image: '/cp/techiehelp.jpg'
    },
    {
      id: 3,
      name: 'Unstop',
      url: "https://www.linkedin.com/company/unstop/",
      tag: 'Technology, Information and Internet',
      image: '/cp/unstop.jpg'
    },
    {
      id: 4,
      name: 'BeeStack',
      url: "https://www.linkedin.com/company/unstop/",
      tag: 'Software Development',
      image: '/cp/beestack.jpg'
    },
    {
      id: 5,
      name: 'Interview Buddy',
      url: "https://www.linkedin.com/company/interviewbuddy/",
      tag: 'Technology, Information and Internet',
      image: '/cp/interviewbuddy.jpg'
    },
    {
      id: 6,
      name: 'Interview Buddy',
      url: "https://www.linkedin.com/company/interviewbuddy/",
      tag: 'Technology, Information and Internet',
      image: '/cp/interviewbuddy.jpg'
    },
    {
      id: 7,
      name: 'Devfolio',
      url: "https://www.linkedin.com/company/devfolio/",
      tag: 'Technology, Information and Internet',
      image: '/cp/devfolio.jpg'
    },
    {
      id: 8,
      name: 'Digimation Flight',
      url: "https://www.linkedin.com/company/digimationflight/",
      tag: 'Education',
      image: '/cp/digimation.jpg'
    },
    {
      id: 9,
      name: 'HexSoftwares',
      url: "https://www.linkedin.com/company/hexsoftwares/",
      tag: 'IT Services and IT Consulting',
      image: '/cp/hfxsoftware.jpg'
    },
    {
      id: 10,
      name: 'TruScholar',
      url: "https://www.linkedin.com/company/truscholar/",
      tag: 'Education Administration Programs',
      image: '/cp/truscholar.jpg'
    },
  ],
  community: [
    {
      id: 1,
      name: 'Coder Corps',
      url: 'https://www.linkedin.com/company/codercorps',
      tag: 'Community_Services',
      image: '/cp/codercorps.jpg'
    },
    {
      id: 2,
      name: 'The Student Spot',
      url: 'https://www.linkedin.com/company/thestudentspot',
      tag: 'Higher_Education',
      image: '/cp/studentspot.jpg'
    },
    {
      id: 3,
      name: 'Events INFO',
      url: 'https://www.linkedin.com/company/eventsinfo',
      tag: 'IT_Services_and_IT_Consulting',
      image: '/cp/eventsinfo.jpg'
    },
    {
      id: 4,
      name: 'Web 3 Aligarh',
      url: 'https://www.instagram.com/web3aligarh/',
      tag: 'Web_3_Aligarh',
      image: '/cp/web3aligarh.jpg'
    },
    {
      id: 5,
      name: 'React Aligarh',
      url: 'https://www.reactaligarh.com/',
      tag: 'Namaste_Aligarh Unlocking_Talent',
      image: '/cp/reactaligarh.png'
    },
    {
      id: 6,
      name: 'Hack Loop',
      url: 'https://www.linkedin.com/company/hackloop',
      tag: 'Technology, Information and Internet',
      image: '/cp/hackloop.jpg'
    },
    {
      id: 7,
      name: 'Nerds Room',
      url: 'https://www.linkedin.com/company/nerds-room',
      tag: 'Education',
      image: '/cp/nerdsroom.jpg'
    },
    {
      id: 8,
      name: 'So Called So CS Engineers',
      url: 'https://www.linkedin.com/company/so-called-cs-engineers/',
      tag: 'Education',
      image: '/cp/sccse.jpg'
    },
    {
      id: 9,
      name: 'Code Rangers',
      url: 'https://www.linkedin.com/company/code-rangerss/',
      tag: 'Technology, Information and Internet',
      image: '/cp/coderangers.jpg'
    },
  ]
};

export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 md:py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="sub-font text-xs font-bold uppercase tracking-[0.5em] text-cyan-neon mb-4">STRATEGIC_NODES</h2>
          <h3 className="heading-font text-3xl md:text-4xl font-black text-white uppercase tracking-tight">SUPPORTING THE ECOSYSTEM.</h3>
        </div>

        {/* Tier 1: Platinum */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="sub-font text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Platinum_Registry</span>
            <div className="flex-grow h-px bg-neutral-800"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {SPONSORS.platinum.map(sponsor => (
              <a
                key={sponsor.id}
                href={sponsor.url}
                className="h-32 md:h-40 bg-neutral-900/30 border border-neutral-800 flex flex-col items-center justify-center gap-2 group hover:border-cyan-neon/50 transition-all hover:bg-neutral-900/60 p-4"
              >
                {/* Image container */}
                <div className="w-12 h-12 md:w-16 md:h-16 mb-2 flex items-center justify-center">
                  <img
                    src={sponsor.image}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      // Show fallback text if image fails to load
                      e.target.parentElement.innerHTML += `<span class="sub-font text-xs md:text-sm font-black uppercase tracking-widest text-neutral-300 group-hover:text-cyan-neon">${sponsor.name}</span>`;
                    }}
                  />
                </div>
                {/* Sponsor Name */}
                <span className="sub-font text-xs md:text-sm font-bold uppercase tracking-wider text-white group-hover:text-cyan-neon transition-colors text-center">
                  {sponsor.name}
                </span>
                <span className="sub-font text-[8px] uppercase tracking-[0.3em] text-neutral-500 group-hover:text-cyan-neon/50 transition-colors text-center">
                  [{sponsor.tag}]
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Tier 3: Community Partners */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="sub-font text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Community_Partners</span>
            <div className="flex-grow h-px bg-neutral-800"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {SPONSORS.community.map(partner => (
              <a
                key={partner.id}
                href={partner.url}
                className="h-20 md:h-24 bg-neutral-900/20 border border-neutral-800/60 flex flex-col items-center justify-center gap-1 group hover:border-green-400/50 transition-all hover:bg-neutral-900/40 p-2"
              >
                {/* Image container */}
                <div className="w-8 h-8 md:w-10 md:h-10 mb-1 flex items-center justify-center">
                  <img
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      // Show fallback text if image fails to load
                      e.target.parentElement.innerHTML += `<span class="sub-font text-[9px] md:text-[10px] font-black uppercase tracking-wider text-neutral-400 group-hover:text-green-400">${partner.name}</span>`;
                    }}
                  />
                </div>
                 <span className="sub-font text-xs md:text-sm font-bold tracking-wider text-white group-hover:text-cyan-neon transition-colors text-center">
                  {partner.name}
                </span>
                <span className="sub-font text-[7px] uppercase tracking-[0.2em] text-neutral-700 group-hover:text-green-400/50 transition-colors">
                  {partner.type}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="sub-font text-[9px] uppercase tracking-[0.4em] text-neutral-600">
            Become part of the network
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="sub-font text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-cyan-neon transition-colors border-b border-transparent hover:border-cyan-neon pb-1">
              Interested in sponsoring? Get in touch
            </button>
            <span className="hidden sm:block text-neutral-700">|</span>
            <button className="sub-font text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-green-400 transition-colors border-b border-transparent hover:border-green-400 pb-1">
              Become a community partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};