import React, {useState, useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import {Link2, RefreshCw, Download, CheckCircle, AlertCircle} from 'lucide-react';

export const PlaidConnect: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'info'; text: string} | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Create link token
  const createLinkToken = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('/api/plaid?action=create_link_token', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create link token');
      }

      const data = await response.json();
      setLinkToken(data.link_token);
      setMessage({type: 'info', text: 'Ready to connect your bank. Click the button above.'});
    } catch (error: any) {
      console.error('Error creating link token:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  };

  // Exchange public token for access token
  const onSuccess = useCallback(async (publicToken: string) => {
    try {
      setLoading(true);
      setMessage({type: 'info', text: 'Exchanging token...'});

      const response = await fetch('/api/plaid?action=exchange_public_token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({public_token: publicToken}),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange token');
      }

      const data = await response.json();
      setMessage({
        type: 'success',
        text: `Connected! Save this to your .env:\nPLAID_ACCESS_TOKEN=${data.access_token}`,
      });

      // Auto-fetch accounts after connection
      fetchAccounts();
    } catch (error: any) {
      console.error('Error exchanging token:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  }, []);

  // Plaid Link hook
  const config = {
    token: linkToken,
    onSuccess,
  };

  const {open, ready} = usePlaidLink(config);

  // Fetch connected accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('/api/plaid?action=accounts');

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      setAccounts(data.accounts);
      setMessage({type: 'success', text: `Found ${data.accounts.length} account(s)`});
    } catch (error: any) {
      console.error('Error fetching accounts:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await fetch(`/api/plaid?action=transactions&start_date=${startDate}&end_date=${endDate}`);

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data.transactions);
      setMessage({type: 'success', text: `Found ${data.transactions.length} transaction(s) in last 30 days`});
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      setMessage({type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  };

  // Sync transactions to Notion
  const syncToNotion = async () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">Plaid Bank Connection</h2>
        <p className="text-gray-600">Connect your bank accounts and import transactions automatically</p>
      </div>

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
            <div className="flex-1 whitespace-pre-wrap font-mono text-sm">{message.text}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {!linkToken ? (
          <button
            onClick={createLinkToken}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <Link2 size={20} />
            {loading ? 'Creating Link...' : 'Connect Bank Account'}
          </button>
        ) : (
          <button
            onClick={() => open()}
            disabled={!ready || loading}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <Link2 size={20} />
            Open Plaid Link
          </button>
        )}

        <button
          onClick={fetchAccounts}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-black px-6 py-3 rounded-xl font-medium hover:border-black transition-all disabled:opacity-50"
        >
          <RefreshCw size={20} />
          Fetch Accounts
        </button>

        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-black px-6 py-3 rounded-xl font-medium hover:border-black transition-all disabled:opacity-50"
        >
          <Download size={20} />
          Fetch Transactions (30d)
        </button>

        <button
          onClick={syncToNotion}
          disabled={loading || syncing}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-all disabled:opacity-50"
        >
          <Download size={20} />
          {syncing ? 'Syncing...' : 'Sync to Notion'}
        </button>
      </div>

      {/* Accounts Display */}
      {accounts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-black mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <div className="font-medium text-black">{account.name}</div>
                  <div className="text-sm text-gray-500">{account.type} •••• {account.mask}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-black">${account.balance.current?.toLocaleString()}</div>
                  {account.balance.available && (
                    <div className="text-sm text-gray-500">Available: ${account.balance.available.toLocaleString()}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions Display */}
      {transactions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-black mb-4">Recent Transactions ({transactions.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {transactions.slice(0, 50).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <div className="font-medium text-black">{tx.merchantName || tx.name}</div>
                  <div className="text-xs text-gray-500">{tx.category} • {tx.date}</div>
                </div>
                <div className={`font-semibold ${tx.amount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {tx.amount > 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
