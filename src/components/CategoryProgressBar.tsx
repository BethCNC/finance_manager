import React from 'react';
import {CategoryIcon} from './CategoryIcon';
import {AlertCircle} from './AlertCircle';
import {CategoryType} from '../types/dashboard';

interface CategoryProgressBarProps {
  category: CategoryType;
  label: string;
  spent: number;
  budget: number;
  alerts?: {
    success?: boolean;
    warning?: boolean;
    error?: boolean;
  };
}

export const CategoryProgressBar: React.FC<CategoryProgressBarProps> = ({
  category,
  label,
  spent,
  budget,
  alerts = {}
}) => {
  const percentage = Math.round((spent / budget) * 100);
  const amountLeft = budget - spent;
  
  // Map categories to semantic token color classes for progress fill
  // Using exact colors from Figma extraction (data/default/{category})
  const categoryColorMap: Record<CategoryType, string> = {
    mortgage: 'bg-[#fca5a5]',      // data/default/mortgage
    utilities: 'bg-[#fdba74]',     // data/default/utilites
    home: 'bg-[#fde047]',          // data/default/home
    food: 'bg-[#6ee7b7]',          // data/default/food
    auto: 'bg-[#67e8f9]',          // data/default/auto
    entertainment: 'bg-[#93c5fd]', // data/default/entertainment
    health: 'bg-[#d8b4fe]',        // data/default/health
    software: 'bg-[#f0abfc]',      // data/default/software
    personal: 'bg-[#f9a8d4]',      // data/default/personal
    fees: 'bg-[#94a3b8]',          // data/default/fees
    george: 'bg-[#bef264]'         // data/default/george
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Top row: Icon + Label | Spent/Budget */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <CategoryIcon category={category} size={18} />
          <p className="text-base-semi-bold text-fg-text">{label}</p>
        </div>
        <p className="text-xs-regular text-fg-text">
          ${spent} of ${budget}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="bg-bg-bg-active border border-fg-border-strong h-4 rounded-full relative w-full overflow-hidden">
        <div 
          className={`h-4 ${categoryColorMap[category]} border border-fg-border-strong rounded-full absolute top-0 left-0`}
          style={{width: `${Math.min(percentage, 100)}%`}}
        />
      </div>
      
      {/* Bottom row: Percentage + Alerts | Amount Left */}
      <div className="flex items-start justify-between">
        <div className="flex gap-1 items-center">
          <p className="text-xs-medium text-fg-text">{percentage}%</p>
          <div className="flex gap-1 items-center">
            <AlertCircle type="success" active={alerts.success || false} size={16} />
            <AlertCircle type="warning" active={alerts.warning || false} size={16} />
            <AlertCircle type="error" active={alerts.error || false} size={16} />
          </div>
        </div>
        <p className="text-xs-regular text-fg-text">${amountLeft} left</p>
      </div>
    </div>
  );
};

