# Transactions Database Integration

## Current Status: ✅ FULLY CONFIGURED

Your Finance Manager app is already successfully integrated with your Notion Transactions database!

## Database Details

**Database ID:** `82fc50e5b6b343a5a2ad1904f47404c0`
**Data Source URL:** `collection://8865faa0-d731-4e77-a09c-ca06393b8a05`
**Notion URL:** https://www.notion.so/82fc50e5b6b343a5a2ad1904f47404c0

## Database Schema

Your Transactions database has the following properties:

### Core Fields
- **Description** (title) - Transaction description/name
- **Amount** (number) - Transaction amount in dollars
- **Date** (date) - Transaction date
- **Type** (select) - "Debit", "Credit", or "Transfer"
- **Category** (select) - 22 categories available

### Classification Fields
- **Account** (select) - Source account (SECU 2791, SECU 8182, Apple Cash, Cash App, SECU Beth)
- **Who** (select) - Beth or Bryan
- **Business** (checkbox) - Business-related flag
- **Subscription** (checkbox) - Recurring subscription flag
- **Recurring Bill** (checkbox) - Recurring bill flag
- **Reviewed** (checkbox) - Finalized/triaged flag

### Additional Fields
- **Normalized Merchant** (text) - Cleaned merchant name
- **Notes** (text) - Additional notes
- **Source Doc** (select) - Original data source (Apple Cash PDF, Cash App PDF, SECU Statement, CSV Import)

## Available Categories

The app supports these 22 categories:
1. Food
2. Health
3. Home
4. Personal
5. Business
6. George
7. Monthly Bills
8. Transport
9. Transfers
10. Income
11. Entertainment
12. Software
13. Transfer Fee
14. Fees
15. Shops
16. Transfer
17. Interest
18. Service
19. Travel
20. Bank Fees
21. Uncategorized
22. Healthcare

## API Endpoints (Already Working)

### 1. Get Transactions
```
GET /api/notion?type=transactions
```
Returns up to 50 most recent transactions sorted by date (descending).

**Response:**
```json
{
  "transactions": [
    {
      "id": "page-id",
      "name": "Transaction description or merchant",
      "amount": 100.00,
      "date": "2025-10-08",
      "type": "income" | "expense",
      "category": "Food",
      "account": "SECU Beth",
      "person": "Beth",
      "business": false,
      "subscription": false
    }
  ]
}
```

### 2. Get Summary
```
GET /api/notion?type=summary
```
Calculates totals from all transactions in the database.

**Response:**
```json
{
  "totalIncome": 5000.00,
  "totalExpenses": 3500.00,
  "profit": 1500.00
}
```

### 3. Get Budget Data
```
GET /api/notion?type=budget&year=2025&month=10
```
Returns budget plan vs actual spending for the specified month.

### 4. Debug Endpoint
```
GET /api/notion?type=debug
```
Returns database structure and sample pages (useful for troubleshooting).

## Data Mapping

The API automatically maps Notion properties to your app's data structure:

| Notion Property | App Field | Notes |
|----------------|-----------|-------|
| Description (title) | name | Falls back to Normalized Merchant if empty |
| Amount | amount | Kept as-is (positive/negative) |
| Date | date | ISO 8601 format |
| Type (Credit/Debit) | type | Credit → "income", Debit → "expense" |
| Category | category | Direct mapping |
| Account | account | Direct mapping |
| Who | person | Direct mapping |
| Business | business | Boolean checkbox |
| Subscription | subscription | Boolean checkbox |

## Current Implementation

### API Layer (`api/notion.js:26-59`)
✅ Queries the Transactions database
✅ Sorts by Date descending
✅ Returns 50 most recent transactions
✅ Maps all relevant properties
✅ Handles Credit/Debit type conversion

### Hook Layer (`src/hooks/useFinanceData.ts`)
✅ Fetches transactions from API
✅ Fetches summary data
✅ Auto-refreshes every 30 seconds
✅ TypeScript interfaces defined
✅ Error handling implemented

### UI Layer (`src/components/FinancialDashboard.tsx`)
✅ Displays transaction list
✅ Shows summary metrics
✅ Filter by income/expense type
✅ Category-based organization

## What's Working

1. **Real-time data sync** - Your dashboard pulls data from the Transactions database every 30 seconds
2. **Type classification** - Credit transactions show as income, Debit as expenses
3. **Category display** - All 22 categories are supported
4. **Account tracking** - Shows which account each transaction came from
5. **Person attribution** - Tracks whether Beth or Bryan made the transaction
6. **Special flags** - Business and Subscription checkboxes are captured

## Environment Setup

Make sure your `.env.local` has:
```
NOTION_API_KEY=secret_your_notion_integration_token
Transactions_database_id=82fc50e5b6b343a5a2ad1904f47404c0
Budget_database_id=b94cf29beba14106bfd343d708b9e281
```

The database IDs are already hardcoded as fallbacks in `api/notion.js:8-9`.

## Testing the Integration

To verify everything is working:

1. **Start the dev server:**
   ```bash
   vercel dev
   ```

2. **Test the API directly:**
   ```bash
   curl http://localhost:3000/api/notion?type=transactions
   curl http://localhost:3000/api/notion?type=summary
   curl http://localhost:3000/api/notion?type=debug
   ```

3. **View in browser:**
   - Open http://localhost:3000
   - You should see your transactions loading automatically
   - Check the console for any errors

## Next Steps (Optional Enhancements)

While your setup is complete, you could add:

1. **Date range filtering** - Filter transactions by date range in the UI
2. **Category filtering** - Filter by specific categories
3. **Account filtering** - Filter by account (SECU, Cash App, etc.)
4. **Person filtering** - Filter by Beth/Bryan
5. **Business expense tracking** - Separate view for business transactions
6. **Subscription management** - Track and manage recurring subscriptions
7. **Transaction creation** - Add new transactions directly from the app
8. **Bulk operations** - Mark multiple transactions as reviewed
9. **Analytics** - Spending trends over time
10. **Export** - Download transactions as CSV

## Troubleshooting

### No data showing
- Check that `NOTION_API_KEY` is set in Vercel environment variables
- Verify the Notion integration has access to the Transactions database
- Check browser console for API errors

### Wrong data structure
- Use `/api/notion?type=debug` to inspect the database schema
- Verify property names match expectations

### Slow loading
- The API queries up to 50 transactions - this should be fast
- Check your network tab in browser dev tools
- Verify Notion API is responding quickly

## Summary

Your Finance Manager is already fully connected to the Transactions database. The current setup:
- ✅ Pulls real transaction data
- ✅ Calculates income/expense summaries
- ✅ Auto-refreshes every 30 seconds
- ✅ Supports all 22 categories
- ✅ Tracks accounts and person attribution
- ✅ Respects business/subscription flags

No additional setup is needed - your app is ready to use! 🎉
