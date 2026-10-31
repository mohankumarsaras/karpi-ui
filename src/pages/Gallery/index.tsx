import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { GalleryItem } from '../../types';
import { MapPin, Calendar, X } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = [
    'Seminars',
    'Workshops',
    'Training Sessions',
    'Student Participation',
    'Certifications',
    'Campus Visits',
  ];

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      try {
        const data = await api.getGallery(selectedCategory || undefined);
        setItems(data);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, [selectedCategory]);

  return (
    <div className="bg-[#030405] text-[#F8FAFC]">
      {/* Dark Header */}
      <section className="py-14 sm:py-20 border-b border-[#1E232B] text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-3">
            Moments & Activities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Life & Learning at KARPI
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Photographs from college technical seminars, hands-on lab bootcamps, and student mentorship sessions.
          </p>
        </div>
      </section>

      {/* Light Gallery Content Area */}
      <div className="bg-[#F8FAFC] text-[#030405] py-12 sm:py-16 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Category Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                !selectedCategory
                  ? 'bg-[#0A2460] text-white'
                  : 'bg-white text-[#626262] border border-[#E2E2E2] hover:bg-slate-50'
              }`}
            >
              All Photos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0A2460] text-white'
                    : 'bg-white text-[#626262] border border-[#E2E2E2] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-20 text-center text-xs text-[#626262]">Loading gallery...</div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#E2E2E2] p-8 max-w-sm mx-auto shadow-subtle">
              <h3 className="text-base font-bold text-[#030405]">No Photos Found</h3>
              <p className="text-xs text-[#626262] mt-1">Select another category to view other verified sessions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E2E2E2] shadow-subtle hover:border-[#1656B6]/50 transition-colors cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-[#E2E2E2]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 text-[11px] font-bold rounded bg-[#030405]/90 text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#030405] mb-1.5 line-clamp-1">
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p className="text-xs text-[#626262] line-clamp-2 leading-relaxed mb-3">
                          {item.caption}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#E2E2E2] flex items-center justify-between text-[11px] text-[#626262]">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#1656B6]" />
                          {item.location}
                        </span>
                      )}
                      {item.eventDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(item.eventDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030405]/90 backdrop-blur-md">
          <div className="relative bg-[#0B0D11] rounded-2xl overflow-hidden max-w-2xl w-full border border-[#1E232B] shadow-bento-dark text-white">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video w-full bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3686C4]">
                {activeLightbox.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {activeLightbox.title}
              </h3>
              {activeLightbox.caption && (
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  {activeLightbox.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
