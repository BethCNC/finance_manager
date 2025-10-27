// Notification Service for Financial Alerts and Summaries
class NotificationService {
  private permission: NotificationPermission = 'default';
  private isSupported: boolean = false;

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.requestPermission();
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return 'denied';
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if (!this.isSupported || this.permission !== 'granted') {
      console.warn('Notifications not available or permission denied');
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/favicon.png',
        badge: '/favicon.png',
        tag: 'finance-manager',
        requireInteraction: false,
        silent: false,
        ...options
      });

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  async showFinancialAlert(type: 'budget' | 'spending' | 'goal' | 'subscription', data: any): Promise<void> {
    const alerts = {
      budget: {
        title: 'Budget Alert',
        body: `You've exceeded your ${data.category} budget by $${data.overage}`,
        icon: '/favicon.png'
      },
      spending: {
        title: 'Spending Alert',
        body: `Unusual spending detected: $${data.amount} at ${data.merchant}`,
        icon: '/favicon.png'
      },
      goal: {
        title: 'Goal Update',
        body: `Great progress! You're ${data.progress}% toward your ${data.goalName} goal`,
        icon: '/favicon.png'
      },
      subscription: {
        title: 'Subscription Alert',
        body: `${data.service} subscription renews in ${data.days} days for $${data.amount}`,
        icon: '/favicon.png'
      }
    };

    const alert = alerts[type];
    if (alert) {
      await this.showNotification(alert.title, {
        body: alert.body,
        icon: alert.icon
      });
    }
  }

  async showDailySummary(summary: {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    topCategory: string;
    goalProgress: number;
  }): Promise<void> {
    const message = `Today: +$${summary.totalIncome} income, -$${summary.totalExpenses} expenses. Net: $${summary.netIncome}. Top spending: ${summary.topCategory}`;
    
    await this.showNotification('Daily Financial Summary', {
      body: message,
      icon: '/favicon.png'
    });
  }

  async showWeeklyReport(report: {
    weekIncome: number;
    weekExpenses: number;
    savingsRate: number;
    budgetAdherence: number;
  }): Promise<void> {
    const message = `Week Summary: $${report.weekIncome} income, $${report.weekExpenses} expenses. Savings rate: ${report.savingsRate}%. Budget adherence: ${report.budgetAdherence}%`;
    
    await this.showNotification('Weekly Financial Report', {
      body: message,
      icon: '/favicon.png'
    });
  }

  async showGoalMilestone(goal: {
    name: string;
    milestone: string;
    progress: number;
    remaining: number;
  }): Promise<void> {
    const message = `🎉 Milestone reached! ${goal.milestone} for ${goal.name}. Progress: ${goal.progress}%. $${goal.remaining} remaining.`;
    
    await this.showNotification('Goal Milestone Achieved!', {
      body: message,
      icon: '/favicon.png'
    });
  }

  async showSubscriptionRenewal(subscription: {
    name: string;
    amount: number;
    renewalDate: string;
    daysUntil: number;
  }): Promise<void> {
    const message = `${subscription.name} renews in ${subscription.daysUntil} days for $${subscription.amount}`;
    
    await this.showNotification('Subscription Renewal Reminder', {
      body: message,
      icon: '/favicon.png'
    });
  }

  async showBudgetWarning(category: string, spent: number, budget: number, percentage: number): Promise<void> {
    const message = `${category} budget: $${spent} of $${budget} (${percentage}%). ${percentage > 90 ? 'Consider reducing spending.' : 'On track.'}`;
    
    await this.showNotification('Budget Update', {
      body: message,
      icon: '/favicon.png'
    });
  }

  async showSavingsOpportunity(opportunity: {
    type: string;
    amount: number;
    description: string;
  }): Promise<void> {
    const message = `💰 Savings opportunity: ${opportunity.description}. Potential savings: $${opportunity.amount}`;
    
    await this.showNotification('Savings Opportunity', {
      body: message,
      icon: '/favicon.png'
    });
  }

  // Schedule notifications
  scheduleDailySummary(): void {
    // Schedule daily summary at 6 PM
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(18, 0, 0, 0); // 6 PM
    
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const timeUntil = scheduledTime.getTime() - now.getTime();
    
    setTimeout(() => {
      this.showDailySummary({
        totalIncome: 0,
        totalExpenses: 0,
        netIncome: 0,
        topCategory: 'Food',
        goalProgress: 0
      });
      
      // Schedule next day
      this.scheduleDailySummary();
    }, timeUntil);
  }

  scheduleWeeklyReport(): void {
    // Schedule weekly report on Sundays at 7 PM
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setDate(now.getDate() + (7 - now.getDay())); // Next Sunday
    scheduledTime.setHours(19, 0, 0, 0); // 7 PM
    
    const timeUntil = scheduledTime.getTime() - now.getTime();
    
    setTimeout(() => {
      this.showWeeklyReport({
        weekIncome: 0,
        weekExpenses: 0,
        savingsRate: 0,
        budgetAdherence: 0
      });
      
      // Schedule next week
      this.scheduleWeeklyReport();
    }, timeUntil);
  }

  // Initialize scheduled notifications
  initializeScheduledNotifications(): void {
    if (this.permission === 'granted') {
      this.scheduleDailySummary();
      this.scheduleWeeklyReport();
    }
  }

  // Check if notifications are supported and enabled
  isNotificationEnabled(): boolean {
    return this.isSupported && this.permission === 'granted';
  }

  // Get current permission status
  getPermissionStatus(): NotificationPermission {
    return this.permission;
  }
}

// Create singleton instance
export const notificationService = new NotificationService();

// Export types
export interface FinancialAlert {
  type: 'budget' | 'spending' | 'goal' | 'subscription';
  data: any;
}

export interface DailySummary {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  topCategory: string;
  goalProgress: number;
}

export interface WeeklyReport {
  weekIncome: number;
  weekExpenses: number;
  savingsRate: number;
  budgetAdherence: number;
}

export interface GoalMilestone {
  name: string;
  milestone: string;
  progress: number;
  remaining: number;
}

export interface SubscriptionRenewal {
  name: string;
  amount: number;
  renewalDate: string;
  daysUntil: number;
}

export interface BudgetWarning {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

export interface SavingsOpportunity {
  type: string;
  amount: number;
  description: string;
}
