import React from 'react';
import {Lightbulb} from 'lucide-react';

interface QuestionCardProps {
  question: string;
  onClick?: () => void;
  showIcon?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick,
  showIcon = true
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-bg-default-bg 
        border border-fg-border 
        rounded-default
        px-3 py-2
        flex gap-1 items-start
        w-full
        ${onClick ? 'cursor-pointer hover:bg-bg-bg-subtle transition-colors' : ''}
      `}
    >
      {showIcon && (
        <div className="shrink-0">
          <Lightbulb size={24} className="text-fg-text" strokeWidth={2} />
        </div>
      )}
      <p className="flex-1 text-base-medium text-fg-text text-left leading-normal">
        {question}
      </p>
    </Component>
  );
};

