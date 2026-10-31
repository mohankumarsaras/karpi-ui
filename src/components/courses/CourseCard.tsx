import React from 'react';
import { Course } from '../../types';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onEnquireClick?: (courseTitle: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnquireClick }) => {
  return (
    <div className="group bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden hover:border-[#1656B6]/50 transition-all duration-200 flex flex-col h-full shadow-subtle hover:shadow-card-hover">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-[#E2E2E2]">
        <img
          src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#030405]/90 text-white backdrop-blur-xs">
            {course.level}
          </span>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#0A2460]/90 text-[#A0B6D6] backdrop-blur-xs border border-[#1656B6]/30">
            {course.mode}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {course.category && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1656B6] mb-1.5">
            {course.category.name}
          </span>
        )}

        <h3 className="text-lg font-bold text-[#030405] group-hover:text-[#1656B6] transition-colors line-clamp-2 mb-2 leading-snug">
          <Link to={`/courses/${course.slug}`}>
            {course.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#626262] line-clamp-2 mb-4 leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Skills Tag Pills */}
        {course.skillsCovered && course.skillsCovered.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-5">
            {course.skillsCovered.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[11px] font-semibold bg-[#F8FAFC] text-slate-700 rounded border border-[#E2E2E2]">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Course Meta Info */}
        <div className="mt-auto pt-4 border-t border-[#E2E2E2] flex items-center justify-between text-xs text-[#626262]">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#1656B6]" />
            <span>{course.duration}</span>
          </div>
          <span className="font-semibold text-slate-700">Project-Based</span>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-3 flex items-center gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1 inline-flex items-center justify-center py-2 px-3 text-xs font-bold rounded-lg bg-[#F8FAFC] hover:bg-slate-100 text-[#030405] border border-[#E2E2E2] transition-colors gap-1"
          >
            Curriculum
            <ArrowUpRight className="w-3.5 h-3.5 text-[#626262]" />
          </Link>
          <button
            onClick={() => onEnquireClick?.(course.title)}
            className="inline-flex items-center justify-center py-2 px-4 text-xs font-bold rounded-lg bg-[#1656B6] hover:bg-[#0A2460] text-white transition-colors"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};
