# Testing Guide

## Overview

This guide covers the comprehensive testing strategy for the Finance Manager application, including unit tests, integration tests, and end-to-end tests.

## Test Structure

```
src/__tests__/
├── unit/                    # Unit tests for individual components
│   ├── components/          # Component unit tests
│   ├── hooks/              # Custom hook tests
│   ├── services/           # Service layer tests
│   └── utils/              # Utility function tests
├── integration/            # Integration tests
│   ├── api/                # API endpoint tests
│   ├── data-flow/          # Data flow tests
│   └── user-flows/         # User interaction tests
├── e2e/                    # End-to-end tests
│   ├── user-journeys/      # Complete user journeys
│   └── critical-flows/     # Critical business flows
├── setup.ts                # Test environment setup
├── globalSetup.ts          # Global test setup
├── globalTeardown.ts       # Global test teardown
└── testUtils.ts            # Shared test utilities
```

## Running Tests

### All Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npm run test:ci           # Run tests for CI/CD
```

### Specific Test Types
```bash
npm run test:unit          # Run only unit tests
npm run test:integration   # Run only integration tests
npm run test:e2e          # Run only E2E tests
```

## Test Categories

### 1. Unit Tests

**Purpose**: Test individual components, functions, and hooks in isolation.

**Coverage**:
- Component rendering and props
- User interactions (clicks, form inputs)
- State management
- Custom hooks
- Utility functions
- Service functions

**Example**:
```typescript
// src/__tests__/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Integration Tests

**Purpose**: Test how different parts of the application work together.

**Coverage**:
- API endpoints
- Data flow between components
- User workflows
- Service integrations
- State synchronization

**Example**:
```typescript
// src/__tests__/integration/api/notion.test.ts
import { notionAPI } from '@/services/notionAPI';

describe('Notion API Integration', () => {
  test('fetches transactions successfully', async () => {
    const mockResponse = { transactions: [] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await notionAPI.getTransactions();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/notion?type=transactions');
  });
});
```

### 3. End-to-End Tests

**Purpose**: Test complete user journeys and critical business flows.

**Coverage**:
- Complete user workflows
- Cross-feature interactions
- Critical business processes
- Error scenarios
- Performance under load

**Example**:
```typescript
// src/__tests__/e2e/user-journeys/transaction-flow.test.ts
describe('Transaction Management Flow', () => {
  test('complete transaction creation flow', async () => {
    // Navigate to transactions page
    // Click add transaction button
    // Fill transaction form
    // Submit transaction
    // Verify transaction appears in list
    // Verify transaction details are correct
  });
});
```

## Test Utilities

### Mock Data
```typescript
// src/__tests__/testUtils.ts
export const mockTransactions = [
  {
    id: 'tx-1',
    name: 'Grocery Store',
    amount: -50.00,
    category: 'Food & Groceries',
    date: '2024-12-01',
    type: 'Debit'
  }
];

export const mockGoals = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    target: 10000,
    current: 5000,
    status: 'active'
  }
];
```

### Mock Functions
```typescript
export const mockFetch = (responses: Record<string, any>) => {
  return jest.fn().mockImplementation((url: string) => {
    const response = responses[url] || { error: 'Not found' };
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response)
    });
  });
};
```

## Testing Best Practices

### 1. Test Structure
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests focused and atomic
- Test one thing at a time

### 2. Mocking
- Mock external dependencies
- Use realistic mock data
- Avoid over-mocking
- Test error scenarios

### 3. Coverage
- Aim for 80%+ code coverage
- Focus on critical business logic
- Test edge cases and error conditions
- Include accessibility tests

### 4. Performance
- Keep tests fast (< 100ms per test)
- Use parallel execution
- Avoid unnecessary setup/teardown
- Mock expensive operations

## Critical Test Scenarios

### 1. Financial Data Integrity
- Transaction creation/editing/deletion
- Budget calculations
- Goal progress tracking
- Data synchronization

### 2. User Authentication & Security
- API key validation
- Data access controls
- Input validation
- Error handling

### 3. AI Features
- Chat functionality
- Financial analysis
- Recommendation generation
- Context preservation

### 4. Mobile Experience
- Touch interactions
- Responsive design
- PWA functionality
- Offline capabilities

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
```

### Coverage Requirements
- Minimum 80% line coverage
- Minimum 80% branch coverage
- 100% coverage for critical functions
- No decrease in coverage allowed

## Debugging Tests

### Common Issues
1. **Async operations**: Use `await` and proper async/await patterns
2. **Mock cleanup**: Clear mocks between tests
3. **State isolation**: Reset state between tests
4. **Timing issues**: Use proper wait conditions

### Debug Commands
```bash
# Run specific test file
npm test -- Button.test.tsx

# Run tests with verbose output
npm test -- --verbose

# Run tests matching pattern
npm test -- --testNamePattern="Button"

# Debug mode
npm test -- --detectOpenHandles
```

## Test Data Management

### Fixtures
- Use consistent test data
- Create reusable fixtures
- Keep data realistic
- Update fixtures when schemas change

### Database Testing
- Use test database
- Clean data between tests
- Use transactions for rollback
- Mock external services

## Performance Testing

### Load Testing
- Test with large datasets
- Simulate concurrent users
- Measure response times
- Test memory usage

### Bundle Size Testing
- Monitor bundle size
- Test code splitting
- Measure loading times
- Optimize dependencies

## Accessibility Testing

### Automated Testing
- Use jest-axe for accessibility tests
- Test keyboard navigation
- Verify ARIA attributes
- Check color contrast

### Manual Testing
- Screen reader testing
- Keyboard-only navigation
- High contrast mode
- Zoom functionality

## Conclusion

This comprehensive testing strategy ensures the Finance Manager application is reliable, maintainable, and provides a great user experience. Regular testing helps catch issues early and maintain code quality as the application grows.