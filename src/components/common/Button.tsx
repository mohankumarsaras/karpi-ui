import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'dark-outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] tracking-tight';
    
    const variants = {
      // Primary SaaS deep blue
      primary: 'bg-[#1656B6] hover:bg-[#0A2460] text-white focus:ring-[#1656B6] shadow-sm',
      secondary: 'bg-[#030405] hover:bg-[#101318] text-white focus:ring-slate-700',
      accent: 'bg-[#0A2460] hover:bg-[#1656B6] text-white focus:ring-[#0A2460]',
      outline: 'border border-[#E2E2E2] hover:border-[#1656B6] text-[#030405] hover:text-[#1656B6] bg-white focus:ring-[#1656B6]',
      'dark-outline': 'border border-[#1E232B] hover:border-[#3686C4] text-[#F8FAFC] hover:text-white bg-transparent focus:ring-[#3686C4]',
      ghost: 'text-[#626262] hover:text-[#030405] hover:bg-slate-100 focus:ring-slate-400',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
