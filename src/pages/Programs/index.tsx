import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Program } from '../../types';
import { Button } from '../../components/common/Button';
import { useOutletContext } from 'react-router-dom';
import {
  Video,
  Building2,
  MonitorPlay,
  GraduationCap,
  Wrench,
  Compass,
  CheckCircle
} from 'lucide-react';

export const Programs: React.FC = () => {
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await api.getPrograms();
        setPrograms(data);
      } catch (err) {
        console.error('Failed to load programs:', err);
      }
    }
    loadPrograms();
  }, []);

  const getProgramIcon = (type: string) => {
    if (type.includes('Online')) return <Video className="w-5 h-5 text-[#1656B6]" />;
    if (type.includes('Offline')) return <Building2 className="w-5 h-5 text-[#3686C4]" />;
    if (type.includes('Webinar')) return <MonitorPlay className="w-5 h-5 text-[#0A2460]" />;
    if (type.includes('Seminar')) return <GraduationCap className="w-5 h-5 text-[#1656B6]" />;
    if (type.includes('Workshop')) return <Wrench className="w-5 h-5 text-[#3686C4]" />;
    return <Compass className="w-5 h-5 text-[#0A2460]" />;
  };

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* Dark Header */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#1E232B] text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-2 sm:mb-3">
            Learning Ecosystem
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Programs & Services
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed px-2">
            Structured educational initiatives designed to guide students from foundational knowledge to professional engineering competence.
          </p>
        </div>
      </section>

      {/* Light Bento Cards */}
      <div className="bg-[#F8FAFC] text-[#030405] py-10 sm:py-16 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              id={prog.slug}
              className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E2E2E2] shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Text Info */}
              <div className="lg:col-span-8 space-y-3 sm:space-y-3.5 order-2 lg:order-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F1F5F9] border border-[#E2E2E2] flex items-center justify-center shrink-0">
                    {getProgramIcon(prog.type)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1656B6]">
                    {prog.type}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl font-extrabold text-[#030405]">
                  {prog.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  {prog.detailedDescription || prog.shortDescription}
                </p>

                {/* Highlights */}
                {prog.keyHighlights && prog.keyHighlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {prog.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-[#030405]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1656B6] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-4 text-xs text-[#626262]">
                  <span>Delivery Model: <strong className="text-[#030405]">{prog.deliveryFormat}</strong></span>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenEnquiry(`Program: ${prog.title}`)}
                    className="w-full sm:w-auto"
                  >
                    Enquire About Program
                  </Button>
                </div>
              </div>

              {/* Visual Thumbnail */}
              <div className="lg:col-span-4 order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden border border-[#E2E2E2] aspect-[16/10] bg-slate-900 shadow-subtle">
                  <img
                    src={prog.bannerUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
