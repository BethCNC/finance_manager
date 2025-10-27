import React from 'react';
import {DollarSign, TrendingDown, Users, CreditCard} from 'lucide-react';

interface ActionItemsProps {
  categoryData: any;
  subscriptionData: any;
  accountData: any;
  personData: any;
}

export const ActionItems = ({categoryData, subscriptionData, accountData, personData}: ActionItemsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!categoryData || !subscriptionData || !accountData || !personData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Generate comprehensive action items
  interface ActionItem {
    id: string;
    type: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: string;
    icon: React.ComponentType<any>;
    category: string;
  }

  const actionItems: ActionItem[] = [];

  // Category-based actions
  const costCuttingOpportunities = categoryData.costCuttingOpportunities || [];
  costCuttingOpportunities.slice(0, 3).forEach((opportunity: any) => {
    actionItems.push({
      id: `category-${opportunity.category}`,
      type: 'cost_reduction',
      priority: opportunity.priority,
      title: `Reduce ${opportunity.category} spending`,
      description: opportunity.reason,
      impact: `Save ${formatCurrency(opportunity.potentialSavings)}/month`,
      icon: TrendingDown,
      category: 'Spending Optimization'
    });
  });

  // Subscription-based actions
  const subscriptionRecommendations = subscriptionData.recommendations || [];
  subscriptionRecommendations.slice(0, 3).forEach((rec: any) => {
    actionItems.push({
      id: `subscription-${rec.subscription}`,
      type: 'subscription',
      priority: rec.priority,
      title: `${rec.action} ${rec.subscription}`,
      description: rec.reason,
      impact: `Save ${formatCurrency(rec.monthlySavings)}/month`,
      icon: CreditCard,
      category: 'Subscriptions'
    });
  });

  // Account-based actions
  const feeOptimization = accountData.feeOptimization || [];
  feeOptimization.slice(0, 2).forEach((rec: any) => {
    actionItems.push({
      id: `account-${rec.account}`,
      type: 'fee_optimization',
      priority: rec.priority,
      title: `Optimize ${rec.account} fees`,
      description: rec.reason,
      impact: `Save ${formatCurrency(rec.potentialSavings)}`,
      icon: DollarSign,
      category: 'Account Management'
    });
  });

  // Person-based actions
  const personRecommendations = personData.recommendations || [];
  personRecommendations.slice(0, 2).forEach((rec: any) => {
    actionItems.push({
      id: `person-${rec.person || 'general'}`,
      type: 'spending_balance',
      priority: rec.priority,
      title: rec.message,
      description: rec.suggestion,
      impact: 'Improve financial balance',
      icon: Users,
      category: 'Family Finance'
    });
  });

  // Sort by priority and impact
  actionItems.sort((a, b) => {
    const priorityOrder: Record<string, number> = {high: 3, medium: 2, low: 1};
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Spending Optimization': return 'bg-blue-50 text-blue-800';
      case 'Subscriptions': return 'bg-purple-50 text-purple-800';
      case 'Account Management': return 'bg-green-50 text-green-800';
      case 'Family Finance': return 'bg-pink-50 text-pink-800';
      default: return 'bg-gray-50 text-gray-800';
    }
  };

  // Calculate total potential savings
  const totalSavings = actionItems.reduce((sum, item) => {
    const savingsMatch = item.impact.match(/\$[\d,]+\.?\d*/);
    if (savingsMatch) {
      const amount = parseFloat(savingsMatch[0].replace(/[$,]/g, ''));
      return sum + amount;
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Action Plan Summary</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="text-sm text-emerald-600 mb-1">Total Actions</div>
            <div className="text-xl font-bold text-emerald-600">{actionItems.length}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Potential Savings</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(totalSavings)}/month
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="text-sm font-medium text-emerald-800 mb-1">Annual Impact</div>
          <div className="text-lg font-bold text-emerald-600">
            {formatCurrency(totalSavings * 12)}/year
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-4">
        {actionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{item.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-emerald-600">{item.impact}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">{item.description}</div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Action #{index + 1}
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Mark Complete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Implementation Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-red-600">1</span>
            </div>
            <div>
              <div className="font-medium text-red-800">Week 1: Cancel Failed Subscriptions</div>
              <div className="text-sm text-red-600">
                Focus on subscriptions with multiple failed payments
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-600">2</span>
            </div>
            <div>
              <div className="font-medium text-yellow-800">Week 2: Review High-Cost Categories</div>
              <div className="text-sm text-yellow-600">
                Implement spending limits for top expense categories
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">3</span>
            </div>
            <div>
              <div className="font-medium text-blue-800">Week 3: Optimize Account Fees</div>
              <div className="text-sm text-blue-600">
                Switch to fee-free accounts or negotiate better rates
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-green-600">4</span>
            </div>
            <div>
              <div className="font-medium text-green-800">Week 4: Establish New Budget</div>
              <div className="text-sm text-green-600">
                Create monthly budget based on optimized spending
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Target Monthly Savings</div>
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(totalSavings * 0.8)}
            </div>
            <div className="text-xs text-gray-500">80% of potential</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Target Completion</div>
            <div className="text-lg font-bold text-gray-800">4 weeks</div>
            <div className="text-xs text-gray-500">All high-priority items</div>
          </div>
        </div>
      </div>
    </div>
  );
};
