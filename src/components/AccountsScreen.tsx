import React from 'react';
import {MobileHeader} from './MobileHeader';
import {BankAccountCard} from './BankAccountCard';
import BottomNav from './BottomNav';

interface Account {
  id: string;
  bank: 'secu-checking' | 'secu-savings' | 'secu-credit' | 'apple-cash' | 'cash-app';
  accountName: string;
  accountType: string;
  balance: number;
  owner: 'Beth' | 'Bryan' | 'Joint';
  state?: 'default' | 'success' | 'warning' | 'error' | 'disabled';
  lastFour?: string;
}

/**
 * AccountsScreen Component
 *
 * Displays all bank accounts with balances and status
 *
 * Figma: Family Finance Manager
 * Node ID: 306:4347
 *
 * Features:
 * - Total balance summary
 * - List of all bank accounts
 * - Account status indicators
 * - Owner identification (Beth/Bryan)
 */
const AccountsScreen: React.FC = () => {
  // Mock data - TODO: Connect to Notion API
  const accounts: Account[] = [
    {
      id: '1',
      bank: 'secu-checking',
      accountName: 'SECU Checking',
      accountType: 'Checking',
      balance: 4325.67,
      owner: 'Joint',
      state: 'success',
      lastFour: '1234'
    },
    {
      id: '2',
      bank: 'secu-savings',
      accountName: 'Emergency Fund',
      accountType: 'Savings',
      balance: 12450.00,
      owner: 'Joint',
      state: 'success',
      lastFour: '5678'
    },
    {
      id: '3',
      bank: 'secu-credit',
      accountName: 'SECU Credit Card',
      accountType: 'Credit Card',
      balance: -1245.32,
      owner: 'Beth',
      state: 'warning',
      lastFour: '9012'
    },
    {
      id: '4',
      bank: 'apple-cash',
      accountName: 'Apple Cash',
      accountType: 'Digital Wallet',
      balance: 156.43,
      owner: 'Beth',
      state: 'default',
    },
    {
      id: '5',
      bank: 'cash-app',
      accountName: 'Cash App',
      accountType: 'Digital Wallet',
      balance: 89.12,
      owner: 'Bryan',
      state: 'default',
    },
    {
      id: '6',
      bank: 'secu-savings',
      accountName: 'Roth IRA',
      accountType: 'Investment',
      balance: 28750.00,
      owner: 'Bryan',
      state: 'success',
      lastFour: '3456'
    }
  ];

  // Group accounts by owner
  const jointAccounts = accounts.filter((account) => account.owner === 'Joint');
  const bethAccounts = accounts.filter((account) => account.owner === 'Beth');
  const bryanAccounts = accounts.filter((account) => account.owner === 'Bryan');

  const handleAccountClick = (accountId: string) => {
    console.log('Account clicked:', accountId);
    // TODO: Navigate to account detail view
  };

  // Tab state
  const [activeTab, setActiveTab] = React.useState<'Beth' | 'Bryan' | 'Joint'>('Beth');

  // Get accounts for active tab
  const getActiveAccounts = () => {
    switch (activeTab) {
      case 'Beth':
        return bethAccounts;
      case 'Bryan':
        return bryanAccounts;
      case 'Joint':
        return jointAccounts;
      default:
        return [];
    }
  };

  const activeAccounts = getActiveAccounts();

  return (
    <div className="bg-bg-bg-subtle flex flex-col min-h-screen">
      {/* Header */}
      <MobileHeader
        title="Accounts"
        showMenu
        showGrid
        onMenuClick={() => console.log('Menu clicked')}
        onGridClick={() => console.log('Grid clicked')}
      />

      {/* Content */}
      <div className="flex flex-col p-6 pb-24 gap-3">
        {/* Tabs Container */}
        <div className="flex flex-col gap-0 p-0">
          {/* Tabs */}
          <div className="flex bg-bg-bg-hover border border-fg-border-hover rounded-lg overflow-hidden p-0">
            {/* Beth Tab */}
            <button
              onClick={() => setActiveTab('Beth')}
              className={`
                flex-1 px-2 py-1.5 text-sm-medium transition-all
                border-r border-t-0 border-b-0 border-l border-fg-border-hover
                rounded-l-lg
                ${activeTab === 'Beth'
                  ? 'bg-primary-bg text-primary-text border-primary-border'
                  : 'bg-transparent text-fg-text hover:bg-bg-bg-active'}
              `}
            >
              Beth
            </button>

            {/* Bryan Tab */}
            <button
              onClick={() => setActiveTab('Bryan')}
              className={`
                flex-1 px-2 py-1.5 text-sm-medium transition-all
                border-r border-t-0 border-b-0 border-l-0 border-fg-border-hover
                ${activeTab === 'Bryan'
                  ? 'bg-primary-bg text-primary-text border-primary-border'
                  : 'bg-transparent text-fg-text hover:bg-bg-bg-active'}
              `}
            >
              Bryan
            </button>

            {/* Joint Tab */}
            <button
              onClick={() => setActiveTab('Joint')}
              className={`
                flex-1 px-2 py-1.5 text-sm-medium transition-all
                rounded-r-lg
                ${activeTab === 'Joint'
                  ? 'bg-primary-bg text-primary-text border-primary-border'
                  : 'bg-transparent text-fg-text hover:bg-bg-bg-active'}
              `}
            >
              Joint
            </button>
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="flex flex-col gap-3">
          {activeAccounts.length > 0 ? (
            activeAccounts.map((account) => (
              <BankAccountCard
                key={account.id}
                {...account}
                onClick={() => handleAccountClick(account.id)}
              />
            ))
          ) : (
            <div className="bg-bg-bg-subtle border border-fg-border rounded-xl p-8 text-center">
              <p className="text-fg-text">No accounts found for {activeTab}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AccountsScreen;
