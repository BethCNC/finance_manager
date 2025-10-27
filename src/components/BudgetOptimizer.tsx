import React, {useState, useEffect} from 'react';
import {TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, DollarSign, Lightbulb, BarChart3, PiggyBank} from 'lucide-react';

interface BudgetOptimizationData {
  budgetHealth: 'good' | 'fair' | 'poor';
  overBudgetCategories: Array<{
    category: string;
    budgeted: number;
    actual: number;
    variance: number;
    percentage: number;
  }>;
  underBudgetCategories: Array<{
    category: string;
    budgeted: number;
    actual: number;
    variance: number;
    percentage: number;
  }>;
  recommendations: Array<{
    category: string;
    action: 'reduce' | 'increase' | 'maintain';
    currentAmount: number;
    suggestedAmount: number;
    savings: number;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  nextMonthSuggestions: string[];
  optimizationOpportunities: Array<{
    category: string;
    currentSpending: number;
    optimizedSpending: number;
    potentialSavings: number;
    method: string;
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
  }>;
  budgetAllocationAdvice: {
    income: number;
    recommendedAllocation: {
      needs: number;
      wants: number;
      savings: number;
    };
    currentAllocation: {
      needs: number;
      wants: number;
      savings: number;
    };
    adjustments: string[];
  };
}

const BudgetOptimizer: React.FC = () => {
  const [optimizationData, setOptimizationData] = useState<BudgetOptimizationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'opportunities' | 'allocation'>('overview');

  const fetchOptimizationData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai-analyze?type=budget');
      const data = await response.json();
      
      if (data.success && data.insight) {
        setOptimizationData(data.insight);
      } else {
        throw new Error(data.error || 'Failed to fetch optimization data');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptimizationData();
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'fair': return <AlertTriangle className="w-5 h-5" />;
      case 'poor': return <AlertTriangle className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
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

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing budget optimization...</span>
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
            onClick={fetchOptimizationData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!optimizationData) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Unable to generate budget optimization analysis.</p>
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
            <h2 className="text-xl font-bold text-gray-900">Budget Optimizer</h2>
            <p className="text-gray-600 mt-1">AI-powered budget analysis and recommendations</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getHealthColor(optimizationData.budgetHealth)}`}>
            {getHealthIcon(optimizationData.budgetHealth)}
            <span className="font-medium capitalize">{optimizationData.budgetHealth} Health</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            {id: 'overview', label: 'Overview', icon: BarChart3},
            {id: 'recommendations', label: 'Recommendations', icon: Target},
            {id: 'opportunities', label: 'Opportunities', icon: Lightbulb},
            {id: 'allocation', label: 'Allocation', icon: PiggyBank}
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
            {/* Budget Health Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Over Budget</span>
                </div>
                <p className="text-2xl font-bold text-red-900">{optimizationData.overBudgetCategories.length}</p>
                <p className="text-sm text-red-700">categories</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Under Budget</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{optimizationData.underBudgetCategories.length}</p>
                <p className="text-sm text-green-700">categories</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Potential Savings</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  ${optimizationData.optimizationOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0).toFixed(0)}
                </p>
                <p className="text-sm text-blue-700">per month</p>
              </div>
            </div>

            {/* Over Budget Categories */}
            {optimizationData.overBudgetCategories.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Over Budget Categories</h3>
                <div className="space-y-3">
                  {optimizationData.overBudgetCategories.map((category, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-red-900">{category.category}</h4>
                          <p className="text-sm text-red-700">
                            Budgeted: ${category.budgeted} | Actual: ${category.actual}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-900">+${category.variance}</p>
                          <p className="text-sm text-red-700">+{category.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Under Budget Categories */}
            {optimizationData.underBudgetCategories.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Under Budget Categories</h3>
                <div className="space-y-3">
                  {optimizationData.underBudgetCategories.map((category, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-green-900">{category.category}</h4>
                          <p className="text-sm text-green-700">
                            Budgeted: ${category.budgeted} | Actual: ${category.actual}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-900">-${Math.abs(category.variance)}</p>
                          <p className="text-sm text-green-700">{category.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
            {optimizationData.recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">${rec.savings}</p>
                    <p className="text-sm text-gray-600">potential savings</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700 mb-2">{rec.reason}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Current: ${rec.currentAmount}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-600">Suggested: ${rec.suggestedAmount}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.action === 'reduce' ? 'bg-red-100 text-red-700' :
                    rec.action === 'increase' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {rec.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
            {optimizationData.optimizationOpportunities.map((opp, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{opp.category}</h4>
                    <p className="text-sm text-gray-600 mt-1">{opp.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${opp.potentialSavings}</p>
                    <p className="text-sm text-gray-600">monthly savings</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-gray-600">Current: ${opp.currentSpending}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-600">Optimized: ${opp.optimizedSpending}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(opp.effort)}`}>
                    {opp.effort} effort
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(opp.impact)}`}>
                    {opp.impact} impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation Analysis</h3>
            
            {/* Current vs Recommended Allocation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Current Allocation</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Needs</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.currentAllocation.needs}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wants</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.currentAllocation.wants}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.currentAllocation.savings}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Allocation</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Needs</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.recommendedAllocation.needs}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wants</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.recommendedAllocation.wants}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-semibold">{optimizationData.budgetAllocationAdvice.recommendedAllocation.savings}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adjustment Recommendations */}
            {optimizationData.budgetAllocationAdvice.adjustments.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Adjustments</h4>
                <div className="space-y-2">
                  {optimizationData.budgetAllocationAdvice.adjustments.map((adjustment, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{adjustment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next Month Suggestions */}
        {optimizationData.nextMonthSuggestions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Month Suggestions</h3>
            <div className="space-y-2">
              {optimizationData.nextMonthSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Target className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOptimizer;
