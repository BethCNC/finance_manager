import React, {useState, useEffect} from 'react';
import {Target, TrendingUp, Calendar, DollarSign, Plus, Edit, Trash2, CheckCircle, AlertCircle, Clock} from 'lucide-react';

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'emergency' | 'vacation' | 'home' | 'debt' | 'investment' | 'education' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  milestones: Array<{
    id: string;
    amount: number;
    date: string;
    description: string;
    completed: boolean;
  }>;
}

interface GoalProgress {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  totalTargetAmount: number;
  totalCurrentAmount: number;
  overallProgress: number;
  onTrackGoals: number;
  behindGoals: number;
}

const FinancialGoals: React.FC = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [progress, setProgress] = useState<GoalProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'progress' | 'milestones'>('overview');
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);

  // Mock goals data
  const mockGoals: FinancialGoal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build 6-month emergency fund for unexpected expenses',
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2025-06-01',
      category: 'emergency',
      priority: 'high',
      status: 'active',
      createdAt: '2024-01-01',
      milestones: [
        {id: '1', amount: 2500, date: '2024-03-01', description: 'First milestone', completed: true},
        {id: '2', amount: 5000, date: '2024-06-01', description: 'Halfway point', completed: true},
        {id: '3', amount: 10000, date: '2024-12-01', description: 'Almost there', completed: false},
        {id: '4', amount: 15000, date: '2025-06-01', description: 'Goal achieved', completed: false}
      ]
    },
    {
      id: '2',
      title: 'Vacation Fund',
      description: 'Save for European vacation next summer',
      targetAmount: 5000,
      currentAmount: 3200,
      targetDate: '2025-05-01',
      category: 'vacation',
      priority: 'medium',
      status: 'active',
      createdAt: '2024-02-01',
      milestones: [
        {id: '1', amount: 1000, date: '2024-05-01', description: 'Initial savings', completed: true},
        {id: '2', amount: 2500, date: '2024-08-01', description: 'Halfway point', completed: true},
        {id: '3', amount: 5000, date: '2025-05-01', description: 'Ready to travel', completed: false}
      ]
    },
    {
      id: '3',
      title: 'Home Down Payment',
      description: 'Save for 20% down payment on first home',
      targetAmount: 60000,
      currentAmount: 18500,
      targetDate: '2026-12-01',
      category: 'home',
      priority: 'high',
      status: 'active',
      createdAt: '2024-01-15',
      milestones: [
        {id: '1', amount: 10000, date: '2024-06-01', description: 'First 10k', completed: true},
        {id: '2', amount: 20000, date: '2024-12-01', description: 'One-third saved', completed: false},
        {id: '3', amount: 40000, date: '2025-12-01', description: 'Two-thirds saved', completed: false},
        {id: '4', amount: 60000, date: '2026-12-01', description: 'Ready to buy', completed: false}
      ]
    },
    {
      id: '4',
      title: 'Credit Card Payoff',
      description: 'Pay off high-interest credit card debt',
      targetAmount: 8000,
      currentAmount: 8000,
      targetDate: '2024-12-01',
      category: 'debt',
      priority: 'high',
      status: 'completed',
      createdAt: '2024-01-01',
      milestones: [
        {id: '1', amount: 2000, date: '2024-03-01', description: 'First payment', completed: true},
        {id: '2', amount: 4000, date: '2024-06-01', description: 'Halfway paid', completed: true},
        {id: '3', amount: 6000, date: '2024-09-01', description: 'Almost done', completed: true},
        {id: '4', amount: 8000, date: '2024-12-01', description: 'Debt free!', completed: true}
      ]
    }
  ];

  useEffect(() => {
    setGoals(mockGoals);
    calculateProgress();
  }, []);

  const calculateProgress = () => {
    const activeGoals = goals.filter(g => g.status === 'active');
    const completedGoals = goals.filter(g => g.status === 'completed');
    
    const totalTargetAmount = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;
    
    const onTrackGoals = activeGoals.filter(goal => {
      const daysElapsed = Math.max(0, (new Date().getTime() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      const totalDays = (new Date(goal.targetDate).getTime() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      const expectedProgress = Math.min(100, (daysElapsed / totalDays) * 100);
      const actualProgress = (goal.currentAmount / goal.targetAmount) * 100;
      return actualProgress >= expectedProgress - 10; // 10% tolerance
    }).length;
    
    const behindGoals = activeGoals.length - onTrackGoals;

    setProgress({
      totalGoals: goals.length,
      activeGoals: activeGoals.length,
      completedGoals: completedGoals.length,
      totalTargetAmount,
      totalCurrentAmount,
      overallProgress,
      onTrackGoals,
      behindGoals
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'vacation': return 'text-blue-600 bg-blue-100';
      case 'home': return 'text-green-600 bg-green-100';
      case 'debt': return 'text-orange-600 bg-orange-100';
      case 'investment': return 'text-purple-600 bg-purple-100';
      case 'education': return 'text-indigo-600 bg-indigo-100';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGoalProgress = (goal: FinancialGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const isGoalOnTrack = (goal: FinancialGoal) => {
    const daysElapsed = Math.max(0, (new Date().getTime() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = (new Date(goal.targetDate).getTime() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const expectedProgress = Math.min(100, (daysElapsed / totalDays) * 100);
    const actualProgress = getGoalProgress(goal);
    return actualProgress >= expectedProgress - 10; // 10% tolerance
  };

  const getNextMilestone = (goal: FinancialGoal) => {
    return goal.milestones.find(milestone => !milestone.completed);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading goals...</span>
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
            <h2 className="text-xl font-bold text-gray-900">Financial Goals</h2>
            <p className="text-gray-600 mt-1">Track your progress toward financial milestones</p>
          </div>
          <button
            onClick={() => setIsGoalFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            {id: 'overview', label: 'Overview', icon: Target},
            {id: 'goals', label: 'Goals', icon: DollarSign},
            {id: 'progress', label: 'Progress', icon: TrendingUp},
            {id: 'milestones', label: 'Milestones', icon: Calendar}
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
        {activeTab === 'overview' && progress && (
          <div className="space-y-6">
            {/* Progress Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Total Goals</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{progress.totalGoals}</p>
                <p className="text-sm text-blue-700">financial goals</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Completed</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{progress.completedGoals}</p>
                <p className="text-sm text-green-700">goals achieved</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">On Track</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{progress.onTrackGoals}</p>
                <p className="text-sm text-purple-700">of {progress.activeGoals} active</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Saved</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  ${progress.totalCurrentAmount.toLocaleString()}
                </p>
                <p className="text-sm text-orange-700">of ${progress.totalTargetAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Progress</span>
                  <span className="font-semibold text-gray-900">{progress.overallProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{width: `${progress.overallProgress}%`}}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${progress.totalCurrentAmount.toLocaleString()}</span>
                  <span>${progress.totalTargetAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        goal.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {goal.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Target className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                        <p className="text-sm text-gray-600">
                          ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {getGoalProgress(goal).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-600">
                        {goal.status === 'completed' ? 'Completed' : 
                         getDaysUntilTarget(goal.targetDate) > 0 ? 
                         `${getDaysUntilTarget(goal.targetDate)} days left` : 'Overdue'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Goals</h3>
            {goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      goal.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {goal.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Target className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getGoalProgress(goal).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{width: `${getGoalProgress(goal)}%`}}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    {goal.status === 'active' && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {getDaysUntilTarget(goal.targetDate) > 0 ? 
                           `${getDaysUntilTarget(goal.targetDate)} days left` : 'Overdue'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isGoalOnTrack(goal) && goal.status === 'active' && (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                    <button
                      onClick={() => setEditingGoal(goal)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Analysis</h3>
            
            {/* Goals Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">On Track</h4>
                <p className="text-2xl font-bold text-green-900">{progress?.onTrackGoals || 0}</p>
                <p className="text-sm text-green-700">goals meeting targets</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Behind Schedule</h4>
                <p className="text-2xl font-bold text-orange-900">{progress?.behindGoals || 0}</p>
                <p className="text-sm text-orange-700">goals need attention</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Completed</h4>
                <p className="text-2xl font-bold text-blue-900">{progress?.completedGoals || 0}</p>
                <p className="text-sm text-blue-700">goals achieved</p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Goals by Category</h4>
              <div className="space-y-2">
                {Object.entries(
                  goals.reduce((acc, goal) => {
                    acc[goal.category] = (acc[goal.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{category}</span>
                    <span className="font-semibold text-gray-900">{count} goals</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
            {goals.filter(goal => goal.status === 'active').map((goal) => {
              const nextMilestone = getNextMilestone(goal);
              if (!nextMilestone) return null;
              
              return (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                        <p className="text-sm text-gray-600">{nextMilestone.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${nextMilestone.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(nextMilestone.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Current: ${goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      Need: ${(nextMilestone.amount - goal.currentAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialGoals;
