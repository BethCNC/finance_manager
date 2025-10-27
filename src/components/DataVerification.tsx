import React, {useState, useEffect} from 'react';
import {AlertCircle, CheckCircle, XCircle} from 'lucide-react';

interface VerificationData {
  totalTransactions: number;
  accounts: Record<string, {
    exists: boolean;
    months: Record<string, any>;
    totalTransactions: number;
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  }>;
  months: Record<string, {
    accounts: Record<string, {
      transactions: number;
      income: number;
      expenses: number;
      netProfit: number;
    }>;
    totalTransactions: number;
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  }>;
  dataQuality: {
    uncategorized: number;
    missingMerchant: number;
    missingPerson: number;
    missingAccount: number;
    missingDate: number;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  };
  status: {
    isComplete: boolean;
    missingAccounts: string[];
    emptyMonths: string[];
    dataQualityScore: number;
  };
}

export const DataVerification = () => {
  const [verification, setVerification] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const response = await fetch('/api/verify-data');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setVerification(data);
      } catch (err) {
        console.error('API Error:', err);
        // Check if this is likely a local development issue
        if (err instanceof Error && err.message.includes('Failed to fetch')) {
          setError('API routes not available in local development. Please deploy to Vercel to access real data, or check that the development server is running with API support.');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to fetch verification data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (isComplete: boolean, dataQualityScore: number) => {
    if (isComplete && dataQualityScore >= 90) {
      return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    } else if (isComplete && dataQualityScore >= 70) {
      return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    } else {
      return <XCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getStatusColor = (isComplete: boolean, dataQualityScore: number) => {
    if (isComplete && dataQualityScore >= 90) {
      return 'text-emerald-600';
    } else if (isComplete && dataQualityScore >= 70) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="w-5 h-5" />
          <h3 className="font-semibold">Data Verification Error</h3>
        </div>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!verification) return null;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Data Verification Status</h2>
          {getStatusIcon(verification.status.isComplete, verification.status.dataQualityScore)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Total Transactions</div>
            <div className="text-2xl font-bold text-black">{verification.totalTransactions.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Data Quality Score</div>
            <div className={`text-2xl font-bold ${getStatusColor(verification.status.isComplete, verification.status.dataQualityScore)}`}>
              {verification.status.dataQualityScore}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Overall Status</div>
            <div className={`text-lg font-semibold ${getStatusColor(verification.status.isComplete, verification.status.dataQualityScore)}`}>
              {verification.status.isComplete ? 'Complete' : 'Incomplete'}
            </div>
          </div>
        </div>

        {/* Summary Totals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="text-sm text-emerald-600 mb-1">Total Income</div>
            <div className="text-xl font-bold text-emerald-600">{formatCurrency(verification.summary.totalIncome)}</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-sm text-red-600 mb-1">Total Expenses</div>
            <div className="text-xl font-bold text-red-600">{formatCurrency(verification.summary.totalExpenses)}</div>
          </div>
          <div className={`rounded-lg p-4 ${verification.summary.netProfit >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <div className={`text-sm mb-1 ${verification.summary.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              Net Profit
            </div>
            <div className={`text-xl font-bold ${verification.summary.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {formatCurrency(verification.summary.netProfit)}
            </div>
          </div>
        </div>
      </div>

      {/* Issues */}
      {(verification.status.missingAccounts.length > 0 || verification.status.emptyMonths.length > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-4">Issues Found</h3>
          
          {verification.status.missingAccounts.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-yellow-800 mb-2">Missing Accounts:</h4>
              <ul className="list-disc list-inside text-yellow-700">
                {verification.status.missingAccounts.map(account => (
                  <li key={account}>{account}</li>
                ))}
              </ul>
            </div>
          )}

          {verification.status.emptyMonths.length > 0 && (
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Empty Months:</h4>
              <ul className="list-disc list-inside text-yellow-700">
                {verification.status.emptyMonths.map(month => (
                  <li key={month}>{month}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Data Quality Issues */}
      {(verification.dataQuality.uncategorized > 0 || verification.dataQuality.missingMerchant > 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-4">Data Quality Issues</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {verification.dataQuality.uncategorized > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{verification.dataQuality.uncategorized}</div>
                <div className="text-sm text-blue-600">Uncategorized</div>
              </div>
            )}
            {verification.dataQuality.missingMerchant > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{verification.dataQuality.missingMerchant}</div>
                <div className="text-sm text-blue-600">Missing Merchant</div>
              </div>
            )}
            {verification.dataQuality.missingPerson > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{verification.dataQuality.missingPerson}</div>
                <div className="text-sm text-blue-600">Missing Person</div>
              </div>
            )}
            {verification.dataQuality.missingAccount > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{verification.dataQuality.missingAccount}</div>
                <div className="text-sm text-blue-600">Missing Account</div>
              </div>
            )}
            {verification.dataQuality.missingDate > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{verification.dataQuality.missingDate}</div>
                <div className="text-sm text-blue-600">Missing Date</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Account Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Account Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Account</th>
                <th className="text-right py-2 font-medium text-gray-700">Transactions</th>
                <th className="text-right py-2 font-medium text-gray-700">Income</th>
                <th className="text-right py-2 font-medium text-gray-700">Expenses</th>
                <th className="text-right py-2 font-medium text-gray-700">Net</th>
                <th className="text-center py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(verification.accounts).map(([account, data]) => (
                <tr key={account} className="border-b border-gray-100">
                  <td className="py-2 font-medium text-black">{account}</td>
                  <td className="py-2 text-right text-gray-700">{data.totalTransactions}</td>
                  <td className="py-2 text-right text-emerald-600">{formatCurrency(data.totalIncome)}</td>
                  <td className="py-2 text-right text-red-600">{formatCurrency(data.totalExpenses)}</td>
                  <td className={`py-2 text-right font-medium ${data.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(data.netProfit)}
                  </td>
                  <td className="py-2 text-center">
                    {data.exists ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Monthly Breakdown (July-September 2025)</h3>
        <div className="space-y-4">
          {Object.entries(verification.months).map(([month, data]) => (
            <div key={month} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-black">{month}</h4>
                <div className="text-sm text-gray-600">
                  {data.totalTransactions} transactions
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-emerald-50 rounded p-3">
                  <div className="text-sm text-emerald-600">Income</div>
                  <div className="font-semibold text-emerald-600">{formatCurrency(data.totalIncome)}</div>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <div className="text-sm text-red-600">Expenses</div>
                  <div className="font-semibold text-red-600">{formatCurrency(data.totalExpenses)}</div>
                </div>
                <div className={`rounded p-3 ${data.netProfit >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <div className={`text-sm ${data.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>Net</div>
                  <div className={`font-semibold ${data.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(data.netProfit)}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <strong>By Account:</strong> {Object.entries(data.accounts)
                  .filter(([_, accountData]) => accountData.transactions > 0)
                  .map(([account, accountData]) => 
                    `${account} (${accountData.transactions} txns, ${formatCurrency(accountData.netProfit)})`
                  ).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
