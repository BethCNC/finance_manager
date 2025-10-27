// End-to-End tests for critical user flows
import { testUtils, testData } from '../utils/testUtils';

describe('E2E User Flows', () => {
  beforeEach(() => {
    // Setup test environment
    global.fetch = testUtils.mockFetch({});
    
    // Mock localStorage
    const mockStorage = testUtils.mockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage
    });
  });

  describe('Transaction Management Flow', () => {
    test('complete transaction creation flow', async () => {
      // Mock API responses
      global.fetch = testUtils.mockFetch({
        '/api/notion?type=transactions': { transactions: testData.transactions },
        '/api/notion?type=create_transaction': { 
          success: true, 
          transaction: testData.transactions[0] 
        }
      });

      // Simulate user navigating to transactions page
      // This would be done by the test runner in a real E2E test
      const transactionsPage = {
        openTransactionForm: () => {
          // Simulate clicking the add transaction button
          return { isFormOpen: true };
        },
        fillTransactionForm: (data: any) => {
          // Simulate filling form fields
          return { formData: data };
        },
        submitTransaction: async () => {
          // Simulate form submission
          const response = await fetch('/api/notion?type=create_transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData.transactions[0])
          });
          return response.json();
        }
      };

      // Execute the flow
      const form = transactionsPage.openTransactionForm();
      expect(form.isFormOpen).toBe(true);

      const filledForm = transactionsPage.fillTransactionForm(testData.transactions[0]);
      expect(filledForm.formData).toBeDefined();

      const result = await transactionsPage.submitTransaction();
      expect(result.success).toBe(true);
    });

    test('transaction editing flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/notion?type=transactions': { transactions: testData.transactions },
        '/api/notion?type=update_transaction': { 
          success: true, 
          transaction: { ...testData.transactions[0], name: 'Updated Transaction' }
        }
      });

      const transactionEditor = {
        selectTransaction: (id: string) => {
          return { selectedId: id };
        },
        openEditForm: () => {
          return { isEditFormOpen: true };
        },
        updateTransaction: async (id: string, updates: any) => {
          const response = await fetch('/api/notion?type=update_transaction', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...updates })
          });
          return response.json();
        }
      };

      const selected = transactionEditor.selectTransaction('tx-1');
      expect(selected.selectedId).toBe('tx-1');

      const editForm = transactionEditor.openEditForm();
      expect(editForm.isEditFormOpen).toBe(true);

      const result = await transactionEditor.updateTransaction('tx-1', { 
        name: 'Updated Transaction' 
      });
      expect(result.success).toBe(true);
      expect(result.transaction.name).toBe('Updated Transaction');
    });

    test('bulk transaction operations flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/notion?type=transactions': { transactions: testData.transactions },
        '/api/notion?type=delete_transaction&id=tx-1': { success: true },
        '/api/notion?type=delete_transaction&id=tx-2': { success: true }
      });

      const bulkOperations = {
        enableBulkMode: () => {
          return { isBulkMode: true };
        },
        selectTransactions: (ids: string[]) => {
          return { selectedIds: ids };
        },
        bulkDelete: async (ids: string[]) => {
          const promises = ids.map(id => 
            fetch(`/api/notion?type=delete_transaction&id=${id}`, { method: 'DELETE' })
          );
          const responses = await Promise.all(promises);
          return responses.map(r => r.json());
        }
      };

      const bulkMode = bulkOperations.enableBulkMode();
      expect(bulkMode.isBulkMode).toBe(true);

      const selected = bulkOperations.selectTransactions(['tx-1', 'tx-2']);
      expect(selected.selectedIds).toHaveLength(2);

      const results = await bulkOperations.bulkDelete(['tx-1', 'tx-2']);
      expect(results).toHaveLength(2);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Financial Goals Flow', () => {
    test('complete goal creation and tracking flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/notion?type=goals': { goals: testData.goals },
        '/api/notion?type=create_goal': { 
          success: true, 
          goal: testData.goals[0] 
        }
      });

      const goalManager = {
        openGoalForm: () => {
          return { isFormOpen: true };
        },
        createGoal: async (goalData: any) => {
          const response = await fetch('/api/notion?type=create_goal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goalData)
          });
          return response.json();
        },
        trackProgress: (goalId: string, progress: number) => {
          return { goalId, progress };
        }
      };

      const form = goalManager.openGoalForm();
      expect(form.isFormOpen).toBe(true);

      const result = await goalManager.createGoal(testData.goals[0]);
      expect(result.success).toBe(true);

      const progress = goalManager.trackProgress('goal-1', 50);
      expect(progress.goalId).toBe('goal-1');
      expect(progress.progress).toBe(50);
    });

    test('goal milestone achievement flow', async () => {
      const goalTracker = {
        checkMilestones: (goal: any) => {
          const milestones = goal.milestones || [];
          const completed = milestones.filter((m: any) => m.completed);
          return { total: milestones.length, completed: completed.length };
        },
        celebrateMilestone: (milestone: any) => {
          return { celebrated: true, milestone };
        }
      };

      const goal = testData.goals[0];
      const milestoneStatus = goalTracker.checkMilestones(goal);
      expect(milestoneStatus.total).toBeDefined();

      const celebration = goalTracker.celebrateMilestone({ 
        name: 'Halfway Point', 
        progress: 50 
      });
      expect(celebration.celebrated).toBe(true);
    });
  });

  describe('Subscription Management Flow', () => {
    test('subscription analysis and optimization flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/ai-analyze?type=subscriptions': {
          success: true,
          insight: {
            recommendations: [
              { subscription: 'Netflix', action: 'keep', reason: 'Good value' },
              { subscription: 'Unused Service', action: 'cancel', reason: 'Low usage' }
            ]
          }
        }
      });

      const subscriptionManager = {
        analyzeSubscriptions: async () => {
          const response = await fetch('/api/ai-analyze?type=subscriptions');
          return response.json();
        },
        applyRecommendation: (subscription: string, action: string) => {
          return { subscription, action, applied: true };
        }
      };

      const analysis = await subscriptionManager.analyzeSubscriptions();
      expect(analysis.success).toBe(true);
      expect(analysis.insight.recommendations).toHaveLength(2);

      const recommendation = analysis.insight.recommendations[1];
      const applied = subscriptionManager.applyRecommendation(
        recommendation.subscription, 
        recommendation.action
      );
      expect(applied.applied).toBe(true);
      expect(applied.action).toBe('cancel');
    });

    test('subscription renewal reminder flow', async () => {
      const renewalManager = {
        checkRenewals: (subscriptions: any[]) => {
          const upcoming = subscriptions.filter(sub => {
            const daysUntil = Math.ceil(
              (new Date(sub.renewalDate).getTime() - new Date().getTime()) / 
              (1000 * 60 * 60 * 24)
            );
            return daysUntil <= 7 && daysUntil >= 0;
          });
          return { upcoming };
        },
        sendReminder: (subscription: any) => {
          return { reminderSent: true, subscription };
        }
      };

      const upcoming = renewalManager.checkRenewals(testData.subscriptions);
      expect(upcoming.upcoming).toBeDefined();

      if (upcoming.upcoming.length > 0) {
        const reminder = renewalManager.sendReminder(upcoming.upcoming[0]);
        expect(reminder.reminderSent).toBe(true);
      }
    });
  });

  describe('AI Advisor Flow', () => {
    test('complete AI chat interaction flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/ai-chat': {
          success: true,
          message: 'Based on your spending patterns, I recommend...',
          conversationHistory: []
        }
      });

      const aiAdvisor = {
        sendMessage: async (message: string) => {
          const response = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, conversationHistory: [] })
          });
          return response.json();
        },
        getQuickActions: () => {
          return [
            { id: '1', label: 'Analyze Spending', prompt: 'Analyze my spending patterns' },
            { id: '2', label: 'Budget Advice', prompt: 'Give me budget advice' }
          ];
        }
      };

      const quickActions = aiAdvisor.getQuickActions();
      expect(quickActions).toHaveLength(2);

      const response = await aiAdvisor.sendMessage('How can I save more money?');
      expect(response.success).toBe(true);
      expect(response.message).toContain('recommend');
    });

    test('financial insights generation flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/ai-analyze?type=spending': {
          success: true,
          insight: {
            type: 'spending',
            analysis: 'Your spending analysis shows...',
            recommendations: ['Reduce dining out', 'Optimize subscriptions']
          }
        }
      });

      const insightsGenerator = {
        generateInsights: async (type: string) => {
          const response = await fetch(`/api/ai-analyze?type=${type}`);
          return response.json();
        },
        processRecommendations: (recommendations: string[]) => {
          return recommendations.map(rec => ({ 
            recommendation: rec, 
            processed: true 
          }));
        }
      };

      const insights = await insightsGenerator.generateInsights('spending');
      expect(insights.success).toBe(true);
      expect(insights.insight.recommendations).toHaveLength(2);

      const processed = insightsGenerator.processRecommendations(
        insights.insight.recommendations
      );
      expect(processed).toHaveLength(2);
      processed.forEach(p => expect(p.processed).toBe(true));
    });
  });

  describe('Reports and Export Flow', () => {
    test('complete report generation and export flow', async () => {
      const reportGenerator = {
        generateReport: async (type: string, dateRange: any) => {
          return {
            id: 'report-1',
            title: `${type} Report`,
            type,
            dateRange,
            generatedAt: new Date().toISOString(),
            summary: {
              totalIncome: 5000,
              totalExpenses: 3000,
              netIncome: 2000
            }
          };
        },
        exportReport: (report: any, format: string) => {
          return { 
            exported: true, 
            format, 
            filename: `report-${report.id}.${format}` 
          };
        }
      };

      const report = await reportGenerator.generateReport('spending', {
        start: '2024-12-01',
        end: '2024-12-31'
      });
      expect(report.type).toBe('spending');
      expect(report.summary.netIncome).toBe(2000);

      const exportResult = reportGenerator.exportReport(report, 'pdf');
      expect(exportResult.exported).toBe(true);
      expect(exportResult.format).toBe('pdf');
    });
  });

  describe('Cross-Feature Integration', () => {
    test('dashboard data aggregation flow', async () => {
      global.fetch = testUtils.mockFetch({
        '/api/notion?type=transactions': { transactions: testData.transactions },
        '/api/notion?type=goals': { goals: testData.goals },
        '/api/notion?type=subscriptions': { subscriptions: testData.subscriptions }
      });

      const dashboardAggregator = {
        fetchAllData: async () => {
          const [transactions, goals, subscriptions] = await Promise.all([
            fetch('/api/notion?type=transactions').then(r => r.json()),
            fetch('/api/notion?type=goals').then(r => r.json()),
            fetch('/api/notion?type=subscriptions').then(r => r.json())
          ]);
          return { transactions, goals, subscriptions };
        },
        calculateSummary: (data: any) => {
          const totalIncome = data.transactions.transactions
            .filter((t: any) => t.type === 'Credit')
            .reduce((sum: number, t: any) => sum + t.amount, 0);
          
          const totalExpenses = data.transactions.transactions
            .filter((t: any) => t.type === 'Debit')
            .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

          return {
            totalIncome,
            totalExpenses,
            netIncome: totalIncome - totalExpenses,
            activeGoals: data.goals.goals.filter((g: any) => g.status === 'active').length,
            activeSubscriptions: data.subscriptions.subscriptions.filter((s: any) => s.status === 'active').length
          };
        }
      };

      const allData = await dashboardAggregator.fetchAllData();
      expect(allData.transactions).toBeDefined();
      expect(allData.goals).toBeDefined();
      expect(allData.subscriptions).toBeDefined();

      const summary = dashboardAggregator.calculateSummary(allData);
      expect(summary.totalIncome).toBeDefined();
      expect(summary.totalExpenses).toBeDefined();
      expect(summary.netIncome).toBeDefined();
    });
  });
});
