# Finance Manager - Transaction Database Analysis

Generated: 2025-10-06

## 📊 Database Overview

**Total Transactions:** 262
**Date Range:** June 2025 - September 2025 (4 months)
**Data Sources:** Apple Cash PDF, Cash App PDF, SECU Statements

---

## 💰 Financial Summary

### Overall Totals
- **Total Income:** $14,557.59
- **Total Expenses:** $13,426.48
- **Net Profit:** $1,131.11

### Expense Breakdown
- **Business Expenses:** $145.61 (1.1%)
- **Personal Expenses:** $13,280.87 (98.9%)
- **Subscription Expenses:** $3,482.13 (25.9% of total expenses)

### Monthly Averages
- **Average Monthly Income:** $3,639.40
- **Average Monthly Expenses:** $3,356.62
- **Average Monthly Profit:** $282.78

---

## 📈 Monthly Trend Analysis

| Month | Income | Expenses | Profit | Transactions |
|-------|--------|----------|--------|--------------|
| **Jun 2025** | $1,732.47 | $2,986.20 | -$1,253.73 | 26 |
| **Jul 2025** | $6,580.81 | $4,515.50 | **$2,065.31** | 81 |
| **Aug 2025** | $4,379.83 | $2,668.83 | **$1,711.00** | 65 |
| **Sep 2025** | $1,864.48 | $3,255.95 | -$1,391.47 | 90 |

**Insights:**
- July & August were profitable months
- June & September showed deficits
- Transaction volume highest in September (90)
- Income varies significantly month-to-month

---

## 🏷️ Top Expense Categories

| Rank | Category | Amount | % of Total | Transactions |
|------|----------|--------|-----------|--------------|
| 1 | **Monthly Bills** | $5,026.63 | 37.44% | 15 |
| 2 | **Food** | $2,539.92 | 18.92% | 56 |
| 3 | **Home** | $1,915.84 | 14.27% | 32 |
| 4 | **Health** | $1,827.79 | 13.61% | 28 |
| 5 | **Software** | $770.66 | 5.74% | 42 |
| 6 | **Transport** | $743.49 | 5.54% | 19 |
| 7 | **George** | $201.26 | 1.50% | 2 |
| 8 | **Entertainment** | $145.01 | 1.08% | 17 |
| 9 | **Personal** | $108.24 | 0.81% | 3 |
| 10 | **Fees** | $49.85 | 0.37% | 6 |

**Key Observations:**
- Monthly Bills dominate spending (37.44%)
- Food is second largest category with many small transactions
- Software has 42 transactions (likely subscriptions)
- George (pet expenses) averages $100/transaction

---

## 👥 Spending by Person

| Person | Income | Expenses | Net | Transactions |
|--------|--------|----------|-----|--------------|
| **Bryan** | $9,217.92 | $8,226.17 | **$991.75** | 101 |
| **Beth** | $5,339.67 | $5,200.31 | **$139.36** | 161 |

**Insights:**
- Bryan: Higher income, higher expenses, more profitable
- Beth: More transactions (161 vs 101), but lower volume
- Both are net positive over the period

---

## 🏦 Account Analysis

| Account | Income | Expenses | Balance | Transactions |
|---------|--------|----------|---------|--------------|
| **SECU 8182** | $9,167.88 | $4,321.55 | **+$4,846.33** | 28 |
| **SECU Beth** | $5,110.67 | $2,012.38 | **+$3,098.29** | 72 |
| **Apple Cash** | $0.00 | $3,011.40 | **-$3,011.40** | 77 |
| **SECU 2791** | $0.04 | $3,175.67 | **-$3,175.63** | 59 |
| **Cash App** | $279.00 | $905.48 | **-$626.48** | 26 |

**Account Health:**
- ✅ SECU 8182 & SECU Beth: Positive balances (income accounts)
- ❌ Apple Cash, SECU 2791, Cash App: Deficit (expense-only accounts)
- Apple Cash has most transactions (77), primarily expenses

---

## 📁 Available Data Dimensions

### Categories (14 unique)
- Business
- Entertainment
- Fees
- Food
- George (Pet)
- Health
- Home
- Income
- Monthly Bills
- Personal
- Software
- Transfer Fee
- Transfers
- Transport

### Accounts (5 unique)
- Apple Cash
- Cash App
- SECU 2791
- SECU 8182
- SECU Beth

### People (2 unique)
- Beth
- Bryan

### Source Documents (3 unique)
- Apple Cash PDF
- Cash App PDF
- SECU Statement

### Time Periods
- **Months:** 2025-06, 2025-07, 2025-08, 2025-09
- **Years:** 2025

---

## 🎯 Recommended Dashboard Views

Based on the analysis, here are the key views to build:

### 1. **Overview Dashboard** (Current)
- Total income/expenses/profit
- Recent transactions
- Quick stats cards

### 2. **Monthly Trends View**
- Line chart: Income vs Expenses over time
- Bar chart: Profit by month
- Monthly comparison table
- Transaction count trends

### 3. **Category Analysis View**
- Pie chart: Spending by category
- Bar chart: Top 10 expense categories
- Category trends over time
- Drill-down into specific categories

### 4. **Person Comparison View**
- Side-by-side: Beth vs Bryan
- Individual spending patterns
- Category breakdown per person
- Account usage by person

### 5. **Account Health View**
- Account balances overview
- Transaction volume by account
- Income/expense ratio per account
- Account activity timeline

### 6. **Subscriptions & Recurring View**
- All transactions marked as "Subscription"
- Monthly recurring costs
- Software category breakdown
- Subscription trends

### 7. **Business Expenses View**
- All business-flagged transactions
- Business categories
- Monthly business spending
- Export for tax purposes

### 8. **Filters & Search**
- Filter by: Date range, Category, Person, Account, Type
- Search by description/merchant
- Multi-filter combinations
- Saved filter presets

---

## 🔍 Key Insights for Dashboard Design

### High-Value Features:
1. **Monthly Bill Tracking** - 37% of spending, only 15 transactions
2. **Food Spending Analysis** - 56 transactions, highly variable
3. **Subscription Management** - $3,482 in subscriptions needs visibility
4. **Account Balance Monitoring** - Track which accounts are draining
5. **Person-Specific Views** - Bryan & Beth have different patterns

### Data Patterns:
- **Subscription Heavy:** 42 software transactions suggest many subscriptions
- **Small Transaction Volume:** Only 262 total (65/month average)
- **Income Volatility:** Income varies 4x between months
- **Category Concentration:** Top 4 categories = 84% of spending

### UI Considerations:
- Show monthly comparisons prominently
- Highlight subscription costs (hidden drain)
- Visual indicators for deficit months
- Quick filters for person/category/account
- Business expense toggle for tax tracking

---

## 📋 Next Steps

1. **Implement Monthly Trends View** - Most impactful for understanding patterns
2. **Add Category Breakdown** - Pie chart + drill-down capabilities
3. **Create Person Comparison** - Beth vs Bryan side-by-side
4. **Build Advanced Filters** - Multi-dimensional filtering
5. **Add Subscription Tracker** - Dedicated view for recurring costs
6. **Implement Account Health** - Real-time balance tracking
7. **Export Capabilities** - CSV/PDF for business expenses

---

*This analysis is based on 262 transactions from June-September 2025. Data is sourced from Notion Transactions database.*
