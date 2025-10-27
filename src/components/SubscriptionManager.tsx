import React, {useState, useEffect} from 'react';
import {Calendar, AlertTriangle, CheckCircle, DollarSign, TrendingUp, Clock, X, RefreshCw, Lightbulb} from 'lucide-react';

interface SubscriptionData {
  id: string;
  name: string;
  amount: number;
  category: string;
  renewalDate: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  status: 'active' | 'cancelled' | 'expired';
  lastPayment: string;
  nextPayment: string;
  icon: string;
  iconBg: string;
  aiRecommendation?: {
    action: 'keep' | 'cancel' | 'downgrade' | 'negotiate';
    reason: string;
    priority: 'high' | 'medium' | 'low';
    potentialSavings?: number;
    alternative?: string;
  };
}

interface SubscriptionInsights {
  totalMonthlyCost: number;
  totalYearlyCost: number;
  upcomingRenewals: number;
  cancellationOpportunities: Array<{
    subscription: string;
    potentialSavings: number;
    reason: string;
  }>;
  recommendations: Array<{
    type: 'cancel' | 'downgrade' | 'negotiate';
    subscription: string;
    action: string;
    savings: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const SubscriptionManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [insights, setInsights] = useState<SubscriptionInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'renewals' | 'recommendations' | 'analytics'>('overview');
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionData | null>(null);

  const fetchSubscriptionData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch subscription analysis from AI
      const response = await fetch('/api/ai-analyze?type=subscriptions');
      const data = await response.json();
      
      if (data.success && data.insight) {
        setInsights(data.insight);
        
        // Generate mock subscription data with AI recommendations
        const mockSubscriptions: SubscriptionData[] = [
          {
            id: '1',
            name: 'Netflix',
            amount: 15.99,
            category: 'Entertainment',
            renewalDate: '2024-01-15',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-15',
            nextPayment: '2025-01-15',
            icon: 'N',
            iconBg: 'bg-red-500',
            aiRecommendation: {
              action: 'keep',
              reason: 'Good value for entertainment content',
              priority: 'low'
            }
          },
          {
            id: '2',
            name: 'Adobe Creative Cloud',
            amount: 52.99,
            category: 'Software',
            renewalDate: '2024-01-20',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-20',
            nextPayment: '2025-01-20',
            icon: 'A',
            iconBg: 'bg-red-600',
            aiRecommendation: {
              action: 'downgrade',
              reason: 'Consider annual plan for 20% savings',
              priority: 'medium',
              potentialSavings: 127.18,
              alternative: 'Annual plan at $599/year'
            }
          },
          {
            id: '3',
            name: 'Spotify Premium',
            amount: 9.99,
            category: 'Entertainment',
            renewalDate: '2024-01-10',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-10',
            nextPayment: '2025-01-10',
            icon: 'S',
            iconBg: 'bg-green-500',
            aiRecommendation: {
              action: 'keep',
              reason: 'Essential for music streaming',
              priority: 'low'
            }
          },
          {
            id: '4',
            name: 'Microsoft 365',
            amount: 6.99,
            category: 'Software',
            renewalDate: '2024-01-25',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-25',
            nextPayment: '2025-01-25',
            icon: 'M',
            iconBg: 'bg-blue-500',
            aiRecommendation: {
              action: 'negotiate',
              reason: 'Consider family plan for better value',
              priority: 'medium',
              potentialSavings: 20,
              alternative: 'Family plan at $99/year for 6 users'
            }
          },
          {
            id: '5',
            name: 'Amazon Prime',
            amount: 14.99,
            category: 'Shopping',
            renewalDate: '2024-01-05',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-05',
            nextPayment: '2025-01-05',
            icon: 'A',
            iconBg: 'bg-orange-500',
            aiRecommendation: {
              action: 'cancel',
              reason: 'Low usage - consider pay-per-use',
              priority: 'high',
              potentialSavings: 179.88
            }
          },
          {
            id: '6',
            name: 'ChatGPT Plus',
            amount: 20.00,
            category: 'Software',
            renewalDate: '2024-01-12',
            billingCycle: 'monthly',
            status: 'active',
            lastPayment: '2024-12-12',
            nextPayment: '2025-01-12',
            icon: 'C',
            iconBg: 'bg-purple-500',
            aiRecommendation: {
              action: 'keep',
              reason: 'High productivity value',
              priority: 'low'
            }
          }
        ];
        
        setSubscriptions(mockSubscriptions);
      } else {
        throw new Error(data.error || 'Failed to fetch subscription insights');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'cancel': return 'text-red-600 bg-red-100';
      case 'downgrade': return 'text-yellow-600 bg-yellow-100';
      case 'negotiate': return 'text-blue-600 bg-blue-100';
      case 'keep': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingRenewals = () => {
    return subscriptions.filter(sub => {
      const daysUntil = getDaysUntilRenewal(sub.nextPayment);
      return daysUntil <= 7 && daysUntil >= 0;
    });
  };

  const getCancellationOpportunities = () => {
    return subscriptions.filter(sub => 
      sub.aiRecommendation?.action === 'cancel' || sub.aiRecommendation?.action === 'downgrade'
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing subscriptions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchSubscriptionData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Subscription Manager</h2>
            <p className="text-gray-600 mt-1">AI-powered subscription optimization</p>
          </div>
          <button
            onClick={fetchSubscriptionData}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            {id: 'overview', label: 'Overview', icon: DollarSign},
            {id: 'renewals', label: 'Renewals', icon: Calendar},
            {id: 'recommendations', label: 'Recommendations', icon: Lightbulb},
            {id: 'analytics', label: 'Analytics', icon: TrendingUp}
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Monthly Cost</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  ${subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
                </p>
                <p className="text-sm text-blue-700">Active subscriptions</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Upcoming</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{getUpcomingRenewals().length}</p>
                <p className="text-sm text-orange-700">renewals this week</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Savings</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  ${getCancellationOpportunities().reduce((sum, sub) => 
                    sum + (sub.aiRecommendation?.potentialSavings || 0), 0
                  ).toFixed(0)}
                </p>
                <p className="text-sm text-green-700">potential savings</p>
              </div>
            </div>

            {/* Subscription List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Subscriptions</h3>
              <div className="space-y-3">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${subscription.iconBg} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{subscription.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{subscription.name}</h4>
                          <p className="text-sm text-gray-600">{subscription.category}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${subscription.amount}</p>
                        <p className="text-sm text-gray-600">{subscription.billingCycle}</p>
                      </div>
                    </div>
                    
                    {subscription.aiRecommendation && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(subscription.aiRecommendation.action)}`}>
                              {subscription.aiRecommendation.action}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(subscription.aiRecommendation.priority)}`}>
                              {subscription.aiRecommendation.priority} priority
                            </span>
                          </div>
                          {subscription.aiRecommendation.potentialSavings && (
                            <span className="text-sm font-semibold text-green-600">
                              Save ${subscription.aiRecommendation.potentialSavings}/year
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{subscription.aiRecommendation.reason}</p>
                        {subscription.aiRecommendation.alternative && (
                          <p className="text-sm text-blue-600 mt-1">
                            Alternative: {subscription.aiRecommendation.alternative}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Renewals</h3>
            {getUpcomingRenewals().map((subscription) => (
              <div key={subscription.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${subscription.iconBg} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{subscription.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subscription.name}</h4>
                      <p className="text-sm text-gray-600">Next payment: {subscription.nextPayment}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${subscription.amount}</p>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {getDaysUntilRenewal(subscription.nextPayment)} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {getUpcomingRenewals().length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Renewals</h3>
                <p className="text-gray-600">No subscriptions are renewing in the next 7 days.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
            {getCancellationOpportunities().map((subscription) => (
              <div key={subscription.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${subscription.iconBg} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{subscription.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subscription.name}</h4>
                      <p className="text-sm text-gray-600">{subscription.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${subscription.amount}</p>
                    <p className="text-sm text-gray-600">per month</p>
                  </div>
                </div>
                
                {subscription.aiRecommendation && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(subscription.aiRecommendation.action)}`}>
                        {subscription.aiRecommendation.action}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(subscription.aiRecommendation.priority)}`}>
                        {subscription.aiRecommendation.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{subscription.aiRecommendation.reason}</p>
                    {subscription.aiRecommendation.potentialSavings && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600">
                          Potential Savings: ${subscription.aiRecommendation.potentialSavings}/year
                        </span>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Take Action
                        </button>
                      </div>
                    )}
                    {subscription.aiRecommendation.alternative && (
                      <p className="text-sm text-blue-600 mt-2">
                        Alternative: {subscription.aiRecommendation.alternative}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {getCancellationOpportunities().length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Job!</h3>
                <p className="text-gray-600">No optimization recommendations at this time.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Analytics</h3>
            
            {/* Category Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Spending by Category</h4>
              <div className="space-y-2">
                {Object.entries(
                  subscriptions.reduce((acc, sub) => {
                    acc[sub.category] = (acc[sub.category] || 0) + sub.amount;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Cycle Analysis */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Billing Cycles</h4>
              <div className="space-y-2">
                {Object.entries(
                  subscriptions.reduce((acc, sub) => {
                    acc[sub.billingCycle] = (acc[sub.billingCycle] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([cycle, count]) => (
                  <div key={cycle} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{cycle}</span>
                    <span className="font-semibold text-gray-900">{count} subscriptions</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Trends */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Cost Analysis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    ${subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    ${(subscriptions.reduce((sum, sub) => sum + sub.amount, 0) * 12).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Yearly Cost</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManager;
