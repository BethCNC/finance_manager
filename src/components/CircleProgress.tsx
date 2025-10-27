import React from 'react';

interface CircleProgressProps {
  percentage: number;
  color?: 'blue' | 'green' | 'pink';
  size?: number;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  color = 'blue',
  size = 72
}) => {
  // SVG circle calculations
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Color mapping to semantic tokens
  const colorMap = {
    blue: '#3b82f6',    // Primary solid (Blue 500)
    green: '#16a34a',   // Success solid (Green 600)
    pink: '#e879f9'     // Secondary solid (Fuchsia 400)
  };

  const strokeColor = colorMap[color];
  const trackColor = '#94a3b8'; // Slate 400 for track

  return (
    <div className="relative shrink-0" style={{width: size, height: size}}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle (track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg-semi-bold text-fg-text text-center">
          {percentage}%
        </p>
      </div>
    </div>
  );
};

