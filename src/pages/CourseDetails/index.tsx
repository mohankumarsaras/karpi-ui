import React, { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { Course } from '../../types';
import { Button } from '../../components/common/Button';
import { CourseCard } from '../../components/courses/CourseCard';
import { Clock, Calendar, CheckCircle2, ArrowLeft, Code2 } from 'lucide-react';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [related, setRelated] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getCourseBySlug(slug);
        setCourse(data);

        const relData = await api.getRelatedCourses(slug, data.categoryId);
        setRelated(relData);
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourseDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#030405] text-[#F8FAFC] py-24 text-center text-xs text-[#94A3B8]">
        Loading course syllabus...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-[#030405] text-[#F8FAFC] py-24 text-center max-w-sm mx-auto px-4">
        <h2 className="text-xl font-bold text-white">Course Not Found</h2>
        <p className="text-xs text-[#94A3B8] mt-1 mb-4">The course you are looking for may have been updated or moved.</p>
        <Link to="/courses">
          <Button variant="primary" size="sm">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* Dark Breadcrumb & Hero */}
      <section className="py-10 sm:py-16 border-b border-[#1E232B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] flex-wrap">
            <Link to="/courses" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Courses
            </Link>
            <span>/</span>
            {course.category && (
              <>
                <Link to={`/courses?category=${course.category.slug}`} className="hover:text-white">
                  {course.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white font-semibold truncate max-w-xs">{course.title}</span>
          </div>

          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#1656B6] text-white">
                {course.level}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#0A2460] text-[#A0B6D6] border border-[#1656B6]/50">
                {course.mode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-base text-[#94A3B8] leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Quick Meta */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3686C4]" />
                <span>Duration: <strong className="text-white">{course.duration}</strong></span>
              </div>
              {course.schedule && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3686C4]" />
                  <span>Batch: <strong className="text-white">{course.schedule}</strong></span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenEnquiry(course.title)}
                className="w-full sm:w-auto"
              >
                Enquire for Syllabus & Batches
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Light Content Body */}
      <div className="bg-[#F8FAFC] text-[#030405] py-10 sm:py-14 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details & Syllabus */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Overview Bento Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E2E2E2] shadow-subtle space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#030405]">Course Overview</h2>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed whitespace-pre-line">
                  {course.overview}
                </p>
              </div>

              {/* What You Will Learn */}
              {course.learningObjectives && course.learningObjectives.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E2E2E2] shadow-subtle space-y-4">
                  <h3 className="text-lg font-bold text-[#030405]">Learning Objectives</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {course.learningObjectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#030405]">
                        <CheckCircle2 className="w-4 h-4 text-[#1656B6] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Structured Curriculum */}
              {course.curriculum && course.curriculum.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E2E2E2] shadow-subtle space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#030405]">Course Curriculum</h3>
                    <p className="text-xs text-[#626262]">Every module pairs theoretical grounding with hands-on labs.</p>
                  </div>

                  <div className="space-y-3">
                    {course.curriculum.map((mod, idx) => (
                      <div key={idx} className="border border-[#E2E2E2] rounded-xl p-4 sm:p-5 bg-[#F8FAFC]">
                        <h4 className="text-sm font-bold text-[#030405] flex items-center gap-2 mb-2">
                          <Code2 className="w-4 h-4 text-[#1656B6] shrink-0" />
                          <span>{mod.module}</span>
                        </h4>

                        <div className="flex flex-wrap gap-1.5 my-2.5">
                          {mod.topics.map((t, ti) => (
                            <span key={ti} className="text-xs bg-white border border-[#E2E2E2] px-2.5 py-0.5 rounded text-slate-700 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>

                        {mod.handsOn && (
                          <div className="mt-3 pt-3 border-t border-[#E2E2E2] text-xs text-[#626262]">
                            <strong className="text-[#1656B6]">Hands-on Project Lab: </strong>
                            <span>{mod.handsOn}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who Should Attend & Prerequisites */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.whoShouldAttend && (
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E2E2] shadow-subtle">
                    <h4 className="font-bold text-[#030405] text-xs uppercase tracking-wider mb-2">
                      Who Should Attend
                    </h4>
                    <ul className="space-y-2 text-xs text-[#626262]">
                      {course.whoShouldAttend.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#1656B6] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.prerequisites && (
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E2E2] shadow-subtle">
                    <h4 className="font-bold text-[#030405] text-xs uppercase tracking-wider mb-2">
                      Prerequisites
                    </h4>
                    <ul className="space-y-2 text-xs text-[#626262]">
                      {course.prerequisites.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#0A2460] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Summary Bento Box */}
            <div className="lg:col-span-4 w-full">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E2E2] shadow-subtle space-y-4 sm:space-y-5">
                <h3 className="text-base font-bold text-[#030405]">Track Summary</h3>

                <div className="space-y-2.5 text-xs text-[#626262] pt-1 border-t border-[#E2E2E2]">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Skill Level:</span>
                    <span className="font-bold text-[#030405]">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Delivery Mode:</span>
                    <span className="font-bold text-[#030405]">{course.mode}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-bold text-[#030405]">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Labs:</span>
                    <span className="font-bold text-[#1656B6]">Hands-on Projects</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenEnquiry(course.title)}
                  className="w-full"
                >
                  Enquire for Batches
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tracks */}
      {related.length > 0 && (
        <section className="bg-[#030405] py-12 sm:py-16 border-t border-[#1E232B] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8">Related Learning Tracks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rc) => (
                <CourseCard
                  key={rc.id}
                  course={rc}
                  onEnquireClick={(title) => handleOpenEnquiry(title)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
