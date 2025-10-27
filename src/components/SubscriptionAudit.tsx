import React from 'react';
import {AlertTriangle, CheckCircle, XCircle} from 'lucide-react';

interface SubscriptionAuditProps {
  subscriptionData: any;
  recommendations: any[];
}

export const SubscriptionAudit = ({subscriptionData, recommendations}: SubscriptionAuditProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!subscriptionData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const subscriptions = subscriptionData.subscriptions || [];
  const subscriptionCategories = subscriptionData.subscriptionCategories || {};
  const failedPayments = subscriptionData.failedPayments || [];
  const potentialSavings = subscriptionData.potentialSavings || {};

  const getStatusIcon = (subscription: any) => {
    if (subscription.status === 'failed') {
      return <XCircle className="w-5 h-5 text-red-600" />;
    } else if (subscription.failedPayments > 0) {
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    } else {
      return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscription Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Subscription Summary</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Total Subscriptions</div>
            <div className="text-xl font-bold text-blue-600">
              {subscriptionData.summary.totalSubscriptions}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 mb-1">Monthly Cost</div>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(subscriptionData.summary.totalMonthlyCost)}
            </div>
          </div>
        </div>

        {failedPayments.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {failedPayments.length} failed payments detected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Potential Savings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Potential Savings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="text-sm text-emerald-600 mb-1">Cancel Unused</div>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(potentialSavings.cancelUnused)}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Downgrade Plans</div>
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(potentialSavings.downgrade)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="text-sm font-medium text-emerald-800 mb-1">Total Potential Savings</div>
          <div className="text-xl font-bold text-emerald-600">
            {formatCurrency(potentialSavings.total)}/month
          </div>
        </div>
      </div>

      {/* Subscription Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">By Category</h3>
        <div className="space-y-4">
          {Object.entries(subscriptionCategories).map(([category, subs]: [string, any]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-black capitalize">{category}</h4>
                <div className="text-sm text-gray-600">
                  {subs.length} subscription{subs.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="space-y-2">
                {subs.map((sub: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(sub)}
                      <span className="text-sm font-medium text-black">{sub.name}</span>
                    </div>
                    <div className="text-sm font-semibold text-black">
                      {formatCurrency(sub.monthlyAmount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Subscriptions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">All Subscriptions</h3>
        <div className="space-y-3">
          {subscriptions.map((subscription: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(subscription)}
                  <span className="font-medium text-black">{subscription.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-black">
                    {formatCurrency(subscription.monthlyAmount)}/month
                  </div>
                  <div className="text-sm text-gray-600">
                    {subscription.frequency}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  {subscription.count} payments • Last: {new Date(subscription.lastPayment).toLocaleDateString()}
                </div>
                {subscription.failedPayments > 0 && (
                  <div className="text-red-600 font-medium">
                    {subscription.failedPayments} failed
                  </div>
                )}
              </div>
              
              {subscription.isBusiness && (
                <div className="mt-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Business
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Recommendations</h3>
        <div className="space-y-4">
          {recommendations.slice(0, 5).map((rec: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-black">{rec.subscription}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {rec.priority} priority
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">{rec.reason}</div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 capitalize">
                  Action: {rec.action}
                </div>
                <div className="font-semibold text-emerald-600">
                  Save: {formatCurrency(rec.monthlySavings)}/month
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Payments Detail */}
      {failedPayments.length > 0 && (
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4">Failed Payments</h3>
          <div className="space-y-2">
            {failedPayments.slice(0, 10).map((payment: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <div>
                  <div className="text-sm font-medium text-red-800">{payment.merchant}</div>
                  <div className="text-xs text-red-600">
                    {new Date(payment.date).toLocaleDateString()} • {payment.month}
                  </div>
                </div>
                <div className="text-sm font-semibold text-red-600">
                  {formatCurrency(payment.amount)}
                </div>
              </div>
            ))}
          </div>
          
          {failedPayments.length > 10 && (
            <div className="mt-3 text-sm text-red-600 text-center">
              ... and {failedPayments.length - 10} more failed payments
            </div>
          )}
        </div>
      )}
    </div>
  );
};
