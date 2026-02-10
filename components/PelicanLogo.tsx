
import React from 'react';

interface PelicanLogoProps {
  className?: string;
}

export const PelicanLogo: React.FC<PelicanLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek Minimalist Pelican Body */}
      <path 
        d="M25 65 Q25 40 50 40 Q75 40 75 65 L70 85 H30 L25 65Z" 
        fill="currentColor" 
        fillOpacity="0.2"
      />
      {/* Head and Neck */}
      <path 
        d="M50 40 Q50 15 70 15" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      {/* Stylized Beak (Soft Orange/Gold) */}
      <path 
        d="M70 15 Q95 15 85 35 Q70 30 55 25" 
        fill="#fb923c" 
      />
      {/* Eye */}
      <circle cx="68" cy="18" r="2" fill="white" />
    </svg>
  );
};
