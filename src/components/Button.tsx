import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'color' | 'surface' | 'outline' | 'ghost';
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  // Base styles - EXACT Figma specifications from design tokens
  // Font: text-base/medium (16px, 500 weight)
  // Layout: Horizontal, Middle left, Hug contents
  // Item spacing: 8px (gap-2)
  // Padding: 12px vertical, 24px horizontal
  // Border radius: 6px (rounded-md)
  // Drop shadow: 0px 1px 1px 0px #000000
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    px-6 py-3
    text-base
    leading-normal
    gap-2
    rounded-md
    shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06)]
  `.replace(/\s+/g, ' ').trim();

  // Variant styles - EXACT match to Figma design variables
  const variantStyles = {
    // Solid: Brand / bg/bg-solid (#1E293B) with text-inverse-hover (#FAFAFA)
    // Hover: bg-solid-hover (#334155), Active: bg-solid-active (#0F172A)
    solid: `
      bg-[#1E293B] text-[#FAFAFA]
      hover:bg-[#334155] hover:text-[#FCFCFC]
      active:bg-[#0F172A] active:text-[#FCFCFC]
    `.replace(/\s+/g, ' ').trim(),

    // Color: Brand / primary/bg (#BFDBFE) with fg/text (#404040)
    color: `
      bg-[#BFDBFE] text-[#404040]
      hover:bg-[#93C5FD] hover:text-[#262626]
      active:bg-[#60A5FA] active:text-[#262626]
    `.replace(/\s+/g, ' ').trim(),

    // Surface: Brand / bg/bg (#F1F5F9) with border (#A3A3A3) and fg/text (#404040)
    // Stroke: Inside, 1px weight
    surface: `
      bg-[#F1F5F9] text-[#404040]
      border border-[#A3A3A3]
      hover:bg-[#E2E8F0]
      active:bg-[#CBD5E1] active:border-[#737373]
    `.replace(/\s+/g, ' ').trim(),

    // Outline: Transparent bg with fg/text border (#404040)
    // Stroke: Inside, 1px weight
    outline: `
      bg-transparent text-[#404040]
      border border-[#404040]
      hover:text-[#3B82F6] hover:border-[#3B82F6]
      active:text-[#2563EB] active:border-[#1D4ED8]
    `.replace(/\s+/g, ' ').trim(),

    // Ghost: Transparent bg, no border, fg/text (#404040)
    ghost: `
      bg-transparent text-[#404040]
      hover:text-[#3B82F6]
      active:text-[#2563EB]
    `.replace(/\s+/g, ' ').trim()
  };

  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none';
  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabled ? disabledStyles : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      {...props}
    >
      {/* Leading icon - 24x24px from lucide icons */}
      {leadingIcon && (
        <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
          {leadingIcon}
        </span>
      )}

      {/* Button text - text-base/medium from Figma (16px, 500 weight, normal line-height) */}
      <span className="font-medium leading-normal" style={{fontFamily: 'Figtree, sans-serif', fontWeight: 500}}>
        {children}
      </span>

      {/* Trailing icon - 18x18px from lucide icons */}
      {trailingIcon && (
        <span className="inline-flex items-center justify-center flex-shrink-0 w-[18px] h-[18px]">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
export {Button};
