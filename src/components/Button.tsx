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

  // Variant styles - Using semantic tokens from Figma
  const variantStyles = {
    // Solid: Brand / bg/bg-solid with text-inverse
    // Uses: --brand-bg-bg-solid, --brand-fg-text-inverse
    solid: `
      bg-bg-bg-solid text-fg-text-inverse
      hover:bg-bg-bg-solid-hover
      active:bg-bg-bg-solid-active
    `.replace(/\s+/g, ' ').trim(),

    // Color: Brand / primary/bg with fg/text
    // Uses: --brand-primary-bg, --brand-fg-text
    color: `
      bg-primary-bg text-fg-text
      hover:bg-primary-bg-hover hover:text-fg-text-contrast
      active:bg-primary-bg-active active:text-fg-text-contrast
    `.replace(/\s+/g, ' ').trim(),

    // Surface: Brand / bg/bg with border and fg/text
    // Uses: --brand-bg-bg, --brand-fg-border, --brand-fg-text
    surface: `
      bg-bg-bg text-fg-text
      border border-fg-border
      hover:bg-bg-bg-hover
      active:bg-bg-bg-active active:border-fg-border-hover
    `.replace(/\s+/g, ' ').trim(),

    // Outline: Transparent bg with fg/text border
    // Uses: --brand-fg-text, --brand-primary-solid
    outline: `
      bg-transparent text-fg-text
      border border-fg-text
      hover:text-primary-solid hover:border-primary-solid
      active:text-primary-solid-hover active:border-primary-border-hover
    `.replace(/\s+/g, ' ').trim(),

    // Ghost: Transparent bg, no border, fg/text
    // Uses: --brand-fg-text, --brand-primary-solid
    ghost: `
      bg-transparent text-fg-text
      hover:text-primary-solid
      active:text-primary-solid-hover
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
