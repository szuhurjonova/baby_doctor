import React from 'react';
import mascotImg from '../assets/baby-doctor-mascot.jpg';

interface BabyDoctorLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  tagline?: string;
  layout?: 'row' | 'col';
  className?: string;
  onClick?: () => void;
}

export const BabyDoctorLogo: React.FC<BabyDoctorLogoProps> = ({
  size = 'md',
  showTagline = true,
  tagline = "Bolalar salomatligi va vaksina nazorati",
  layout = 'row',
  className = '',
  onClick,
}) => {
  // Dimension definitions
  const imageSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    hero: 'w-24 h-24',
  };

  const titleSizes = {
    xs: 'text-sm font-bold',
    sm: 'text-base font-bold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    hero: 'text-3xl font-extrabold',
  };

  const taglineSizes = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    hero: 'text-base',
  };

  const isCol = layout === 'col';

  return (
    <div
      onClick={onClick}
      className={`inline-flex ${isCol ? 'flex-col items-center text-center' : 'items-center text-left'} gap-2.5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Mascot Avatar with Blue Medical Border & Mini Heart Cross Indicator */}
      <div className="relative shrink-0">
        <div
          className={`${imageSizes[size]} rounded-2xl overflow-hidden bg-sky-50 ring-2 ring-sky-200/80 shadow-sm flex items-center justify-center`}
        >
          <img
            src={mascotImg}
            alt="Baby Doctor"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Graceful vector fallback if image path issues arise
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Small Medical Heart Indicator on corner */}
        <span
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-sky-500 text-white rounded-full flex items-center justify-center text-[9px] shadow-sm ring-2 ring-white"
          title="MedTech Certified"
        >
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 justify-center md:justify-start">
          <span className={`tracking-tight text-slate-800 font-display ${titleSizes[size]}`}>
            Baby <span className="text-sky-600">Doctor</span>
          </span>
        </div>
        {showTagline && (
          <span className={`text-slate-500 font-medium ${taglineSizes[size]} leading-tight tracking-normal`}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
