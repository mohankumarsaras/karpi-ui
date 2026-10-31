import React from 'react';
import { cn } from './Button';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className,
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div className={cn('max-w-2xl mb-12', isCenter ? 'text-center mx-auto' : 'text-left', className)}>
      {badge && (
        <span
          className={cn(
            'inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3',
            isDark
              ? 'bg-[#101318] text-[#3686C4] border border-[#1E232B]'
              : 'bg-[#F1F5F9] text-[#1656B6] border border-[#E2E2E2]'
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl font-extrabold tracking-tight',
          isDark ? 'text-[#F8FAFC]' : 'text-[#030405]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-2.5 text-sm sm:text-base leading-relaxed',
            isDark ? 'text-[#94A3B8]' : 'text-[#626262]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
