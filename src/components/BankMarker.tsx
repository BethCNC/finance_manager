import React from 'react';

type BankType = 'secu-checking' | 'secu-savings' | 'secu-credit' | 'apple-cash' | 'cash-app';

interface BankMarkerProps {
  bank: BankType;
  size?: number;
  className?: string;
}

/**
 * BankMarker Component
 *
 * Displays bank logo/marker using actual bank logos from assets
 *
 * Figma: Family Finance Manager
 * Node ID: 307:12811
 *
 * Design Specs:
 * - Size: 32px × 32px (default)
 * - Uses logos from /public/assets/logos/merchants/color/
 *
 * Token Mapping:
 * - SECU: bg-bank-secu-solid
 * - Cash App: bg-bank-cash-app-solid
 * - Apple Cash: bg-bank-apple-cash-solid
 */
export const BankMarker: React.FC<BankMarkerProps> = ({
  bank,
  size = 32,
  className = ''
}) => {
  // Map bank types to logo file names
  const bankLogoMap: Record<BankType, {file: string, bg: string, fallback: string}> = {
    'secu-checking': {file: 'truist', bg: 'bg-bank-secu-solid', fallback: 'SECU'},
    'secu-savings': {file: 'truist', bg: 'bg-bank-secu-solid', fallback: 'SECU'},
    'secu-credit': {file: 'truist', bg: 'bg-bank-secu-solid', fallback: 'SECU'},
    'apple-cash': {file: 'apple', bg: 'bg-bank-apple-cash-solid', fallback: 'AC'},
    'cash-app': {file: 'cash_app', bg: 'bg-bank-cash-app-hover', fallback: 'CA'}
  };

  const logoConfig = bankLogoMap[bank];
  const logoPath = `/assets/logos/merchants/color/${logoConfig.file}.png`;

  return (
    <div className={`flex items-center justify-center rounded-lg overflow-hidden ${className}`}
      style={{width: size, height: size}}>
      <img
        src={logoPath}
        alt={`${bank} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to colored circle with initials if logo fails to load
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.nextSibling) {
            (target.nextSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
      <div className={`hidden items-center justify-center w-full h-full ${logoConfig.bg} text-fg-text-inverse text-xs font-semibold`}>
        {logoConfig.fallback}
      </div>
    </div>
  );
};

export default BankMarker;
