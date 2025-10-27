import React from 'react';
import {Home, Zap, UtensilsCrossed, Car, Sparkles, Heart, Code, User, Receipt, Baby} from 'lucide-react';
import {CategoryType} from '../types/dashboard';

interface CategoryIconProps {
  category: CategoryType;
  size?: 16 | 18 | 24 | 30;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 18,
  className = ''
}) => {
  // Map categories to Lucide icons
  const iconMap: Record<CategoryType, React.ElementType> = {
    mortgage: Home,
    utilities: Zap,
    home: Home,
    food: UtensilsCrossed,
    auto: Car,
    entertainment: Sparkles,
    health: Heart,
    software: Code,
    personal: User,
    fees: Receipt,
    george: Baby
  };

  // Map categories to semantic token color classes
  const colorMap: Record<CategoryType, string> = {
    mortgage: 'text-[#fca5a5]',      // Red 300 (from Figma: data/default/mortgage)
    utilities: 'text-[#fdba74]',     // Orange 300
    home: 'text-[#fde047]',          // Yellow 300
    food: 'text-[#6ee7b7]',          // Emerald 300
    auto: 'text-[#67e8f9]',          // Cyan 300
    entertainment: 'text-[#93c5fd]', // Blue 300
    health: 'text-[#d8b4fe]',        // Purple 300
    software: 'text-[#f0abfc]',      // Fuchsia 300
    personal: 'text-[#f9a8d4]',      // Pink 300
    fees: 'text-[#94a3b8]',          // Slate 400
    george: 'text-[#bef264]'         // Lime 300
  };

  const Icon = iconMap[category];
  const colorClass = colorMap[category];

  return (
    <Icon 
      size={size} 
      className={`${colorClass} ${className}`}
      strokeWidth={2}
    />
  );
};

