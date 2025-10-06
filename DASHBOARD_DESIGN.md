# Finance Manager - Dashboard Design Specification

Based on analysis of 262 transactions from your Notion database.

---

## 🎨 Proposed Dashboard Structure

### Navigation (Left Sidebar)
```
┌─────────────────────┐
│ 💰 FinanceAI        │
├─────────────────────┤
│ 📊 Overview         │ ← Current
│ 📈 Monthly Trends   │ ← NEW
│ 🏷️  Categories      │ ← NEW
│ 👥 People           │ ← NEW
│ 🏦 Accounts         │ ← NEW
│ 🔁 Subscriptions    │ ← NEW
│ 💼 Business         │ ← NEW
│ 🔍 Search           │ ← NEW
├─────────────────────┤
│ 🤖 AI Assistant     │
└─────────────────────┘
```

---

## 📊 View 1: Overview Dashboard (EXISTING - Enhanced)

**Current Status:** ✅ Implemented
**Enhancements Needed:**

### Top Metrics Row (4 cards)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total Income │ │   Expenses   │ │ Net Profit   │ │ This Month   │
│  $14,557.59  │ │  $13,426.48  │ │  $1,131.11  │ │ $1,864.48 ↓  │
│   ↑ 8.3%     │ │   ↓ 3.2%     │ │   ↑ 12.5%   │ │ (Sep 2025)   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### Alert Cards (New)
```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️  ALERTS & INSIGHTS                                       │
├─────────────────────────────────────────────────────────────┤
│ 🔴 Deficit Month: September -$1,391 (income < expenses)     │
│ 💳 High Subscription Cost: $3,482 total (26% of expenses)   │
│ 📊 Monthly Bills: $5,026 (37% of all spending)              │
└─────────────────────────────────────────────────────────────┘
```

### Recent Transactions (Enhanced)
- Add filter chips: [All] [Beth] [Bryan] [Income] [Expenses]
- Add category icons
- Add account badges
- Show business/subscription badges

---

## 📈 View 2: Monthly Trends (NEW - HIGH PRIORITY)

**Purpose:** Understand income/expense patterns over time

### Monthly Comparison Chart
```
Income vs Expenses Over Time
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   $7k ┤     ╭──Income                                       │
│       │    ╱                                                 │
│   $6k ┤   ╱                                                  │
│       │  ╱    ╱───╲                                          │
│   $5k ┤ ╱    ╱     ╲─Expenses                               │
│       │╱    ╱       ╲                                        │
│   $4k ┤────╱         ╲                                       │
│       │              ╲                                       │
│   $3k ┤               ╲───                                   │
│       │                                                      │
│   $2k ┤                                                      │
│       ├────┬────┬────┬────┬                                 │
│       Jun  Jul  Aug  Sep  Oct                              │
└─────────────────────────────────────────────────────────────┘
```

### Profit Trend Bar Chart
```
Monthly Profit/Loss
┌─────────────────────────────────────────────────────────────┐
│                ████████ +$2,065                              │
│         ██████          +$1,711                              │
│   ████                       -$1,254                         │
│                   ████       -$1,391                         │
│   ────┬────┬────┬────┬                                      │
│   Jun  Jul  Aug  Sep                                        │
└─────────────────────────────────────────────────────────────┘
Green bars = profit, Red bars = deficit
```

### Monthly Stats Table
```
┌───────┬──────────┬──────────┬──────────┬──────────┐
│ Month │  Income  │ Expenses │  Profit  │   Count  │
├───────┼──────────┼──────────┼──────────┼──────────┤
│ Jun   │ $1,732   │ $2,986   │  -$1,254 │    26    │
│ Jul   │ $6,581   │ $4,516   │  +$2,065 │    81 ⬆  │
│ Aug   │ $4,380   │ $2,669   │  +$1,711 │    65    │
│ Sep   │ $1,864   │ $3,256   │  -$1,391 │    90 ⬆  │
└───────┴──────────┴──────────┴──────────┴──────────┘
```

**Features:**
- Toggle between chart types (line, bar, area)
- Hover for detailed breakdowns
- Click month to drill down
- Export chart as image

---

## 🏷️ View 3: Category Analysis (NEW - HIGH PRIORITY)

**Purpose:** See where money is going

### Spending by Category - Pie Chart
```
                Category Breakdown
        ┌─────────────────────────────────┐
        │         Monthly Bills           │
        │           37.44%                │
        │        ┌────────┐               │
        │    ╱───┤        ├───╲           │
        │   │    │ $5,027 │    │          │
        │   │    └────────┘    │          │
        │   │                  │          │
        │ Food  18.92%   Home  14.27%     │
        │ $2,540         $1,916           │
        └─────────────────────────────────┘
```

### Top Categories - Bar Chart
```
Top 10 Expense Categories
┌─────────────────────────────────────────────────────────────┐
│ Monthly Bills  ████████████████████████████  $5,027  37.4%  │
│ Food           ██████████                    $2,540  18.9%  │
│ Home           ███████                       $1,916  14.3%  │
│ Health         ███████                       $1,828  13.6%  │
│ Software       ███                           $771    5.7%   │
│ Transport      ███                           $743    5.5%   │
│ George         █                             $201    1.5%   │
│ Entertainment  █                             $145    1.1%   │
│ Personal       █                             $108    0.8%   │
│ Fees           █                             $50     0.4%   │
└─────────────────────────────────────────────────────────────┘
```

### Category Details Table
```
┌──────────────┬──────────┬──────┬────────┬─────────────┐
│  Category    │  Amount  │ Count│  Avg   │   % Total   │
├──────────────┼──────────┼──────┼────────┼─────────────┤
│ Monthly Bills│ $5,027   │  15  │ $335   │   37.44%    │
│ Food         │ $2,540   │  56  │  $45   │   18.92%    │
│ Home         │ $1,916   │  32  │  $60   │   14.27%    │
│ Health       │ $1,828   │  28  │  $65   │   13.61%    │
│ Software     │  $771    │  42  │  $18   │    5.74%    │
└──────────────┴──────────┴──────┴────────┴─────────────┘
```

**Features:**
- Click category to see all transactions
- Filter by date range
- Show/hide income categories
- Export category report

---

## 👥 View 4: People Comparison (NEW)

**Purpose:** Compare Beth vs Bryan spending patterns

### Side-by-Side Comparison
```
┌──────────────────────────┬──────────────────────────┐
│        BRYAN             │         BETH             │
├──────────────────────────┼──────────────────────────┤
│  Income:    $9,218       │  Income:    $5,340       │
│  Expenses:  $8,226       │  Expenses:  $5,200       │
│  Net:       +$992  ✅    │  Net:       +$139  ✅    │
│  Txns:      101          │  Txns:      161          │
├──────────────────────────┼──────────────────────────┤
│  Top Categories:         │  Top Categories:         │
│  • Monthly Bills $2,850  │  • Food         $1,420   │
│  • Food         $1,120   │  • Home         $1,100   │
│  • Transport     $520    │  • Health        $980    │
└──────────────────────────┴──────────────────────────┘
```

### Category Comparison Chart
```
Spending Patterns by Person
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│ Monthly Bills ██████████ Bryan                              │
│               ████ Beth                                      │
│                                                              │
│ Food          ████ Bryan                                     │
│               ██████ Beth                                    │
│                                                              │
│ Transport     ███ Bryan                                      │
│               ██ Beth                                        │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Toggle between people
- Filter by category
- Show account distribution per person
- Monthly trends per person

---

## 🏦 View 5: Accounts Overview (NEW)

**Purpose:** Monitor account health and balances

### Account Health Cards
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  SECU 8182      │ │   SECU Beth     │ │  Apple Cash     │
│                 │ │                 │ │                 │
│  +$4,846 ✅     │ │  +$3,098 ✅     │ │  -$3,011 ⚠️     │
│                 │ │                 │ │                 │
│  In:  $9,168    │ │  In:  $5,111    │ │  In:  $0        │
│  Out: $4,322    │ │  Out: $2,012    │ │  Out: $3,011    │
│  Txns: 28       │ │  Txns: 72       │ │  Txns: 77       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Account Activity Timeline
```
Recent Activity by Account
┌─────────────────────────────────────────────────────────────┐
│ Sep 24  Apple Cash   Shell Oil          -$20.01             │
│ Sep 24  Apple Cash   Zaxby's            -$27.71             │
│ Sep 23  SECU Beth    Salary Deposit    +$2,500              │
│ Sep 22  Cash App     Transfer           -$10.00             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Real-time balance calculation
- Account-specific transaction list
- Filter by account
- Transfer detection

---

## 🔁 View 6: Subscriptions & Recurring (NEW)

**Purpose:** Track all subscription costs

### Subscription Overview
```
┌─────────────────────────────────────────────────────────────┐
│  SUBSCRIPTION COSTS                                          │
│                                                              │
│  Total Monthly:  ~$870/month (42 subscriptions)              │
│  Total Paid:     $3,482 (Jun-Sep)                           │
│  % of Expenses:  25.9%                                       │
└─────────────────────────────────────────────────────────────┘
```

### Software Subscriptions (42 transactions)
```
┌──────────────────┬──────────┬───────────┬────────────────┐
│   Service        │  Amount  │ Frequency │   Last Charge  │
├──────────────────┼──────────┼───────────┼────────────────┤
│ Netflix          │  $15.99  │  Monthly  │   Sep 15       │
│ Adobe CC         │  $54.99  │  Monthly  │   Sep 1        │
│ Notion           │  $10.00  │  Monthly  │   Sep 3        │
│ GitHub           │   $7.00  │  Monthly  │   Sep 10       │
└──────────────────┴──────────┴───────────┴────────────────┘
```

**Features:**
- Detect recurring patterns
- Show subscription checkbox filter
- Calculate monthly cost
- Alert for new subscriptions

---

## 💼 View 7: Business Expenses (NEW)

**Purpose:** Track business expenses for taxes

### Business Summary
```
┌─────────────────────────────────────────────────────────────┐
│  BUSINESS EXPENSES (Tax Deductible)                         │
│                                                              │
│  Total:       $145.61                                        │
│  Count:       3 transactions                                 │
│  % of Total:  1.1%                                           │
└─────────────────────────────────────────────────────────────┘
```

### Business Transactions List
```
┌────────────┬───────────────────────────┬──────────┬──────────┐
│    Date    │     Description           │  Amount  │ Category │
├────────────┼───────────────────────────┼──────────┼──────────┤
│ Sep 22     │ Payment to +17049187345   │  $30.00  │  Health  │
│ Aug 15     │ Domain Renewal            │  $39.70  │ Software │
│ Jul 10     │ Office Supplies           │  $75.91  │ Business │
└────────────┴───────────────────────────┴──────────┴──────────┘
```

**Features:**
- Business checkbox filter only
- Export for tax prep
- Category breakdown
- Monthly business spending

---

## 🔍 View 8: Search & Filters (NEW)

**Purpose:** Advanced filtering and search

### Filter Panel
```
┌─────────────────────────────────────────────────────────────┐
│  FILTERS                                                     │
├─────────────────────────────────────────────────────────────┤
│  Date Range:  [Jun 2025] to [Sep 2025]                      │
│                                                              │
│  Category:    [All ▼]  Food, Home, Health, Transport...     │
│  Person:      [All ▼]  Beth, Bryan                          │
│  Account:     [All ▼]  Apple Cash, Cash App, SECU...        │
│  Type:        [All ▼]  Income, Expense                      │
│                                                              │
│  ☑ Business Only                                            │
│  ☑ Subscriptions Only                                       │
│                                                              │
│  [Apply Filters]  [Clear All]  [Save Preset]                │
└─────────────────────────────────────────────────────────────┘
```

### Search Bar
```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Search transactions...                                   │
│      (by description, merchant, amount, date)                │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Multi-filter combinations
- Save filter presets
- Real-time search
- Export filtered results

---

## 🎯 Implementation Priority

### Phase 1 (Week 1) - Core Analytics
1. ✅ Overview Dashboard (existing - minor enhancements)
2. 📈 Monthly Trends View
3. 🏷️ Category Analysis View

### Phase 2 (Week 2) - Comparison Views
4. 👥 People Comparison View
5. 🏦 Accounts Overview
6. 🔍 Basic Filters

### Phase 3 (Week 3) - Specialized Views
7. 🔁 Subscriptions Tracker
8. 💼 Business Expenses View
9. 🔍 Advanced Search

### Phase 4 (Week 4) - AI & Insights
10. 🤖 AI Assistant Integration
11. 📊 Predictive Analytics
12. 🚨 Smart Alerts

---

## 🎨 Design System (Maintain Consistency)

### Colors (From existing)
- Background: `bg-gray-50`
- Cards: `bg-white border-gray-200`
- Primary: `bg-black text-white`
- Success/Income: `text-emerald-600`
- Danger/Expense: `text-red-600`
- Warning: `text-yellow-600`

### Chart Colors
- Income: `#10b981` (emerald-500)
- Expenses: `#ef4444` (red-500)
- Profit: `#3b82f6` (blue-500)
- Categories: Use distinct colors for each

---

*Ready to start building! Which view should we implement first?*
