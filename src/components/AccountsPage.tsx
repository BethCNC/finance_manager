import React, {useState, useEffect} from 'react';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import {PlaidConnect} from './PlaidConnect';
import {RefreshCw, Download, AlertCircle, CheckCircle, CreditCard, DollarSign, TrendingUp, TrendingDown} from 'lucide-react';

interface Account {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
  balance: {
    current: number;
    available: number;
    limit: number;
  };
}

interface AccountSummary {
  totalBalance: number;
  totalAvailable: number;
  accountCount: number;
  lastSync: string;
}

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [summary, setSummary] = useState<AccountSummary>({
    totalBalance: 0,
    totalAvailable: 0,
    accountCount: 0,
    lastSync: ''
  });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'info'; text: string} | null>(null);

  // Fetch accounts and summary
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('/api/plaid?action=accounts');

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      setAccounts(data.accounts || []);

      // Calculate summary
      const totalBalance = data.accounts?.reduce((sum: number, acc: Account) => sum + (acc.balance.current || 0), 0) || 0;
      const totalAvailable = data.accounts?.reduce((sum: number, acc: Account) => sum + (acc.balance.available || 0), 0) || 0;
      
      setSummary({
        totalBalance,
        totalAvailable,
        accountCount: data.accounts?.length || 0,
        lastSync: new Date().toLocaleString()
      });

      setMessage({type: 'success', text: `Found ${data.accounts?.length || 0} connected account(s)`});
    } catch (error: any) {
      console.error('Error fetching accounts:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  };

  // Sync transactions to Notion
  const syncTransactions = async () => {
    try {
      setSyncing(true);
      setMessage({type: 'info', text: 'Syncing transactions to Notion...'});

      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await fetch('/api/plaid?action=sync_to_notion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync transactions');
      }

      const data = await response.json();
      setMessage({
        type: 'success',
        text: `Synced ${data.created} transaction(s) to Notion! ${data.errors > 0 ? `(${data.errors} errors)` : ''}`,
      });
    } catch (error: any) {
      console.error('Error syncing to Notion:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setSyncing(false);
    }
  };

  // Load accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'depository':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'credit':
        return <CreditCard className="w-6 h-6 text-red-600" />;
      case 'loan':
        return <TrendingDown className="w-6 h-6 text-orange-600" />;
      case 'investment':
        return <TrendingUp className="w-6 h-6 text-green-600" />;
      default:
        return <DollarSign className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'depository':
        return 'bg-blue-50 border-blue-200';
      case 'credit':
        return 'bg-red-50 border-red-200';
      case 'loan':
        return 'bg-orange-50 border-orange-200';
      case 'investment':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader title="Accounts" showMenu />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">
        {/* Message Display */}
        {message && (
          <div className={`border rounded-xl p-4 ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
            message.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
            'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <div className="flex items-start gap-3">
              {message.type === 'success' && <CheckCircle size={20} className="mt-0.5" />}
              {message.type === 'error' && <AlertCircle size={20} className="mt-0.5" />}
              <div className="flex-1 text-sm">{message.text}</div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Balance */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Total Balance</span>
            </div>
            <p className="text-2xl font-bold text-black">
              ${summary.totalBalance.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              {summary.accountCount} account{summary.accountCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Available</span>
            </div>
            <p className="text-2xl font-bold text-black">
              ${summary.totalAvailable.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Last sync: {summary.lastSync ? new Date(summary.lastSync).toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={fetchAccounts}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-black px-4 py-3 rounded-xl font-medium hover:border-black transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh Accounts'}
          </button>
          
          <button
            onClick={syncTransactions}
            disabled={loading || syncing}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            <Download size={20} />
            {syncing ? 'Syncing...' : 'Sync Transactions'}
          </button>
        </div>

        {/* Connected Accounts */}
        {accounts.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Connected Accounts</h3>
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`bg-white rounded-xl p-4 border ${getAccountTypeColor(account.type)}`}
              >
                <div className="flex items-center gap-3">
                  {/* Account Icon */}
                  <div className="flex-shrink-0">
                    {getAccountIcon(account.type)}
                  </div>

                  {/* Account Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {account.name}
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {account.subtype}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      •••• {account.mask} • {account.type}
                    </p>
                  </div>

                  {/* Balance */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${account.balance.current?.toLocaleString() || '0'}
                    </p>
                    {account.balance.available && account.balance.available !== account.balance.current && (
                      <p className="text-xs text-gray-500">
                        Available: ${account.balance.available.toLocaleString()}
                      </p>
                    )}
                    {account.balance.limit && (
                      <p className="text-xs text-gray-500">
                        Limit: ${account.balance.limit.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Accounts</h3>
            <p className="text-gray-500 mb-4">
              Connect your bank accounts to automatically sync transactions and view balances.
            </p>
            <button
              onClick={() => {
                // This would open the PlaidConnect component
                // For now, we'll show a message
                setMessage({type: 'info', text: 'Use the Plaid Connect component to link your bank accounts'});
              }}
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Connect Bank Account
            </button>
          </div>
        )}

        {/* Plaid Connect Component (for development/testing) */}
        <details className="bg-white rounded-xl p-4 border border-gray-200">
          <summary className="font-medium text-gray-900 cursor-pointer">
            Plaid Integration (Development)
          </summary>
          <div className="mt-4">
            <PlaidConnect />
          </div>
        </details>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AccountsPage;
