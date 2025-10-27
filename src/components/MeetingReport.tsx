import React, {useState, useEffect} from 'react';
import {TrendingUp, DollarSign, Users, CreditCard, AlertCircle, CheckCircle} from 'lucide-react';
import {DataVerification} from './DataVerification';
import {ExecutiveSummary} from './ExecutiveSummary';
import {MonthlyTrendChart} from './MonthlyTrendChart';
import {CategoryBreakdown} from './CategoryBreakdown';
import {SubscriptionAudit} from './SubscriptionAudit';
import {ActionItems} from './ActionItems';

interface MeetingData {
  verification: any;
  monthlyComparison: any;
  categoryAnalysis: any;
  subscriptionAnalysis: any;
  accountAnalysis: any;
  personAnalysis: any;
}

export const MeetingReport = () => {
  const [data, setData] = useState<MeetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        const [
          verificationRes,
          monthlyRes,
          categoryRes,
          subscriptionRes,
          accountRes,
          personRes
        ] = await Promise.all([
          fetch('/api/verify-data'),
          fetch('/api/reports/monthly-comparison'),
          fetch('/api/reports/category-analysis'),
          fetch('/api/reports/subscriptions'),
          fetch('/api/reports/by-account'),
          fetch('/api/reports/by-person')
        ]);

        if (!verificationRes.ok || !monthlyRes.ok || !categoryRes.ok || 
            !subscriptionRes.ok || !accountRes.ok || !personRes.ok) {
          throw new Error('Failed to fetch one or more reports');
        }

        const [
          verification,
          monthlyComparison,
          categoryAnalysis,
          subscriptionAnalysis,
          accountAnalysis,
          personAnalysis
        ] = await Promise.all([
          verificationRes.json(),
          monthlyRes.json(),
          categoryRes.json(),
          subscriptionRes.json(),
          accountRes.json(),
          personRes.json()
        ]);

        setData({
          verification,
          monthlyComparison,
          categoryAnalysis,
          subscriptionAnalysis,
          accountAnalysis,
          personAnalysis
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch meeting data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const tabs = [
    {id: 'overview', label: 'Overview', icon: DollarSign},
    {id: 'verification', label: 'Data Check', icon: CheckCircle},
    {id: 'trends', label: 'Trends', icon: TrendingUp},
    {id: 'categories', label: 'Categories', icon: CreditCard},
    {id: 'subscriptions', label: 'Subscriptions', icon: AlertCircle},
    {id: 'actions', label: 'Action Items', icon: Users}
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="max-w-md mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 text-red-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <h2 className="font-semibold">Error Loading Meeting Data</h2>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-black mb-2">Family Finance Meeting</h1>
          <p className="text-sm text-gray-600">July - September 2025 Analysis</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-md mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        {activeTab === 'overview' && (
          <ExecutiveSummary 
            monthlyData={data.monthlyComparison}
            categoryData={data.categoryAnalysis}
            subscriptionData={data.subscriptionAnalysis}
            verificationData={data.verification}
          />
        )}

        {activeTab === 'verification' && (
          <DataVerification />
        )}

        {activeTab === 'trends' && (
          <MonthlyTrendChart 
            monthlyData={data.monthlyComparison}
            accountData={data.accountAnalysis}
            personData={data.personAnalysis}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryBreakdown 
            categoryData={data.categoryAnalysis}
            monthlyData={data.monthlyComparison}
          />
        )}

        {activeTab === 'subscriptions' && (
          <SubscriptionAudit 
            subscriptionData={data.subscriptionAnalysis}
            recommendations={data.subscriptionAnalysis.recommendations}
          />
        )}

        {activeTab === 'actions' && (
          <ActionItems 
            categoryData={data.categoryAnalysis}
            subscriptionData={data.subscriptionAnalysis}
            accountData={data.accountAnalysis}
            personData={data.personAnalysis}
          />
        )}
      </div>

      {/* Print Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <button
          onClick={() => window.print()}
          className="bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
