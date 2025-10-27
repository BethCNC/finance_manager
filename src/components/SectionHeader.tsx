import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = ''
}) => {
  return (
    <div className={`
      bg-bg-bg-solid
      border border-fg-border-hover
      rounded-md
      p-3
      w-full
      shadow-sm
      ${className}
    `}>
      <h2 className="text-2xl-semi-bold text-fg-text-inverse">
        {title}
      </h2>
    </div>
  );
};

