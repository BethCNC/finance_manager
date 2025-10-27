import React from 'react';
import {BankLogo, MerchantLogo, CategoryIcon} from './AssetComponents';

// Example usage in your existing components
export const BankAccountCard = ({account, balance, transactions}: {account: string, balance: number, transactions: number}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <BankLogo bank={account} size="medium" />
        <div>
          <h3 className="font-semibold text-black">{account}</h3>
          <p className="text-gray-600">{transactions} transactions</p>
        </div>
      </div>
      <div className="text-2xl font-bold text-black">
        ${balance.toLocaleString()}
      </div>
    </div>
  );
};

export const TransactionItem = ({transaction}: {transaction: {description: string, merchant: string, amount: number, date: string}}) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
      <MerchantLogo merchant={transaction.merchant} size="small" />
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
  );
};

export const CategoryCard = ({category, amount, percentage}: {category: string, amount: number, percentage: number}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-2">
        <CategoryIcon category={category} size="medium" />
        <h3 className="font-semibold text-black">{category}</h3>
      </div>
      <div className="text-xl font-bold text-black mb-1">
        ${amount.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">
        {percentage.toFixed(1)}% of total spending
      </div>
    </div>
  );
};

// Example of how to update your existing components
export const UpdatedBankAccountCard = ({account, balance, transactions}: {account: string, balance: number, transactions: number}) => {
  // Map your account names to the expected format
  const accountMap: Record<string, string> = {
    'SECU': 'SECU',
    'Cash App': 'Cash App', 
    'Apple Cash': 'Apple Cash'
  };
  
  const bankName = accountMap[account] || account;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all">
      <div className="flex items-center space-x-3 mb-4">
        <BankLogo bank={bankName} size="medium" />
        <div>
          <h3 className="font-semibold text-black">{account}</h3>
          <p className="text-gray-600">{transactions} transactions</p>
        </div>
      </div>
      <div className="text-2xl font-bold text-black">
        ${balance.toLocaleString()}
      </div>
    </div>
  );
};
