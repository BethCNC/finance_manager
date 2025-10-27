import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testUtils, testData, testAssertions, setupTestEnvironment } from '../utils/testUtils';
import TransactionForm from '../components/TransactionForm';
import FinancialGoals from '../components/FinancialGoals';
import SubscriptionManager from '../components/SubscriptionManager';

// Setup test environment
setupTestEnvironment();

// Mock fetch globally
global.fetch = testUtils.mockFetch({
  '/api/notion?type=create_transaction': { success: true, transaction: testData.transactions[0] },
  '/api/notion?type=update_transaction': { success: true, transaction: testData.transactions[0] },
  '/api/ai-analyze?type=subscriptions': { success: true, insight: { recommendations: [] } }
});

describe('TransactionForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders transaction form with all required fields', () => {
    render(
      <TransactionForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  test('validates required fields on submit', async () => {
    render(
      <TransactionForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const submitButton = screen.getByRole('button', { name: /add transaction/i });
    fireEvent.click(submitButton);

    // Form should not submit without required fields
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    render(
      <TransactionForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Transaction' }
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '50.00' }
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-12-01' }
    });

    const submitButton = screen.getByRole('button', { name: /add transaction/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test('closes form when close button is clicked', () => {
    render(
      <TransactionForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});

describe('FinancialGoals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders goals component with overview tab', () => {
    render(<FinancialGoals />);

    expect(screen.getByText(/financial goals/i)).toBeInTheDocument();
    expect(screen.getByText(/track your progress/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
  });

  test('switches between tabs correctly', () => {
    render(<FinancialGoals />);

    const goalsTab = screen.getByText(/goals/i);
    fireEvent.click(goalsTab);

    expect(screen.getByText(/all goals/i)).toBeInTheDocument();
  });

  test('displays goal progress correctly', () => {
    render(<FinancialGoals />);

    // Should show progress information
    expect(screen.getByText(/total goals/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/on track/i)).toBeInTheDocument();
  });
});

describe('SubscriptionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders subscription manager with overview tab', () => {
    render(<SubscriptionManager />);

    expect(screen.getByText(/subscription manager/i)).toBeInTheDocument();
    expect(screen.getByText(/ai-powered subscription optimization/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
  });

  test('switches between tabs correctly', () => {
    render(<SubscriptionManager />);

    const renewalsTab = screen.getByText(/renewals/i);
    fireEvent.click(renewalsTab);

    expect(screen.getByText(/upcoming renewals/i)).toBeInTheDocument();
  });

  test('displays subscription summary correctly', () => {
    render(<SubscriptionManager />);

    // Should show summary cards
    expect(screen.getByText(/monthly cost/i)).toBeInTheDocument();
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/savings/i)).toBeInTheDocument();
  });
});

describe('API Integration Tests', () => {
  test('transaction creation API call', async () => {
    const mockTransaction = testData.transactions[0];
    
    const response = await fetch('/api/notion?type=create_transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockTransaction)
    });

    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    testAssertions.expectTransactionToBeValid(data.transaction);
  });

  test('subscription analysis API call', async () => {
    const response = await fetch('/api/ai-analyze?type=subscriptions');
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.insight).toBeDefined();
  });
});

describe('Error Handling', () => {
  test('handles API errors gracefully', async () => {
    // Mock fetch to return error
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal server error' })
    });

    render(
      <TransactionForm
        isOpen={true}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
      />
    );

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Transaction' }
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '50.00' }
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-12-01' }
    });

    const submitButton = screen.getByRole('button', { name: /add transaction/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe('Accessibility Tests', () => {
  test('transaction form has proper labels', () => {
    render(
      <TransactionForm
        isOpen={true}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  test('goals component has proper headings', () => {
    render(<FinancialGoals />);

    expect(screen.getByRole('heading', { name: /financial goals/i })).toBeInTheDocument();
  });

  test('subscription manager has proper headings', () => {
    render(<SubscriptionManager />);

    expect(screen.getByRole('heading', { name: /subscription manager/i })).toBeInTheDocument();
  });
});
