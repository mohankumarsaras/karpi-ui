import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EventItem } from '../../types';
import { Button } from '../../components/common/Button';
import { useOutletContext } from 'react-router-dom';
import { Calendar, MapPin, Video, User } from 'lucide-react';

export const Events: React.FC = () => {
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'All'>('Upcoming');
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await api.getEvents({
          status: activeTab === 'All' ? undefined : activeTab,
          type: selectedType || undefined,
        });
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [activeTab, selectedType]);

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* Dark Header */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#1E232B] text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-2 sm:mb-3">
            Sessions & Masterclasses
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Webinars & Campus Seminars
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed px-2">
            Interactive sessions led by experienced software engineers on emerging technologies and placement strategies.
          </p>
        </div>
      </section>

      {/* Light Content Area */}
      <div className="bg-[#F8FAFC] text-[#030405] py-10 sm:py-16 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E2E2E2] shadow-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl w-full sm:w-auto">
              {(['Upcoming', 'Completed', 'All'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors text-center ${
                    activeTab === tab
                      ? 'bg-[#0A2460] text-white shadow-xs'
                      : 'text-[#626262] hover:text-[#030405]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Type Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full sm:w-44 px-3 py-2 text-xs font-bold rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
              >
                <option value="">All Types</option>
                <option value="Webinar">Webinars</option>
                <option value="Seminar">College Seminars</option>
                <option value="Workshop">Workshops</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="py-20 text-center text-xs text-[#626262]">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="py-14 sm:py-16 text-center bg-white rounded-2xl border border-[#E2E2E2] p-6 sm:p-8 max-w-sm mx-auto shadow-subtle">
              <h3 className="text-base font-bold text-[#030405]">No Events Scheduled</h3>
              <p className="text-xs text-[#626262] mt-1">Check back soon for new webinars and campus sessions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-subtle hover:border-[#1656B6]/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-[#E2E2E2]">
                      <img
                        src={event.bannerUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex gap-1.5">
                        <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded bg-[#030405]/90 text-white">
                          {event.type}
                        </span>
                        <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded bg-[#0A2460]/90 text-[#A0B6D6] border border-[#1656B6]/30">
                          {event.mode}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1656B6] mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(event.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#030405] line-clamp-2 mb-2 leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-xs text-[#626262] line-clamp-2 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-[#E2E2E2] text-xs text-[#626262]">
                        {event.locationOrPlatform && (
                          <div className="flex items-center gap-2">
                            {event.mode === 'Online' ? <Video className="w-3.5 h-3.5 text-[#1656B6] shrink-0" /> : <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                            <span className="truncate">{event.locationOrPlatform}</span>
                          </div>
                        )}

                        {event.speakerName && (
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{event.speakerName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    {event.status !== 'Completed' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOpenEnquiry(`Event Registration: ${event.title}`)}
                        className="w-full"
                      >
                        Register
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="w-full opacity-60 cursor-not-allowed"
                      >
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
