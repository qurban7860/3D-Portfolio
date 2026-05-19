import PropTypes from 'prop-types';
import { useId } from 'react';

const Logo = ({ className = "w-6 h-6" }) => {
  const uniqueId = useId();
  const brandGradientId = `logoBrandGradient-${uniqueId}`;
  const accentGradientId = `logoAccentGradient-${uniqueId}`;

  return (
    <svg className={className} viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={brandGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--secondary)" stopOpacity={1} />
        </linearGradient>
        <linearGradient id={accentGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--secondary)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={1} />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="96" cy="96" r="92" fill={`url(#${brandGradientId})`} opacity="0.1"/>

      {/* Main Q letter with modern design */}
      <g transform="translate(96, 96)">
        {/* Outer ring */}
        <circle cx="0" cy="0" r="50" fill="none" stroke={`url(#${brandGradientId})`} strokeWidth="3"/>
        
        {/* Inner accent circle */}
        <circle cx="0" cy="0" r="42" fill="none" stroke={`url(#${accentGradientId})`} strokeWidth="1.5" opacity="0.6"/>

        {/* Q Letter */}
        <g fill={`url(#${brandGradientId})`}>
          {/* Q bowl */}
          <path d="M -15 -25 Q -30 -25 -30 -5 Q -30 15 -15 25 Q 0 35 15 25 Q 30 15 30 -5 Q 30 -25 15 -25 Q 0 -35 -15 -25 M -18 -20 Q -25 -20 -25 -5 Q -25 12 -10 20 Q 5 28 20 20 Q 25 12 25 -5 Q 25 -20 18 -20 Q 3 -28 -18 -20" fillRule="evenodd"/>
          
          {/* Q tail */}
          <path d="M 8 15 Q 15 20 25 35 L 20 38 Q 10 24 5 18 Z"/>
        </g>

        {/* Decorative dots */}
        <circle cx="-45" cy="0" r="4" fill={`url(#${accentGradientId})`}/>
        <circle cx="45" cy="0" r="4" fill={`url(#${accentGradientId})`}/>
        <circle cx="0" cy="-45" r="4" fill={`url(#${accentGradientId})`}/>
        <circle cx="0" cy="45" r="4" fill={`url(#${accentGradientId})`}/>
      </g>

      {/* Tech indicator lines */}
      <g stroke={`url(#${accentGradientId})`} strokeWidth="1.5" opacity="0.4">
        <line x1="30" y1="30" x2="50" y2="50"/>
        <line x1="162" y1="30" x2="142" y2="50"/>
        <line x1="30" y1="162" x2="50" y2="142"/>
        <line x1="162" y1="162" x2="142" y2="142"/>
      </g>
    </svg>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
