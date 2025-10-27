import React from 'react';
import {BankMarker} from './BankMarker';
import {CheckCircle2, AlertCircle, XCircle} from 'lucide-react';

type BankType = 'secu-checking' | 'secu-savings' | 'secu-credit' | 'apple-cash' | 'cash-app';
type StateType = 'default' | 'success' | 'warning' | 'error' | 'disabled';
type OwnerType = 'Beth' | 'Bryan' | 'Joint';

interface BankAccountCardProps {
  bank: BankType;
  accountName: string;
  accountType: string;
  balance: number;
  owner: OwnerType;
  state?: StateType;
  lastFour?: string;
  onClick?: () => void;
}

/**
 * BankAccountCard Component
 *
 * Displays bank account information with balance and status
 *
 * Figma: Family Finance Manager
 * Node ID: 308:17256
 *
 * Design Specs:
 * - Size: 399px × 88px
 * - Layout: Horizontal auto layout
 * - Padding: 16px
 * - Gap: 12px
 *
 * States:
 * - default: Normal state
 * - success: Positive/good status
 * - warning: Needs attention
 * - error: Problem/issue
 * - disabled: Inactive account
 *
 * Token Mapping:
 * - Background: bg-bg-bg-subtle
 * - Border: border-fg-border
 * - Text: text-fg-text, text-fg-text-contrast
 * - State colors: success-solid, warning-solid, alert-solid
 */
export const BankAccountCard: React.FC<BankAccountCardProps> = ({
  bank,
  accountName,
  accountType,
  balance,
  owner,
  state = 'default',
  lastFour,
  onClick
}) => {
  const Component = onClick ? 'button' : 'div';

  // State indicator config
  const stateConfig = {
    default: {icon: null, color: ''},
    success: {icon: CheckCircle2, color: 'text-success-solid'},
    warning: {icon: AlertCircle, color: 'text-warning-solid'},
    error: {icon: XCircle, color: 'text-alert-solid'},
    disabled: {icon: null, color: 'opacity-40'}
  };

  const currentState = stateConfig[state];
  const StateIcon = currentState.icon;

  // Owner color mapping
  const ownerColors = {
    Beth: 'text-secondary-solid',
    Bryan: 'text-primary-solid',
    Joint: 'text-fg-text-contrast'
  };

  // Format balance
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(balance);

  return (
    <Component
      onClick={onClick}
      disabled={state === 'disabled'}
      className={`
        bg-bg-bg-subtle
        border border-fg-border
        rounded-xl
        p-4
        flex items-center gap-3
        w-full
        transition-all
        ${state === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''}
        ${onClick && state !== 'disabled' ? 'hover:border-fg-border-strong cursor-pointer' : ''}
        ${currentState.color}
      `}
    >
      {/* Bank Logo */}
      <BankMarker bank={bank} size={40} />

      {/* Account Info */}
      <div className="flex-1 flex flex-col gap-1 items-start">
        <div className="flex items-center gap-2 w-full">
          <h3 className="text-base font-semibold text-fg-text-contrast">
            {accountName}
          </h3>
          {StateIcon && (
            <StateIcon size={16} className={currentState.color} strokeWidth={2} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-fg-text">
            {accountType}
            {lastFour && ` ****${lastFour}`}
          </p>
          <span className="text-xs text-fg-text">•</span>
          <p className={`text-sm font-medium ${ownerColors[owner]}`}>
            {owner}
          </p>
        </div>
      </div>

      {/* Balance */}
      <div className="flex flex-col items-end">
        <p className="text-lg font-semibold text-fg-text-contrast">
          {formattedBalance}
        </p>
      </div>
    </Component>
  );
};

export default BankAccountCard;
