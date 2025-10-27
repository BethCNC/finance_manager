// Global setup for Jest tests
export default async function globalSetup() {
  // Set up test database or mock services
  console.log('Setting up global test environment...');
  
  // Mock external services
  global.mockServices = {
    notion: {
      databases: {
        query: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      },
      pages: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    },
    openai: {
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    },
    plaid: {
      linkTokenCreate: jest.fn(),
      itemPublicTokenExchange: jest.fn(),
      accountsGet: jest.fn(),
      transactionsGet: jest.fn()
    }
  };
  
  console.log('Global test environment setup complete');
}
