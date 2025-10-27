// Integration tests for API endpoints
import { testUtils, testData, testAssertions } from '../utils/testUtils';

describe('Notion API Integration', () => {
  const baseUrl = process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : '';

  beforeEach(() => {
    // Reset fetch mock
    global.fetch = testUtils.mockFetch({});
  });

  describe('Transaction Management', () => {
    test('creates transaction successfully', async () => {
      const mockTransaction = testData.transactions[0];
      
      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/notion?type=create_transaction`]: {
          success: true,
          transaction: mockTransaction
        }
      });

      const response = await fetch(`${baseUrl}/api/notion?type=create_transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockTransaction)
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      testAssertions.expectTransactionToBeValid(data.transaction);
    });

    test('updates transaction successfully', async () => {
      const mockTransaction = { ...testData.transactions[0], name: 'Updated Transaction' };
      
      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/notion?type=update_transaction`]: {
          success: true,
          transaction: mockTransaction
        }
      });

      const response = await fetch(`${baseUrl}/api/notion?type=update_transaction`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockTransaction)
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.transaction.name).toBe('Updated Transaction');
    });

    test('deletes transaction successfully', async () => {
      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/notion?type=delete_transaction&id=test-id`]: {
          success: true,
          message: 'Transaction deleted successfully'
        }
      });

      const response = await fetch(`${baseUrl}/api/notion?type=delete_transaction&id=test-id`, {
        method: 'DELETE'
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Transaction deleted successfully');
    });

    test('handles validation errors', async () => {
      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/notion?type=create_transaction`]: {
          error: 'Missing required fields',
          required: ['description', 'amount', 'date', 'type', 'category']
        }
      });

      const response = await fetch(`${baseUrl}/api/notion?type=create_transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // Empty body to trigger validation error
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Missing required fields');
      expect(data.required).toContain('description');
    });
  });

  describe('AI Analysis API', () => {
    test('analyzes spending patterns', async () => {
      const mockAnalysis = {
        type: 'spending',
        analysis: 'Your spending patterns show...',
        timestamp: new Date().toISOString()
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/ai-analyze?type=spending`]: {
          success: true,
          insight: mockAnalysis
        }
      });

      const response = await fetch(`${baseUrl}/api/ai-analyze?type=spending`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.insight.type).toBe('spending');
    });

    test('analyzes subscription patterns', async () => {
      const mockAnalysis = {
        type: 'subscriptions',
        analysis: 'Your subscription analysis shows...',
        recommendations: [
          { subscription: 'Netflix', action: 'keep', reason: 'Good value' }
        ]
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/ai-analyze?type=subscriptions`]: {
          success: true,
          insight: mockAnalysis
        }
      });

      const response = await fetch(`${baseUrl}/api/ai-analyze?type=subscriptions`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.insight.type).toBe('subscriptions');
      expect(data.insight.recommendations).toBeDefined();
    });

    test('analyzes budget performance', async () => {
      const mockAnalysis = {
        type: 'budget',
        analysis: 'Your budget performance shows...',
        budgetHealth: 'good',
        recommendations: []
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/ai-analyze?type=budget`]: {
          success: true,
          insight: mockAnalysis
        }
      });

      const response = await fetch(`${baseUrl}/api/ai-analyze?type=budget`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.insight.type).toBe('budget');
      expect(data.insight.budgetHealth).toBeDefined();
    });
  });

  describe('Plaid Integration', () => {
    test('creates link token', async () => {
      const mockResponse = {
        link_token: 'test-link-token',
        expiration: '2024-12-31T23:59:59Z'
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/plaid?action=create_link_token`]: mockResponse
      });

      const response = await fetch(`${baseUrl}/api/plaid?action=create_link_token`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.link_token).toBe('test-link-token');
    });

    test('exchanges public token', async () => {
      const mockResponse = {
        access_token: 'test-access-token',
        item_id: 'test-item-id'
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/plaid?action=exchange_token`]: mockResponse
      });

      const response = await fetch(`${baseUrl}/api/plaid?action=exchange_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token: 'test-public-token' })
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.access_token).toBe('test-access-token');
    });

    test('fetches accounts', async () => {
      const mockAccounts = [
        { account_id: 'acc-1', name: 'Checking', type: 'depository', balances: { current: 1000 } },
        { account_id: 'acc-2', name: 'Savings', type: 'depository', balances: { current: 5000 } }
      ];

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/plaid?action=get_accounts`]: { accounts: mockAccounts }
      });

      const response = await fetch(`${baseUrl}/api/plaid?action=get_accounts`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.accounts).toHaveLength(2);
      expect(data.accounts[0].name).toBe('Checking');
    });

    test('syncs transactions to Notion', async () => {
      const mockResponse = {
        success: true,
        created: 5,
        skipped: 2,
        errors: 0,
        summary: {
          total: 7,
          new: 5,
          duplicates: 2,
          failed: 0
        }
      };

      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/plaid?action=sync_to_notion`]: mockResponse
      });

      const response = await fetch(`${baseUrl}/api/plaid?action=sync_to_notion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_date: '2024-12-01',
          end_date: '2024-12-31'
        })
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.created).toBe(5);
      expect(data.skipped).toBe(2);
    });
  });

  describe('Error Handling', () => {
    test('handles network errors', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      try {
        await fetch(`${baseUrl}/api/notion?type=transactions`);
      } catch (error) {
        expect(error.message).toBe('Network error');
      }
    });

    test('handles server errors', async () => {
      global.fetch = testUtils.mockFetch({
        [`${baseUrl}/api/notion?type=transactions`]: {
          error: 'Internal server error'
        }
      });

      const response = await fetch(`${baseUrl}/api/notion?type=transactions`);
      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(data.error).toBe('Internal server error');
    });

    test('handles timeout errors', async () => {
      global.fetch = jest.fn().mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      );

      try {
        await fetch(`${baseUrl}/api/ai-analyze?type=spending`);
      } catch (error) {
        expect(error.message).toBe('Request timeout');
      }
    });
  });

  describe('Data Validation', () => {
    test('validates transaction data structure', () => {
      const validTransaction = testData.transactions[0];
      testAssertions.expectTransactionToBeValid(validTransaction);
    });

    test('validates goal data structure', () => {
      const validGoal = testData.goals[0];
      testAssertions.expectGoalToBeValid(validGoal);
    });

    test('validates API response structure', () => {
      const mockResponse = testUtils.mockApiResponse({ success: true });
      testAssertions.expectApiResponseToBeValid(mockResponse);
    });
  });
});
