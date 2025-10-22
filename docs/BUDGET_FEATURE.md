# Zero-Based Budget Feature

## Overview
Implemented a complete zero-based budgeting system that integrates with your Notion databases to show planned vs actual spending.

## What Was Built

### 1. API Endpoint (`/api/notion?type=budget`)
**Location:** `api/notion.js:115-228`

**Features:**
- Fetches budget plan from Notion Budget database (b94cf29beba14106bfd343d708b9e281)
- Fetches actual transactions for the same period
- Calculates zero-based budget formula: Income - Expenses - Savings - Debt = 0
- Groups actuals by category for comparison
- Supports month/year parameters: `?type=budget&year=2025&month=10`

**Response Structure:**
```json
{
  "budgetPlan": [...],
  "actualsByCategory": {...},
  "summary": {
    "planned": {
      "income": 5000,
      "expenses": 3500,
      "savings": 1000,
      "debt": 500,
      "remaining": 0
    },
    "actual": {
      "income": 4800,
      "expenses": 3200,
      "remaining": 1600
    }
  },
  "period": {...}
}
```

### 2. Budget Screen Component
**Location:** `src/components/BudgetScreen.tsx`

**Features:**
- Month/year selector dropdown
- Zero-based budget formula display
- Color-coded status indicators:
  - ✅ Green: Under budget (< 80%)
  - ⚠️ Yellow: Near budget (80-100%)
  - 🔴 Red: Over budget (> 100%)
- Category breakdown with:
  - Planned vs actual amounts
  - Progress bars
  - Line item details
  - Remaining budget per category
- Real-time validation: Shows if budget is balanced (remaining = $0)

**Design System:**
- Black/white/gray color scheme (follows CLAUDE.md rules)
- Tailwind-only styling (no inline styles)
- Arrow functions with parentheses
- Minimal object brace spacing: `{a, b}`

### 3. Navigation Integration
**Location:** `src/components/FinancialDashboard.tsx:2-4, 205, 223`

Added "Budget" tab to sidebar navigation with Calculator icon.

## Notion Database Structure

### Budget Database (b94cf29beba14106bfd343d708b9e281)
**Properties:**
- Title (title) - e.g., "Oct 2025 — Groceries"
- Budgeted Amount (number) - dollar amount
- Type (select) - Income, Expense, Savings, Debt
- Category (select) - Food, Health, Home, Personal, Business, etc.
- Date (date) - used for monthly filtering
- Notes (text) - optional context

### Transactions Database (82fc50e5b6b343a5a2ad1904f47404c0)
**Properties:**
- Description (title)
- Amount (number)
- Date (date)
- Type (select) - Credit/Debit
- Category (select)
- Account, Who, Business, Subscription

## Zero-Based Budget Methodology

Following `.cursor/rules/zero_based_budgeting_guide.mdc`:

1. **Income** - All expected income for the month
2. **Expenses** - All planned spending by category
3. **Savings** - Emergency fund, sinking funds, etc.
4. **Debt Payments** - Credit cards, loans, etc.
5. **Remaining** = Income - Expenses - Savings - Debt

**Goal:** Remaining = $0 (every dollar has a job)

## Usage

### 1. Plan Your Budget (in Notion)
Create budget line items in the "Household Budget — 2025 Q4" database:
- Set Date within target month (e.g., Oct 1, 2025)
- Set Type (Income, Expense, Savings, or Debt)
- Set Category (Food, Health, Home, etc.)
- Set Budgeted Amount
- Assign each dollar until Income - Expenses - Savings - Debt = 0

### 2. Track Actuals (automatic)
As you add transactions to the Transactions database, the Budget screen automatically:
- Pulls actual spending by category
- Compares to planned budget
- Shows progress bars and remaining amounts
- Highlights categories that are over/under budget

### 3. Review Progress
- Navigate to Budget screen in app
- Select month/year from dropdowns
- See zero-based formula at top
- Check category breakdown below
- Adjust spending or reallocate budget mid-month as needed

## Development Commands

```bash
# Local dev with API functions (required for budget endpoint)
vercel dev

# Production build
npm run build

# Deploy to Vercel
vercel --prod
```

## Next Steps (Optional)

1. **Add Budget Creation Form** - Create new budget items from the app
2. **Budget Templates** - Save and reuse monthly budgets
3. **Category Insights** - AI-powered spending pattern analysis
4. **Budget Alerts** - Notify when categories hit 80% or 100%
5. **Historical Comparison** - Show month-over-month trends
6. **Export Reports** - Generate PDF budget summaries

## Files Modified

- `api/notion.js` - Added budget endpoint
- `src/components/FinancialDashboard.tsx` - Added Budget navigation
- `src/components/BudgetScreen.tsx` - New component (340 lines)

## Environment Variables

No new environment variables required. Uses existing:
- `NOTION_API_KEY` - For all Notion API calls
- `Transactions_database_id` (optional override)
- `Budget_database_id` (optional override, defaults to b94cf29beba14106bfd343d708b9e281)
