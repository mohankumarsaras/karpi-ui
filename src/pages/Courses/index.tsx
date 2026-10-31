import React, { useEffect, useState } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { Course, Category } from '../../types';
import { CourseCard } from '../../components/courses/CourseCard';
import { TechTicker } from '../../components/common/TechTicker';
import { Search, X } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || '';
  const selectedLevel = searchParams.get('level') || '';
  const selectedMode = searchParams.get('mode') || '';
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const catRes = await api.getCategories();
        setCategories(catRes);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchMetadata();
  }, []);

  useEffect(() => {
    async function fetchFilteredCourses() {
      setLoading(true);
      try {
        const data = await api.getCourses({
          category: selectedCategory || undefined,
          level: selectedLevel || undefined,
          mode: selectedMode || undefined,
          search: searchParams.get('search') || undefined,
        });
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredCourses();
  }, [selectedCategory, selectedLevel, selectedMode, searchParams]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', searchTerm.trim());
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedLevel || selectedMode || searchParams.get('search'));

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* Dark Header */}
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14 text-center border-b border-[#1E232B]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-2 sm:mb-3">
            Course Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Technical Learning Tracks
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed px-2">
            Practical engineering courses with hands-on lab exercises and 1-on-1 code reviews.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SCROLLING HD LOGOS TICKER:
          C, C++, Python, DSA, OOPs, JavaScript, AWS, Azure, Docker, GitHub
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[10px] sm:text-xs font-bold tracking-widest text-[#A0B6D6] uppercase">
          <span>CORE CURRICULUM</span>
          <span className="text-[#3686C4]">10+ INDUSTRY-STANDARD STACKS</span>
        </div>
        <TechTicker />
      </section>

      {/* Light Content Area */}
      <div className="bg-[#F8FAFC] text-[#030405] py-10 sm:py-16 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Responsive Filter Box */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E2E2] shadow-subtle">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="sm:col-span-2 lg:col-span-5 relative">
                <input
                  type="text"
                  placeholder="Search courses, stacks, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] focus:outline-none focus:ring-1 focus:ring-[#1656B6] bg-[#F8FAFC]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              {/* Level */}
              <div className="sm:col-span-1 lg:col-span-3">
                <select
                  value={selectedLevel}
                  onChange={(e) => updateFilter('level', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                >
                  <option value="">All Skill Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              {/* Mode */}
              <div className="sm:col-span-1 lg:col-span-3">
                <select
                  value={selectedMode}
                  onChange={(e) => updateFilter('mode', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                >
                  <option value="">All Learning Modes</option>
                  <option value="Online Live">Online Live</option>
                  <option value="Offline Classroom">Offline Coaching</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Reset */}
              <div className="sm:col-span-2 lg:col-span-1 flex justify-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold p-1.5 flex items-center gap-1"
                    title="Clear filters"
                  >
                    <X className="w-4 h-4" />
                    <span className="lg:hidden text-xs">Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Responsive Category Pills with horizontal scrolling */}
            <div className="mt-3.5 pt-3 border-t border-[#E2E2E2] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
              <button
                onClick={() => updateFilter('category', '')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  !selectedCategory
                    ? 'bg-[#0A2460] text-white'
                    : 'bg-[#F1F5F9] text-[#626262] hover:bg-slate-200'
                }`}
              >
                All Tracks
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0A2460] text-white'
                      : 'bg-[#F1F5F9] text-[#626262] hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Course Grid */}
          {loading ? (
            <div className="py-20 text-center text-xs text-[#626262]">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="py-14 sm:py-16 text-center bg-white rounded-2xl border border-[#E2E2E2] p-6 sm:p-8 max-w-sm mx-auto">
              <h3 className="text-base font-bold text-[#030405]">No Courses Found</h3>
              <p className="text-xs text-[#626262] mt-1 mb-4">Try clearing or adjusting your search filters.</p>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnquireClick={(title) => handleOpenEnquiry(title)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
