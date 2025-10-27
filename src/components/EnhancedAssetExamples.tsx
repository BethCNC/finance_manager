import React, {useState} from 'react';
import {BankLogo, MerchantLogo, CategoryIcon} from './AssetComponents';

// Enhanced transaction item with logo variants
export const EnhancedTransactionItem = ({transaction}: {transaction: {description: string, merchant: string, amount: number, date: string}}) => {
  const [logoVariant, setLogoVariant] = useState<'color' | 'monotone'>('color');
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <MerchantLogo 
            merchant={transaction.merchant} 
            size="medium" 
            variant={logoVariant}
          />
          <div>
            <p className="font-medium text-black">{transaction.description}</p>
            <p className="text-sm text-gray-600">{transaction.merchant}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>
      
      {/* Logo variant toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">Logo style:</span>
        <button
          onClick={() => setLogoVariant('color')}
          className={`px-2 py-1 text-xs rounded ${
            logoVariant === 'color' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Color
        </button>
        <button
          onClick={() => setLogoVariant('monotone')}
          className={`px-2 py-1 text-xs rounded ${
            logoVariant === 'monotone' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Monotone
        </button>
      </div>
    </div>
  );
};

// Enhanced bank account card with logos
export const EnhancedBankAccountCard = ({account, balance, transactions, person}: {account: string, balance: number, transactions: number, person: string}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all">
      <div className="flex items-center space-x-3 mb-4">
        <BankLogo bank={account} size="large" />
        <div>
          <h3 className="font-semibold text-black">{account}</h3>
          <p className="text-gray-600">{person} • {transactions} transactions</p>
        </div>
      </div>
      <div className="text-2xl font-bold text-black">
        ${balance.toLocaleString()}
      </div>
    </div>
  );
};

// Merchant showcase component
export const MerchantShowcase = () => {
  const merchants = [
    'Amazon', 'Apple', 'Netflix', 'Hulu', 'Adobe', 'Figma', 
    'Claude AI', 'DoorDash', 'Uber Eats', 'Burger King', 
    'Taco Bell', 'Walmart', 'Instacart', 'Cash App', 'Blue Cross NC'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Merchant Logo Showcase</h2>
      
      {/* Color logos */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Color Logos</h3>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-4">
          {merchants.map((merchant) => (
            <div key={merchant} className="text-center">
              <MerchantLogo merchant={merchant} size="large" variant="color" />
              <p className="text-xs text-gray-600 mt-2">{merchant}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monotone logos */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Monotone Logos</h3>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-4">
          {merchants.map((merchant) => (
            <div key={merchant} className="text-center">
              <MerchantLogo merchant={merchant} size="large" variant="monotone" />
              <p className="text-xs text-gray-600 mt-2">{merchant}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Smart logo component that chooses variant based on context
export const SmartMerchantLogo = ({merchant, context = 'default', size = 'small'}: {merchant: string, context?: string, size?: 'small' | 'medium' | 'large'}) => {
  // Choose variant based on context
  const getVariant = () => {
    switch (context) {
      case 'dark-background':
      case 'card-header':
        return 'monotone';
      case 'transaction-list':
      case 'default':
        return 'color';
      default:
        return 'color';
    }
  };

  return (
    <MerchantLogo 
      merchant={merchant} 
      size={size} 
      variant={getVariant()}
    />
  );
};

// Transaction list with smart logos
export const SmartTransactionList = ({transactions}: {transactions: Array<{description: string, merchant: string, amount: number, date: string}>}) => {
  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
          <SmartMerchantLogo 
            merchant={transaction.merchant} 
            context="transaction-list"
            size="small"
          />
          <div className="flex-1">
            <p className="font-medium text-black">{transaction.description}</p>
            <p className="text-sm text-gray-600">{transaction.merchant}</p>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Usage examples
export const LogoUsageExamples = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-black mb-6">Logo Usage Examples</h2>
        
        {/* Basic usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Basic Usage</h3>
          <div className="flex items-center space-x-4">
            <MerchantLogo merchant="Amazon" size="small" variant="color" />
            <MerchantLogo merchant="Netflix" size="medium" variant="monotone" />
            <MerchantLogo merchant="Apple" size="large" variant="color" />
          </div>
        </div>

        {/* Bank logos */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Bank Logos</h3>
          <div className="flex items-center space-x-4">
            <BankLogo bank="SECU" size="medium" />
            <BankLogo bank="Cash App" size="medium" />
            <BankLogo bank="Apple Cash" size="medium" />
          </div>
        </div>

        {/* Category icons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Category Icons</h3>
          <div className="flex items-center space-x-4">
            <CategoryIcon category="Food & Groceries" size="medium" />
            <CategoryIcon category="Entertainment" size="medium" />
            <CategoryIcon category="Transportation" size="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};
