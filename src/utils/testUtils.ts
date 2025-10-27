// Test utilities and helpers
export const testUtils = {
  // Mock data generators
  generateMockTransaction: (overrides = {}) => ({
    id: 'test-transaction-1',
    name: 'Test Transaction',
    amount: -50.00,
    category: 'Food & Groceries',
    date: '2024-12-01',
    type: 'Debit',
    account: 'SECU',
    person: 'Beth',
    business: false,
    subscription: false,
    notes: 'Test transaction',
    ...overrides
  }),

  generateMockGoal: (overrides = {}) => ({
    id: 'test-goal-1',
    title: 'Test Goal',
    description: 'Test goal description',
    targetAmount: 1000,
    currentAmount: 500,
    targetDate: '2025-12-01',
    category: 'emergency',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-01',
    milestones: [],
    ...overrides
  }),

  generateMockSubscription: (overrides = {}) => ({
    id: 'test-subscription-1',
    name: 'Test Subscription',
    amount: 15.99,
    category: 'Entertainment',
    renewalDate: '2025-01-01',
    billingCycle: 'monthly',
    status: 'active',
    lastPayment: '2024-12-01',
    nextPayment: '2025-01-01',
    icon: 'T',
    iconBg: 'bg-blue-500',
    ...overrides
  }),

  // API response mocks
  mockApiResponse: (data: any, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data)
  }),

  // Mock fetch function
  mockFetch: (responses: Record<string, any>) => {
    return jest.fn().mockImplementation((url: string) => {
      const response = responses[url] || responses['*'];
      return Promise.resolve(testUtils.mockApiResponse(response));
    });
  },

  // Wait for async operations
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Mock localStorage
  mockLocalStorage: () => {
    const store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      })
    };
  },

  // Mock notification service
  mockNotificationService: () => ({
    requestPermission: jest.fn().mockResolvedValue('granted'),
    showNotification: jest.fn().mockResolvedValue(undefined),
    showFinancialAlert: jest.fn().mockResolvedValue(undefined),
    showDailySummary: jest.fn().mockResolvedValue(undefined),
    isNotificationEnabled: jest.fn().mockReturnValue(true),
    getPermissionStatus: jest.fn().mockReturnValue('granted')
  }),

  // Test user interactions
  simulateUserInput: (element: HTMLElement, value: string) => {
    const event = new Event('input', { bubbles: true });
    (element as HTMLInputElement).value = value;
    element.dispatchEvent(event);
  },

  simulateClick: (element: HTMLElement) => {
    const event = new Event('click', { bubbles: true });
    element.dispatchEvent(event);
  },

  simulateSubmit: (form: HTMLFormElement) => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
  }
};

// Test data sets
export const testData = {
  transactions: [
    testUtils.generateMockTransaction({ id: 'tx-1', name: 'Grocery Store', amount: -85.50 }),
    testUtils.generateMockTransaction({ id: 'tx-2', name: 'Gas Station', amount: -45.00 }),
    testUtils.generateMockTransaction({ id: 'tx-3', name: 'Salary', amount: 3000.00, type: 'Credit' })
  ],

  goals: [
    testUtils.generateMockGoal({ id: 'goal-1', title: 'Emergency Fund', targetAmount: 10000 }),
    testUtils.generateMockGoal({ id: 'goal-2', title: 'Vacation', targetAmount: 5000 })
  ],

  subscriptions: [
    testUtils.generateMockSubscription({ id: 'sub-1', name: 'Netflix', amount: 15.99 }),
    testUtils.generateMockSubscription({ id: 'sub-2', name: 'Spotify', amount: 9.99 })
  ]
};

// Test assertions
export const testAssertions = {
  expectTransactionToBeValid: (transaction: any) => {
    expect(transaction).toHaveProperty('id');
    expect(transaction).toHaveProperty('name');
    expect(transaction).toHaveProperty('amount');
    expect(transaction).toHaveProperty('category');
    expect(transaction).toHaveProperty('date');
    expect(typeof transaction.amount).toBe('number');
  },

  expectGoalToBeValid: (goal: any) => {
    expect(goal).toHaveProperty('id');
    expect(goal).toHaveProperty('title');
    expect(goal).toHaveProperty('targetAmount');
    expect(goal).toHaveProperty('currentAmount');
    expect(goal).toHaveProperty('targetDate');
    expect(typeof goal.targetAmount).toBe('number');
    expect(typeof goal.currentAmount).toBe('number');
  },

  expectApiResponseToBeValid: (response: any) => {
    expect(response).toHaveProperty('ok');
    expect(response).toHaveProperty('status');
    expect(response).toHaveProperty('json');
  }
};

// Test environment setup
export const setupTestEnvironment = () => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

export default testUtils;
