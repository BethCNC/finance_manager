# Finance Manager API Documentation

## Overview

The Finance Manager API provides comprehensive endpoints for managing financial data, including transactions, budgets, goals, and AI-powered insights. All endpoints are RESTful and return JSON responses.

## Base URL

```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

## Authentication

All API endpoints require authentication via API key or session token.

### Headers

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Endpoints

### 1. Notion API Integration

#### Get Transactions

```http
GET /notion?type=transactions
```

**Response**:
```json
{
  "success": true,
  "transactions": [
    {
      "id": "tx-123",
      "name": "Grocery Store",
      "amount": -50.00,
      "category": "Food & Groceries",
      "date": "2024-12-01",
      "type": "Debit",
      "account": "SECU",
      "person": "Beth",
      "business": false,
      "subscription": false,
      "notes": "Weekly groceries"
    }
  ]
}
```

#### Create Transaction

```http
POST /notion?type=create_transaction
```

**Request Body**:
```json
{
  "description": "Coffee Shop",
  "amount": -5.50,
  "date": "2024-12-01",
  "type": "Debit",
  "category": "Food & Groceries",
  "account": "SECU",
  "person": "Beth",
  "business": false,
  "subscription": false,
  "notes": "Morning coffee"
}
```

**Response**:
```json
{
  "success": true,
  "transaction": {
    "id": "tx-124",
    "description": "Coffee Shop",
    "amount": -5.50,
    "date": "2024-12-01",
    "type": "Debit",
    "category": "Food & Groceries",
    "account": "SECU",
    "person": "Beth",
    "business": false,
    "subscription": false,
    "notes": "Morning coffee"
  }
}
```

#### Update Transaction

```http
PATCH /notion?type=update_transaction
```

**Request Body**:
```json
{
  "id": "tx-124",
  "description": "Coffee Shop - Updated",
  "amount": -6.00,
  "category": "Food & Groceries"
}
```

#### Delete Transaction

```http
DELETE /notion?type=delete_transaction&id=tx-124
```

#### Get Budget Data

```http
GET /notion?type=budget
```

**Response**:
```json
{
  "success": true,
  "budget": {
    "month": "2024-12",
    "categories": {
      "Food & Groceries": {
        "budgeted": 400.00,
        "actual": 350.00,
        "remaining": 50.00
      }
    },
    "totalBudgeted": 3000.00,
    "totalActual": 2800.00,
    "totalRemaining": 200.00
  }
}
```

#### Get Financial Summary

```http
GET /notion?type=summary
```

**Response**:
```json
{
  "success": true,
  "summary": {
    "totalIncome": 5000.00,
    "totalExpenses": 3500.00,
    "profit": 1500.00,
    "transactionCount": 45,
    "topCategories": [
      {
        "category": "Food & Groceries",
        "amount": 800.00,
        "percentage": 22.9
      }
    ]
  }
}
```

### 2. AI Chat API

#### Send Chat Message

```http
POST /ai-chat
```

**Request Body**:
```json
{
  "message": "How can I save more money?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you with your finances today?"
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Based on your spending patterns, I recommend...",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you with your finances today?"
    },
    {
      "role": "user",
      "content": "How can I save more money?"
    },
    {
      "role": "assistant",
      "content": "Based on your spending patterns, I recommend..."
    }
  ],
  "model": "gpt-4o-mini",
  "context": {
    "totalIncome": 5000.00,
    "totalExpenses": 3500.00,
    "profit": 1500.00,
    "transactionCount": 45
  }
}
```

### 3. AI Analysis API

#### Get Spending Analysis

```http
GET /ai-analyze?type=spending
```

**Response**:
```json
{
  "success": true,
  "insight": {
    "type": "spending",
    "analysis": "Your spending analysis shows...",
    "recommendations": [
      "Reduce dining out expenses",
      "Optimize subscription services"
    ],
    "trends": {
      "monthlyAverage": 3500.00,
      "trend": "increasing",
      "change": 5.2
    }
  }
}
```

#### Get Budget Analysis

```http
GET /ai-analyze?type=budget
```

**Response**:
```json
{
  "success": true,
  "insight": {
    "type": "budget",
    "analysis": "{\"budgetHealth\":\"good\",\"overBudgetCategories\":[],\"underBudgetCategories\":[{\"category\":\"Entertainment\",\"budgeted\":200,\"actual\":150,\"variance\":-50,\"percentage\":-25}],\"recommendations\":[{\"category\":\"Food\",\"action\":\"reduce\",\"currentAmount\":500,\"suggestedAmount\":450,\"savings\":50,\"reason\":\"Consistent overspending - consider meal planning\",\"priority\":\"high\"}],\"nextMonthSuggestions\":[\"Increase food budget by $50 based on historical spending\"],\"optimizationOpportunities\":[{\"category\":\"Food\",\"currentSpending\":500,\"optimizedSpending\":400,\"potentialSavings\":100,\"method\":\"Meal planning and cooking at home\",\"effort\":\"medium\",\"impact\":\"high\"}],\"budgetAllocationAdvice\":{\"income\":5000,\"recommendedAllocation\":{\"needs\":50,\"wants\":30,\"savings\":20},\"currentAllocation\":{\"needs\":60,\"wants\":35,\"savings\":5},\"adjustments\":[\"Reduce wants spending by 5% to increase savings\"]}}"
  }
}
```

#### Get Subscription Analysis

```http
GET /ai-analyze?type=subscriptions
```

**Response**:
```json
{
  "success": true,
  "insight": {
    "type": "subscriptions",
    "analysis": "Your subscription analysis shows...",
    "recommendations": [
      {
        "subscription": "Netflix",
        "action": "keep",
        "reason": "Good value for entertainment"
      },
      {
        "subscription": "Unused Service",
        "action": "cancel",
        "reason": "Low usage detected"
      }
    ],
    "totalMonthlyCost": 150.00,
    "potentialSavings": 50.00
  }
}
```

### 4. Plaid Integration API

#### Create Link Token

```http
POST /plaid?action=create_link_token
```

**Response**:
```json
{
  "success": true,
  "link_token": "link-sandbox-1234567890",
  "expiration": "2024-12-01T12:00:00Z"
}
```

#### Exchange Public Token

```http
POST /plaid?action=exchange_public_token
```

**Request Body**:
```json
{
  "public_token": "public-sandbox-1234567890"
}
```

**Response**:
```json
{
  "success": true,
  "access_token": "access-sandbox-1234567890",
  "item_id": "item-1234567890"
}
```

#### Get Accounts

```http
GET /plaid?action=get_accounts
```

**Response**:
```json
{
  "success": true,
  "accounts": [
    {
      "account_id": "acc-123",
      "name": "Checking Account",
      "type": "depository",
      "subtype": "checking",
      "balance": {
        "available": 1500.00,
        "current": 1500.00
      }
    }
  ]
}
```

#### Get Transactions

```http
POST /plaid?action=get_transactions
```

**Request Body**:
```json
{
  "start_date": "2024-11-01",
  "end_date": "2024-11-30",
  "account_filter": "acc-123"
}
```

**Response**:
```json
{
  "success": true,
  "transactions": [
    {
      "transaction_id": "tx-123",
      "account_id": "acc-123",
      "amount": -50.00,
      "date": "2024-11-15",
      "name": "Grocery Store",
      "merchant_name": "Grocery Store",
      "category": ["Food and Drink", "Groceries"]
    }
  ]
}
```

#### Sync to Notion

```http
POST /plaid?action=sync_to_notion
```

**Request Body**:
```json
{
  "start_date": "2024-11-01",
  "end_date": "2024-11-30",
  "account_filter": "acc-123"
}
```

**Response**:
```json
{
  "success": true,
  "created": 25,
  "skipped": 5,
  "errors": 0,
  "errorDetails": [],
  "period": {
    "startDate": "2024-11-01",
    "endDate": "2024-11-30"
  },
  "summary": {
    "total": 30,
    "new": 25,
    "duplicates": 5,
    "failed": 0
  }
}
```

### 5. Reports API

#### Generate Spending Report

```http
POST /reports/spending
```

**Request Body**:
```json
{
  "start_date": "2024-11-01",
  "end_date": "2024-11-30",
  "format": "pdf",
  "categories": ["Food & Groceries", "Transportation"]
}
```

**Response**:
```json
{
  "success": true,
  "report_url": "/reports/spending-report-123.pdf",
  "generated_at": "2024-12-01T10:00:00Z"
}
```

#### Generate Budget Report

```http
POST /reports/budget
```

**Request Body**:
```json
{
  "month": "2024-11",
  "format": "csv"
}
```

#### Generate Category Analysis

```http
POST /reports/category-analysis
```

**Request Body**:
```json
{
  "start_date": "2024-11-01",
  "end_date": "2024-11-30",
  "group_by": "month"
}
```

#### Generate Monthly Comparison

```http
POST /reports/monthly-comparison
```

**Request Body**:
```json
{
  "months": ["2024-10", "2024-11"],
  "format": "pdf"
}
```

#### Generate Subscription Report

```http
POST /reports/subscriptions
```

**Request Body**:
```json
{
  "include_recommendations": true,
  "format": "pdf"
}
```

### 6. Error Reporting API

#### Report Error

```http
POST /error-reporting
```

**Request Body**:
```json
{
  "message": "Error message",
  "stack": "Error stack trace",
  "componentStack": "React component stack",
  "errorBoundary": "ErrorBoundary",
  "timestamp": "2024-12-01T10:00:00Z",
  "userId": "user-123",
  "sessionId": "session-123",
  "url": "https://app.example.com/dashboard",
  "userAgent": "Mozilla/5.0...",
  "severity": "high",
  "category": "system",
  "context": {
    "component": "Dashboard",
    "action": "load"
  }
}
```

**Response**:
```json
{
  "success": true,
  "error_id": "error-123",
  "reported_at": "2024-12-01T10:00:00Z"
}
```

## Data Models

### Transaction

```typescript
interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'Debit' | 'Credit';
  account: string;
  person: 'Beth' | 'Bryan' | 'Joint';
  business: boolean;
  subscription: boolean;
  notes?: string;
}
```

### Budget

```typescript
interface Budget {
  month: string;
  categories: Record<string, {
    budgeted: number;
    actual: number;
    remaining: number;
  }>;
  totalBudgeted: number;
  totalActual: number;
  totalRemaining: number;
}
```

### Goal

```typescript
interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
  status: 'active' | 'completed' | 'paused';
}
```

### Subscription

```typescript
interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually';
  nextRenewalDate: string;
  category: string;
  status: 'active' | 'cancelled' | 'paused';
}
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **General endpoints**: 100 requests per minute
- **AI endpoints**: 20 requests per minute
- **Plaid endpoints**: 10 requests per minute

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Transaction Created

```http
POST /webhooks/transaction-created
```

**Payload**:
```json
{
  "event": "transaction.created",
  "data": {
    "transaction": {
      "id": "tx-123",
      "name": "Grocery Store",
      "amount": -50.00,
      "category": "Food & Groceries",
      "date": "2024-12-01"
    }
  },
  "timestamp": "2024-12-01T10:00:00Z"
}
```

### Budget Exceeded

```http
POST /webhooks/budget-exceeded
```

**Payload**:
```json
{
  "event": "budget.exceeded",
  "data": {
    "category": "Food & Groceries",
    "budgeted": 400.00,
    "actual": 450.00,
    "excess": 50.00
  },
  "timestamp": "2024-12-01T10:00:00Z"
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install finance-manager-api
```

```typescript
import { FinanceManagerAPI } from 'finance-manager-api';

const api = new FinanceManagerAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.example.com'
});

const transactions = await api.transactions.getAll();
const budget = await api.budget.getCurrent();
```

### Python

```bash
pip install finance-manager-api
```

```python
from finance_manager_api import FinanceManagerAPI

api = FinanceManagerAPI(
    api_key='your-api-key',
    base_url='https://api.example.com'
)

transactions = api.transactions.get_all()
budget = api.budget.get_current()
```

## Testing

### Test Environment

Use the sandbox environment for testing:

```
Base URL: https://sandbox-api.example.com
```

### Test Data

Sandbox environment includes:
- Sample transactions
- Mock bank accounts
- Test budgets and goals
- AI responses

### Postman Collection

Import the Postman collection for easy API testing:

```
https://api.example.com/postman-collection.json
```

## Support

For API support:
- **Email**: api-support@example.com
- **Documentation**: https://docs.example.com
- **Status Page**: https://status.example.com
- **GitHub**: https://github.com/example/finance-manager-api
