import React from 'react';

export interface TechSkill {
  name: string;
  category: string;
  logo: string;
}

export const MAIN_LEARNING_COURSES: TechSkill[] = [
  {
    name: 'C Programming',
    category: 'System Programming',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  },
  {
    name: 'C++',
    category: 'High Performance & STL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Python',
    category: 'Backend & Automation',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  {
    name: 'Data Structures & Algorithms',
    category: 'Problem Solving & LeetCode',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thealgorithms/thealgorithms-original.svg',
  },
  {
    name: 'OOPs',
    category: 'Object Oriented Architecture',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  },
  {
    name: 'JavaScript',
    category: 'Modern Web Engineering',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    name: 'AWS Cloud',
    category: 'Solutions Architecture & VPC',
    logo: '/icons/aws.svg',
  },
  {
    name: 'Microsoft Azure',
    category: 'Cloud Services & DevOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
  },
  {
    name: 'Docker',
    category: 'Containers & Microservices',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    name: 'GitHub',
    category: 'GitOps & Version Control',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  },
];

export const TechTicker: React.FC = () => {
  // Duplicate array for an infinite seamless scroll
  const tickerItems = [...MAIN_LEARNING_COURSES, ...MAIN_LEARNING_COURSES];

  return (
    <div className="relative w-full overflow-hidden py-3.5 sm:py-4 border-y border-[#1E232B] bg-[#07090D]">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#07090D] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#07090D] to-transparent z-10 pointer-events-none"></div>

      {/* Infinite scrolling ribbon */}
      <div className="animate-marquee flex items-center gap-3 sm:gap-5">
        {tickerItems.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0E1117] border border-[#1E232B] hover:border-[#3686C4]/60 transition-colors shrink-0 shadow-sm"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 p-1 flex items-center justify-center shrink-0">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-full h-full object-contain filter drop-shadow-sm"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#A0B6D6] uppercase tracking-wider whitespace-nowrap">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
