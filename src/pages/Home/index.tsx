import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { Achievement } from '../../types';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const aRes = await api.getAchievements();
        setAchievements(aRes);
      } catch (err) {
        console.error('Failed to load achievements:', err);
      }
    }
    loadAchievements();
  }, []);

  const faqs = [
    {
      q: 'Do I need prior coding experience to join?',
      a: 'We offer tracks tailored for beginners as well as intermediate engineering students. Every track starts with fundamentals before advancing to live projects and cloud deployment.',
    },
    {
      q: 'What is the schedule for live batches and lab sessions?',
      a: 'Batches are structured for college students with flexible weekend interactive classes and weekday evening lab mentorship to balance university schedules.',
    },
    {
      q: 'How does the hands-on project evaluation work?',
      a: 'Students submit real Git repositories with Docker configurations. Our technical mentors review code quality, architecture, and provide line-by-line feedback.',
    },
    {
      q: 'Can colleges partner with KARPI for campus seminars?',
      a: 'Yes, we collaborate directly with computer science departments and placement cells to conduct 1-day or 2-day on-campus technical workshops and bootcamps.',
    },
  ];

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. DARK HERO SECTION WITH FULL SCREEN VIEWPORT HEIGHT (min-h-[calc(100vh-4rem)])
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden border-b border-[#1E232B]">
        {/* Subtle radial luminous glow matching Dribbble reference */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] lg:w-[900px] h-[340px] sm:h-[500px] bg-[#1656B6]/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto">
          {/* Pill Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0D11] border border-[#1E232B] text-[10px] sm:text-xs font-bold tracking-widest text-[#A0B6D6] uppercase max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3686C4] shrink-0"></span>
            <span className="truncate">ENGINEERING & IT LEARNING PLATFORM</span>
          </div>

          {/* Headline with responsive fluid typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] max-w-4xl">
            Learn Technology to Build Practical Skills & Growth.
          </h1>

          {/* Purpose Statement */}
          <p className="text-xs sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2 font-normal">
            An educational initiative dedicated to helping college students, graduates, and aspiring IT engineers master applied coding, cloud architectures, and career readiness.
          </p>

          {/* Responsive Actions */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => handleOpenEnquiry('Platform Registration')}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#030405] hover:bg-[#3686C4] hover:text-white transition-all duration-200 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-white/5 w-full sm:w-auto"
            >
              <span>ENROL & COMMIT TODAY</span>
              <span className="w-5 h-5 rounded-full bg-[#030405] text-white group-hover:bg-white group-hover:text-[#030405] flex items-center justify-center transition-colors">
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#1E232B] hover:border-[#3686C4] text-[#A0B6D6] hover:text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors w-full sm:w-auto"
            >
              <span>EXPLORE TRACKS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PURPOSE & PILLARS: FOCUSED ON SKILLS (WHITE SECTION)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white text-[#030405] py-14 sm:py-20 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Headline */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1656B6] uppercase block">
                OUR CORE PURPOSE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#030405] tracking-tight leading-tight">
                Focused on Practical Skills, Not Academic Clutter.
              </h2>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed max-w-md">
                We remove the gap between university syllabus and real engineering jobs. In minutes, students transition from reading theories to writing deployable production code.
              </p>
            </div>

            {/* Right Numbered List */}
            <div className="lg:col-span-7 divide-y divide-[#E2E2E2] border-t border-b border-[#E2E2E2]">
              <div className="py-3.5 sm:py-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#626262] shrink-0">01</span>
                <span className="text-xs sm:text-sm font-bold text-[#030405] flex-1">
                  Hands-on Project Pedagogy: <strong className="font-extrabold text-[#1656B6] block sm:inline">CODE OVER SLIDES</strong>
                </span>
                <span className="text-xs text-[#626262] shrink-0">+</span>
              </div>
              <div className="py-3.5 sm:py-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#626262] shrink-0">02</span>
                <span className="text-xs sm:text-sm font-bold text-[#030405] flex-1">
                  Core Languages & DSA: <strong className="font-extrabold text-[#1656B6] block sm:inline">C, C++, PYTHON, OOPs</strong>
                </span>
                <span className="text-xs text-[#626262] shrink-0">+</span>
              </div>
              <div className="py-3.5 sm:py-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#626262] shrink-0">03</span>
                <span className="text-xs sm:text-sm font-bold text-[#030405] flex-1">
                  Cloud Infrastructure: <strong className="font-extrabold text-[#1656B6] block sm:inline">AWS, AZURE, DOCKER & GITHUB</strong>
                </span>
                <span className="text-xs text-[#626262] shrink-0">+</span>
              </div>
              <div className="py-3.5 sm:py-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#626262] shrink-0">04</span>
                <span className="text-xs sm:text-sm font-bold text-[#030405] flex-1">
                  Interview Readiness: <strong className="font-extrabold text-[#1656B6] block sm:inline">SYSTEM DESIGN & CODE REVIEWS</strong>
                </span>
                <span className="text-xs text-[#626262] shrink-0">+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WHY STUDENTS CHOOSE KARPI (4 KEY METRICS)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white text-[#030405] py-14 sm:py-20 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1656B6] uppercase block mb-1">
                DEMONSTRATED IMPACT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#030405] tracking-tight">
                Why Students Commit to KARPI.
              </h2>
            </div>
            <p className="text-xs text-[#626262] max-w-xs">
              Delivering verified outcomes and structured engineering confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2 divide-y-0 sm:divide-x divide-[#E2E2E2]">
            <div className="sm:pr-6 space-y-2 sm:space-y-4">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#626262] block">PORTFOLIO PROJECTS</span>
              <p className="text-[11px] sm:text-xs text-[#626262] leading-relaxed hidden sm:block">
                Build tangible software systems and microservices deployed live on cloud servers.
              </p>
              <div>
                <span className="text-2xl sm:text-4xl font-black text-[#030405] tracking-tight block">
                  1,500+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#626262] uppercase font-bold mt-0.5 block">Students Mentored</span>
              </div>
            </div>

            <div className="sm:px-6 space-y-2 sm:space-y-4">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#626262] block">CAMPUS ENGAGEMENT</span>
              <p className="text-[11px] sm:text-xs text-[#626262] leading-relaxed hidden sm:block">
                Conducted technical guest seminars and hands-on workshops in engineering colleges.
              </p>
              <div>
                <span className="text-2xl sm:text-4xl font-black text-[#030405] tracking-tight block">
                  50+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#626262] uppercase font-bold mt-0.5 block">College Seminars</span>
              </div>
            </div>

            <div className="sm:px-6 space-y-2 sm:space-y-4">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#626262] block">LAB SATISFACTION</span>
              <p className="text-[11px] sm:text-xs text-[#626262] leading-relaxed hidden sm:block">
                Students successfully deploying end-to-end full-stack capstone projects.
              </p>
              <div>
                <span className="text-2xl sm:text-4xl font-black text-[#030405] tracking-tight block">
                  94%
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#626262] uppercase font-bold mt-0.5 block">Lab Success Score</span>
              </div>
            </div>

            <div className="sm:pl-6 space-y-2 sm:space-y-4">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#626262] block">SPECIALIZED TRACKS</span>
              <p className="text-[11px] sm:text-xs text-[#626262] leading-relaxed hidden sm:block">
                Curricula aligned with modern IT jobs across Web, Cloud, DevOps, and Algorithms.
              </p>
              <div>
                <span className="text-2xl sm:text-4xl font-black text-[#030405] tracking-tight block">
                  18+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#626262] uppercase font-bold mt-0.5 block">Available Tracks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. THE 4-STEP LEARNING JOURNEY (DARK BENTO CARDS)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#030405] text-[#F8FAFC] py-14 sm:py-20 border-b border-[#1E232B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#3686C4] uppercase block">
              STUDENT ROADMAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              From Interest to Job-Ready in 4 Steps.
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              A proven four-stage discipline guiding your growth into software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#3686C4] tracking-widest uppercase block mb-2 sm:mb-3">01 / Discover</span>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-white">Identify Interests</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Explore tech specializations through free webinars, campus seminars, and counseling.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#1E232B] text-[10px] sm:text-[11px] font-semibold text-[#A0B6D6]">
                Track Roadmaps
              </div>
            </div>

            <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#3686C4] tracking-widest uppercase block mb-2 sm:mb-3">02 / Learn</span>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-white">Active Mentorship</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Attend structured live online or in-person batches led by practicing software engineers.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#1E232B] text-[10px] sm:text-[11px] font-semibold text-[#A0B6D6]">
                Interactive Coding
              </div>
            </div>

            <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#3686C4] tracking-widest uppercase block mb-2 sm:mb-3">03 / Build</span>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-white">Project Portfolio</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Develop production-grade capstone projects, containerize with Docker, and deploy live.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#1E232B] text-[10px] sm:text-[11px] font-semibold text-[#A0B6D6]">
                GitHub & Cloud Repos
              </div>
            </div>

            <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#3686C4] tracking-widest uppercase block mb-2 sm:mb-3">04 / Grow</span>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-white">Career Guidance</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Refine technical resumes, participate in mock interviews, and prepare for placements.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#1E232B] text-[10px] sm:text-[11px] font-semibold text-[#A0B6D6]">
                Recruitment Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. NAVIGATION TILES TO DEDICATED PAGES (WHITE BENTO)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white text-[#030405] py-14 sm:py-20 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1656B6] uppercase block">
              DEDICATED EXPLORATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#030405] tracking-tight">
              Explore Our Dedicated Portals
            </h2>
            <p className="text-xs sm:text-sm text-[#626262]">
              Visit dedicated pages for complete curriculum details, learning formats, campus events, and our story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link
              to="/courses"
              className="group p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E2E2] hover:border-[#1656B6] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#1656B6] uppercase block mb-1.5">CATALOG</span>
                <h3 className="text-base sm:text-lg font-black text-[#030405] group-hover:text-[#1656B6] transition-colors mb-2">
                  All Courses
                </h3>
                <p className="text-xs text-[#626262] leading-relaxed">
                  Full syllabi, skills, prerequisites, and hands-on lab breakdowns for all tracks.
                </p>
              </div>
              <div className="pt-3 mt-4 sm:mt-6 border-t border-[#E2E2E2] flex items-center justify-between text-xs font-bold text-[#1656B6]">
                <span>View Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/programs"
              className="group p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E2E2] hover:border-[#1656B6] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#1656B6] uppercase block mb-1.5">FORMATS</span>
                <h3 className="text-base sm:text-lg font-black text-[#030405] group-hover:text-[#1656B6] transition-colors mb-2">
                  Programs & Services
                </h3>
                <p className="text-xs text-[#626262] leading-relaxed">
                  Online Live Classes, Offline Coaching, Technical Seminars, and Career Guidance.
                </p>
              </div>
              <div className="pt-3 mt-4 sm:mt-6 border-t border-[#E2E2E2] flex items-center justify-between text-xs font-bold text-[#1656B6]">
                <span>View Programs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/events"
              className="group p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E2E2] hover:border-[#1656B6] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#1656B6] uppercase block mb-1.5">CALENDAR</span>
                <h3 className="text-base sm:text-lg font-black text-[#030405] group-hover:text-[#1656B6] transition-colors mb-2">
                  Events & Seminars
                </h3>
                <p className="text-xs text-[#626262] leading-relaxed">
                  Upcoming technical webinars, college guest sessions, and weekend coding workshops.
                </p>
              </div>
              <div className="pt-3 mt-4 sm:mt-6 border-t border-[#E2E2E2] flex items-center justify-between text-xs font-bold text-[#1656B6]">
                <span>View Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/about"
              className="group p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E2E2] hover:border-[#1656B6] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#1656B6] uppercase block mb-1.5">INITIATIVE</span>
                <h3 className="text-base sm:text-lg font-black text-[#030405] group-hover:text-[#1656B6] transition-colors mb-2">
                  About Us & Contact
                </h3>
                <p className="text-xs text-[#626262] leading-relaxed">
                  Our mission, values, authentic activity gallery, and campus contact details.
                </p>
              </div>
              <div className="pt-3 mt-4 sm:mt-6 border-t border-[#E2E2E2] flex items-center justify-between text-xs font-bold text-[#1656B6]">
                <span>Learn About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FREQUENTLY ASKED QUESTIONS (LIGHT ACCORDION)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white text-[#030405] py-14 sm:py-20 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1656B6] uppercase block">
                QUESTIONS & CLARIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#030405] tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                Everything you need to know about joining KARPI, hands-on lab access, and offline coaching centers.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E2E2E2] border-t border-b border-[#E2E2E2]">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-3.5 sm:py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#030405] hover:text-[#1656B6] transition-colors gap-3"
                    >
                      <span className="flex items-center gap-2.5 sm:gap-3">
                        <span className="font-mono text-xs text-[#626262] shrink-0">0{idx + 1}</span>
                        <span className="leading-snug">{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#1656B6] shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2.5 pl-6 sm:pl-7 text-xs text-[#626262] leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FINAL CALL TO ACTION (DARK BENTO CONTAINER)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#030405] py-14 sm:py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#0B0D11] border border-[#1E232B] p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-bento-dark text-center lg:text-left">
            <div className="max-w-xl space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3686C4]">
                COMMIT TO YOUR CAREER
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Your Next Step in Technology Starts Here.
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Connect with our academic team to explore course syllabi, verify batch timings, or enroll in upcoming programs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => handleOpenEnquiry('General Learning Registration')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#030405] hover:bg-[#3686C4] hover:text-white transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>REGISTER / ENROL NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/about#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#1E232B] hover:border-[#3686C4] text-[#A0B6D6] hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-center"
              >
                CAMPUS INQUIRIES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
