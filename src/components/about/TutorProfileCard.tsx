import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Code, CheckCircle } from 'lucide-react';

interface TutorProfileCardProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({ onOpenEnquiry }) => {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [isInCenter1, setIsInCenter1] = useState(false);
  const [isInCenter2, setIsInCenter2] = useState(false);

  useEffect(() => {
    // Only apply viewport-center scroll detection on mobile (< 768px)
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsInCenter1(false);
        setIsInCenter2(false);
        return;
      }

      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportCenter = windowHeight / 2;
      const tolerance = windowHeight * 0.25;

      if (containerRef1.current) {
        const rect1 = containerRef1.current.getBoundingClientRect();
        const elementCenter1 = rect1.top + rect1.height / 2;
        setIsInCenter1(Math.abs(elementCenter1 - viewportCenter) < tolerance);
      }

      if (containerRef2.current) {
        const rect2 = containerRef2.current.getBoundingClientRect();
        const elementCenter2 = rect2.top + rect2.height / 2;
        setIsInCenter2(Math.abs(elementCenter2 - viewportCenter) < tolerance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-white text-[#030405] py-4 sm:py-8 space-y-16 sm:space-y-24 divide-y divide-slate-100">
      {/* ─────────────────────────────────────────────────────────────
          1. PRINCIPAL FACULTY: ANANDHAN RAMASAMY
         ───────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef1}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center pt-4"
      >
        {/* Photo with hand-drawn square sketch frame */}
        <div className="md:col-span-5 flex flex-col items-center justify-center pt-8 sm:pt-10">
          <div className="relative group/tutor cursor-pointer w-64 sm:w-72 md:w-80 aspect-square flex items-center justify-center p-3 select-none">
            {/* Soft luminous aura on hover */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-[#1656B6]/20 to-[#3686C4]/20 blur-xl opacity-0 group-hover/tutor:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Hand-drawn Sketch Organic Frame */}
            <svg
              className="absolute inset-0 w-full h-full text-slate-800 pointer-events-none group-hover/tutor:text-[#1656B6] transition-all duration-500 transform group-hover/tutor:scale-[1.02]"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 22 28 C 75 22, 225 24, 278 26 C 283 80, 276 220, 275 274 C 220 278, 80 274, 25 272 C 20 215, 24 85, 22 28 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26 23 C 82 27, 218 20, 274 30 C 280 88, 272 212, 279 270 C 215 273, 85 279, 21 268 C 26 222, 19 82, 26 23 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <path d="M 16 38 C 18 20, 22 16, 40 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 260 18 C 278 19, 282 24, 284 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 284 258 C 282 276, 276 282, 258 284" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 38 284 C 20 282, 16 276, 17 258" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Photo Pop-out zoom beyond frame */}
            <div className="relative z-10 w-[86%] h-[86%] overflow-visible flex items-end justify-center pointer-events-none">
              <img
                src="/images/tutor-lead.png"
                alt="Anandhan Ramasamy - KARPI Principal Faculty & Industry Mentor"
                className={`w-[112%] max-w-none h-auto object-contain object-bottom -mb-2 transition-all duration-500 ease-out transform origin-bottom group-hover/tutor:scale-120 group-hover/tutor:-translate-y-3 drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] ${
                  isInCenter1
                    ? 'grayscale-0 contrast-105 brightness-105 scale-105 -translate-y-1'
                    : 'grayscale md:group-hover/tutor:grayscale-0 contrast-110 md:group-hover/tutor:contrast-105'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bio & Credibility */}
        <div className="md:col-span-7 space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] text-[10px] sm:text-xs font-bold tracking-widest text-[#1656B6] uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Principal Faculty & Technical Architect</span>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#030405] tracking-tight leading-tight">
                Anandhan Ramasamy
              </h3>
              <p className="text-sm sm:text-base font-extrabold text-[#1656B6] mt-1 tracking-wide">
                20+ Years Software Industrial Experience
              </p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Mastery in Systems Programming, Distributed Architecture, Cloud & Engineering Leadership.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
            Leading KARPI’s technical curriculum with over two decades of production software development, architecting high-scale enterprise distributed platforms, and coaching next-generation engineering talent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>C, C++, Data Structures & Algorithms</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>Object-Oriented Design & Python</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>AWS Cloud, Azure & Microservices</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>Production Code Reviews & 1-on-1 Mentorship</span>
            </div>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Mentorship with Anandhan Ramasamy')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0A2460] text-white hover:bg-[#1656B6] transition-all text-xs font-extrabold tracking-wider uppercase shadow-md active:scale-95"
            >
              <Code className="w-3.5 h-3.5" />
              <span>LEARN UNDER HIS MENTORSHIP</span>
            </button>
            <div className="text-[11px] text-[#626262] font-medium">
              Direct access during offline coaching & live online labs.
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TUTOR: MOHANKUMAR SARASWATHY
         ───────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef2}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center pt-12 sm:pt-16"
      >
        {/* Photo with hand-drawn square sketch frame */}
        <div className="md:col-span-5 flex flex-col items-center justify-center pt-8 sm:pt-10">
          <div className="relative group/tutor cursor-pointer w-64 sm:w-72 md:w-80 aspect-square flex items-center justify-center p-3 select-none">
            {/* Soft luminous aura on hover */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-[#1656B6]/20 to-[#3686C4]/20 blur-xl opacity-0 group-hover/tutor:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Hand-drawn Sketch Organic Frame */}
            <svg
              className="absolute inset-0 w-full h-full text-slate-800 pointer-events-none group-hover/tutor:text-[#1656B6] transition-all duration-500 transform group-hover/tutor:scale-[1.02]"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 22 28 C 75 22, 225 24, 278 26 C 283 80, 276 220, 275 274 C 220 278, 80 274, 25 272 C 20 215, 24 85, 22 28 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26 23 C 82 27, 218 20, 274 30 C 280 88, 272 212, 279 270 C 215 273, 85 279, 21 268 C 26 222, 19 82, 26 23 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <path d="M 16 38 C 18 20, 22 16, 40 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 260 18 C 278 19, 282 24, 284 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 284 258 C 282 276, 276 282, 258 284" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 38 284 C 20 282, 16 276, 17 258" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Photo Pop-out zoom beyond frame */}
            <div className="relative z-10 w-[86%] h-[86%] overflow-visible flex items-end justify-center pointer-events-none">
              <img
                src="/images/tutor-mohankumar.png"
                alt="Mohankumar Saraswathy - KARPI Cloud & DevOps Tutor"
                className={`w-[114%] max-w-none h-auto object-contain object-bottom -mb-2 transition-all duration-500 ease-out transform origin-bottom group-hover/tutor:scale-120 group-hover/tutor:-translate-y-3 drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] ${
                  isInCenter2
                    ? 'grayscale-0 contrast-105 brightness-105 scale-105 -translate-y-1'
                    : 'grayscale md:group-hover/tutor:grayscale-0 contrast-110 md:group-hover/tutor:contrast-105'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bio & Credibility */}
        <div className="md:col-span-7 space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] text-[10px] sm:text-xs font-bold tracking-widest text-[#1656B6] uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Tutor – Cloud Infrastructure & DevOps</span>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#030405] tracking-tight leading-tight">
                Mohankumar Saraswathy
              </h3>
              <p className="text-sm sm:text-base font-extrabold text-[#1656B6] mt-1 tracking-wide">
                6+ Years of Experience
              </p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Specialized in AWS Cloud, Docker Containers, Git Version Control & Linux Shell Scripting.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
            Guiding students through hands-on cloud labs, containerized workflow deployments, and automating environments with shell scripting to build industry-ready DevOps capabilities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>AWS Cloud Architecture & VPC</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>Docker Containerization & Microservices</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>Git & GitHub Version Control Workflows</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#030405] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0" />
              <span>Linux System Administration & Scripting</span>
            </div>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Cloud & DevOps Training with Mohankumar Saraswathy')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0A2460] text-white hover:bg-[#1656B6] transition-all text-xs font-extrabold tracking-wider uppercase shadow-md active:scale-95"
            >
              <Code className="w-3.5 h-3.5" />
              <span>JOIN HIS CLOUD & DEVOPS LABS</span>
            </button>
            <div className="text-[11px] text-[#626262] font-medium">
              Practical hands-on terminal coaching & live cloud labs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
