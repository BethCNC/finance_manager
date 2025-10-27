import React, {useState, useEffect} from 'react';
import {Bell, BellOff, Settings, CheckCircle, AlertCircle, Clock, DollarSign, Target} from 'lucide-react';
import {notificationService} from '../services/notificationService';

interface NotificationSettings {
  dailySummary: boolean;
  weeklyReport: boolean;
  budgetAlerts: boolean;
  goalMilestones: boolean;
  subscriptionRenewals: boolean;
  spendingAlerts: boolean;
  savingsOpportunities: boolean;
}

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    dailySummary: true,
    weeklyReport: true,
    budgetAlerts: true,
    goalMilestones: true,
    subscriptionRenewals: true,
    spendingAlerts: true,
    savingsOpportunities: true
  });
  
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(notificationService.isNotificationEnabled());
    setPermissionStatus(notificationService.getPermissionStatus());
    
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const requestPermission = async () => {
    const permission = await notificationService.requestPermission();
    setPermissionStatus(permission);
    setIsSupported(notificationService.isNotificationEnabled());
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = {...settings, [key]: value};
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const testNotification = async (type: string) => {
    if (!isSupported) {
      alert('Notifications are not supported or permission is denied');
      return;
    }

    switch (type) {
      case 'daily':
        await notificationService.showDailySummary({
          totalIncome: 500,
          totalExpenses: 300,
          netIncome: 200,
          topCategory: 'Food & Groceries',
          goalProgress: 75
        });
        break;
      case 'budget':
        await notificationService.showBudgetWarning('Food & Groceries', 450, 400, 112.5);
        break;
      case 'goal':
        await notificationService.showGoalMilestone({
          name: 'Emergency Fund',
          milestone: 'Halfway Point',
          progress: 50,
          remaining: 7500
        });
        break;
      case 'subscription':
        await notificationService.showSubscriptionRenewal({
          name: 'Netflix',
          amount: 15.99,
          renewalDate: '2025-01-15',
          daysUntil: 3
        });
        break;
    }
  };

  const notificationTypes = [
    {
      id: 'dailySummary',
      title: 'Daily Summary',
      description: 'Get a daily overview of your income, expenses, and net position',
      icon: Clock,
      testType: 'daily'
    },
    {
      id: 'weeklyReport',
      title: 'Weekly Report',
      description: 'Receive a comprehensive weekly financial report',
      icon: Bell,
      testType: 'daily'
    },
    {
      id: 'budgetAlerts',
      title: 'Budget Alerts',
      description: 'Notifications when you exceed budget limits',
      icon: AlertCircle,
      testType: 'budget'
    },
    {
      id: 'goalMilestones',
      title: 'Goal Milestones',
      description: 'Celebrate when you reach financial goal milestones',
      icon: Target,
      testType: 'goal'
    },
    {
      id: 'subscriptionRenewals',
      title: 'Subscription Renewals',
      description: 'Reminders before subscription services renew',
      icon: Bell,
      testType: 'subscription'
    },
    {
      id: 'spendingAlerts',
      title: 'Spending Alerts',
      description: 'Alerts for unusual or high spending patterns',
      icon: DollarSign,
      testType: 'budget'
    },
    {
      id: 'savingsOpportunities',
      title: 'Savings Opportunities',
      description: 'Notifications about potential savings opportunities',
      icon: CheckCircle,
      testType: 'budget'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
            <p className="text-gray-600 mt-1">Manage your financial alerts and summaries</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isSupported ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
          }`}>
            {isSupported ? <CheckCircle className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            <span className="font-medium capitalize">
              {isSupported ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Permission Status */}
      {!isSupported && (
        <div className="p-6 border-b border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Notifications Disabled</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  {permissionStatus === 'denied' 
                    ? 'Notification permission has been denied. Please enable it in your browser settings.'
                    : 'Please allow notifications to receive financial alerts and summaries.'
                  }
                </p>
              </div>
            </div>
            {permissionStatus !== 'denied' && (
              <button
                onClick={requestPermission}
                className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Enable Notifications
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notification Types */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-4">
          {notificationTypes.map((type) => {
            const Icon = type.icon;
            const isEnabled = settings[type.id as keyof NotificationSettings];
            
            return (
              <div key={type.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isEnabled ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isEnabled ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{type.title}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => testNotification(type.testType)}
                      disabled={!isSupported || !isEnabled}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) => updateSetting(type.id as keyof NotificationSettings, e.target.checked)}
                        className="sr-only peer"
                        disabled={!isSupported}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test All Notifications */}
      {isSupported && (
        <div className="p-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Test All Notifications</h3>
            <p className="text-sm text-blue-700 mb-3">
              Send test notifications for all enabled types to verify they're working correctly.
            </p>
            <button
              onClick={async () => {
                if (settings.dailySummary) await testNotification('daily');
                if (settings.budgetAlerts) await testNotification('budget');
                if (settings.goalMilestones) await testNotification('goal');
                if (settings.subscriptionRenewals) await testNotification('subscription');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Test Notifications
            </button>
          </div>
        </div>
      )}

      {/* Notification Schedule Info */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Notification Schedule</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Daily Summary: 6:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Weekly Report: Sundays at 7:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Budget Alerts: Real-time when limits are exceeded</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Goal Milestones: When progress milestones are reached</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
