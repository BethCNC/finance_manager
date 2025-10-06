# Financial Data Context & Structure

**Purpose:** Define the data sources, ownership, and structure for the AI Financial Life Coach

**Last Updated:** October 6, 2025

---

## 👥 Household Profile

### **Individuals:**
- **Beth** - Partner 1
- **Bryan** - Partner 2

### **Relationship:**
- Couple managing finances together as a household unit
- Working toward shared financial goals
- Individual account ownership but combined financial strategy

---

## 🏦 Account Structure

### **Bryan's Accounts (3)**

1. **SECU 8182** (NC State Employees Credit Union)
   - Type: Checking/Primary Account
   - Data source: SECU bank statements
   - Usage: Primary income and expenses

2. **SECU 2791** (NC State Employees Credit Union)
   - Type: Checking/Secondary Account
   - Data source: SECU bank statements
   - Usage: Secondary expenses

3. **Cash App (Bryan)**
   - Type: Payment App
   - Data source: Cash App statement exports
   - Usage: Peer-to-peer payments, some expenses

### **Beth's Accounts (3)**

1. **SECU Beth** (NC State Employees Credit Union)
   - Type: Checking/Primary Account
   - Data source: SECU bank statements
   - Usage: Primary income and expenses

2. **Cash App (Beth)**
   - Type: Payment App
   - Data source: Cash App statement exports
   - Usage: Peer-to-peer payments, some expenses

3. **Apple Cash**
   - Type: Payment App (Apple Pay)
   - Data source: Apple Cash statement exports
   - Usage: Digital payments, mobile transactions

### **Total Household Accounts: 5**
- 3 SECU accounts (NC State Employees Credit Union)
- 2 Cash App accounts (1 per person)
- 1 Apple Cash account (Beth only)

---

## 📊 Data Sources

### **Primary Data Source:**
**Notion Transactions Database** (`82fc50e5b6b343a5a2ad1904f47404c0`)

### **Original Data Imports:**
1. **SECU Bank Statements** (PDF/CSV exports)
   - SECU 8182 transactions
   - SECU 2791 transactions
   - SECU Beth transactions

2. **Cash App Statements** (CSV/PDF exports)
   - Bryan's Cash App transactions
   - Beth's Cash App transactions

3. **Apple Cash Statements** (CSV/PDF exports)
   - Beth's Apple Cash transactions

### **Data Quality Process:**
✅ **Meticulous data cleansing completed**
- All transactions reconciled across accounts
- Transfers between accounts handled properly
- Only transfer fees recorded (no double-counting of transfers)
- Duplicate transactions removed
- Categories assigned and verified
- Business expenses flagged
- Subscriptions identified

---

## 🗂️ Database Schema

### **Notion Transactions Database Structure:**

**Core Fields:**
- **Description** (title) - Transaction description/merchant name
- **Amount** (number) - Transaction amount (negative for debits, positive for credits)
- **Date** (date) - Transaction date
- **Type** (select) - "Debit" or "Credit"
- **Category** (select) - Expense/income category
- **Who** (select) - "Beth" or "Bryan" (person attribution)
- **Account** (select) - Source account
- **Business** (checkbox) - Business expense flag
- **Subscription** (checkbox) - Recurring subscription flag

**Additional Fields (if present):**
- **Normalized Merchant** (rich_text) - Cleaned merchant name
- **Source** (select) - Original data source (e.g., "SECU Statement", "Cash App PDF")

### **Transaction Types:**
- **Credit** = Income (positive amount)
- **Debit** = Expense (negative amount)

### **Categories (14 total):**
1. Income
2. Monthly Bills
3. Food
4. Home
5. Health
6. Software
7. Transport
8. Entertainment
9. Personal
10. Business
11. Fees
12. Transfer Fee
13. Transfers
14. George (Pet expenses)

### **Accounts (5 total):**
1. SECU 8182 (Bryan)
2. SECU 2791 (Bryan)
3. SECU Beth (Beth)
4. Cash App (both Beth and Bryan - distinguished by "Who" field)
5. Apple Cash (Beth)

### **People (2 total):**
1. Beth
2. Bryan

---

## 🔄 Transfer Handling

### **Critical Rule: Transfers are NOT Double-Counted**

**The Problem:**
When money moves between accounts (e.g., Bryan transfers $100 from SECU 8182 to Cash App):
- SECU 8182 shows: -$100 (debit)
- Cash App shows: +$100 (credit)
- This creates $200 of transactions for a $0 net movement

**The Solution:**
✅ **Only transfer FEES are recorded as transactions**
❌ **Transfer principal amounts are excluded/reconciled**

**Example:**
```
Transfer: $100 from SECU 8182 to Cash App with $2.50 fee

Recorded in Notion:
- Amount: -$2.50
- Category: Transfer Fee
- Account: SECU 8182
- Who: Bryan
- Description: "Transfer fee to Cash App"

NOT recorded:
- The $100 debit from SECU 8182
- The $100 credit to Cash App
```

**Why This Matters:**
- Prevents inflated expense/income totals
- Accurately reflects true spending vs transfers
- Fee tracking identifies optimization opportunities
- Clean data for AI analysis

---

## 📈 Data Timeline

### **Current Data Range:**
- **Start:** June 2025
- **End:** September 2025 (as of last analysis)
- **Duration:** 4 months
- **Total Transactions:** 262 (after cleansing and reconciliation)

### **Data Completeness:**
✅ All accounts reconciled for June-September 2025
✅ All transfers identified and cleaned
✅ Categories assigned to all transactions
✅ Person attribution complete (Beth/Bryan)
✅ Business expenses flagged
✅ Subscriptions identified

### **Ongoing Data Entry:**
- Transactions continue to be added as they occur
- Monthly reconciliation process
- Continuous data quality maintenance

---

## 🎯 AI Agent Data Requirements

### **What the AI Needs to Understand:**

1. **Couple Dynamics:**
   - This is a household unit with two individuals
   - Each person has their own accounts
   - Some accounts overlap (both use Cash App)
   - Financial decisions should consider both perspectives

2. **Account Ownership:**
   - Bryan: SECU 8182, SECU 2791, Cash App
   - Beth: SECU Beth, Cash App, Apple Cash
   - AI should know which accounts belong to whom

3. **Transfer Intelligence:**
   - Transfers are NOT expenses
   - Only fees matter
   - Don't flag transfer amounts as overspending

4. **Data Quality:**
   - Data has been meticulously cleaned
   - Trust the categorization
   - No duplicate detection needed (already done)

5. **Context Awareness:**
   - When Beth asks "How much did I spend?", show ONLY her transactions
   - When asking household questions, combine both
   - Respect individual privacy while enabling joint planning

---

## 🤖 AI System Prompts

### **Core Context for AI Agent:**

```
You are analyzing financial data for Beth and Bryan, a couple managing their household finances together.

DATA SOURCES:
- Bryan's accounts: SECU 8182, SECU 2791, Cash App
- Beth's accounts: SECU Beth, Cash App, Apple Cash
- Total: 5 accounts across 2 people

DATA QUALITY:
- All transactions have been meticulously cleansed and reconciled
- Transfers between accounts are recorded as FEES ONLY (not double-counted)
- Each transaction is properly attributed to Beth or Bryan via "Who" field
- Categories, business flags, and subscription flags are accurate

IMPORTANT RULES:
1. This is a COUPLE working as a financial unit
2. Respect individual spending patterns (Beth vs Bryan)
3. Provide household-level recommendations while acknowledging individual contributions
4. When one person asks about "my spending", filter to their transactions only
5. When asked about "our spending", combine household view
6. Transfers are NOT expenses - only transfer fees count
7. Help align financial goals between partners

YOUR ROLE:
Act as their personal financial advisor, CPA, and wealth coach. Help them:
- Break free from paycheck-to-paycheck living
- Reduce financial stress
- Build wealth systematically
- Enjoy life while saving money
- Create 1/3/5/10 year plans
- Develop healthy financial habits
```

---

## 📊 Sample Data Analysis Queries

### **Individual Analysis:**
```javascript
// Beth's spending
transactions.filter(t => t.who === 'Beth' && t.type === 'expense')

// Bryan's income
transactions.filter(t => t.who === 'Bryan' && t.type === 'income')
```

### **Household Analysis:**
```javascript
// Total household expenses
transactions.filter(t => t.type === 'expense')

// Combined savings rate
(totalIncome - totalExpenses) / totalIncome
```

### **Account-Specific:**
```javascript
// Apple Cash activity (Beth only)
transactions.filter(t => t.account === 'Apple Cash')

// SECU accounts (Bryan's two accounts)
transactions.filter(t => t.account === 'SECU 8182' || t.account === 'SECU 2791')
```

### **Exclude Transfers:**
```javascript
// True expenses (no transfers)
transactions.filter(t =>
  t.type === 'expense' &&
  t.category !== 'Transfers' &&
  t.category !== 'Transfer Fee'
)
```

---

## 🔍 Data Validation Checklist

Before AI analysis, verify:

- [ ] All transactions have "Who" field assigned (Beth or Bryan)
- [ ] All transactions have "Account" field assigned
- [ ] All transactions have "Category" assigned (not "Uncategorized")
- [ ] Transfer transactions are properly marked or excluded
- [ ] Business expenses are flagged where applicable
- [ ] Subscriptions are identified and flagged
- [ ] Date range is complete (no missing months)
- [ ] No duplicate transactions
- [ ] Amounts are correct (debits negative, credits positive)

---

## 📝 Data Update Protocol

### **When Adding New Transactions:**

1. **Source Identification:**
   - Identify which account the transaction came from
   - Attribute to correct person (Beth or Bryan)

2. **Categorization:**
   - Assign appropriate category
   - Flag business expenses
   - Flag subscriptions

3. **Transfer Handling:**
   - If it's a transfer, record ONLY the fee
   - Do NOT record the principal amount

4. **Quality Check:**
   - Verify amount is correct
   - Verify date is accurate
   - Ensure "Who" field is set
   - Confirm category makes sense

5. **Reconciliation:**
   - Compare to bank statement
   - Verify all transactions imported
   - Check for duplicates

---

## 🎯 AI Use Cases

### **Use Case 1: Individual Spending Analysis**
**Query:** "How much did Beth spend on food last month?"
**Filter:** Who = Beth, Category = Food, Month = September

### **Use Case 2: Household Budget**
**Query:** "What's our household savings rate?"
**Filter:** All transactions, Income vs Expenses, Combined

### **Use Case 3: Account Health**
**Query:** "Is Bryan's Apple Cash account draining?"
**Filter:** Account = Apple Cash, Who = Bryan
**Note:** Wait - Bryan doesn't have Apple Cash! Only Beth does.
**Correct Answer:** "Bryan doesn't have an Apple Cash account. Did you mean Beth's Apple Cash?"

### **Use Case 4: Subscription Audit**
**Query:** "List all our subscriptions and who pays for them"
**Filter:** Subscription = true, Group by Who
**Output:** Show Beth's subscriptions vs Bryan's subscriptions

### **Use Case 5: Tax Deductions**
**Query:** "What business expenses can we deduct?"
**Filter:** Business = true, Sum by person
**Output:** Total deductible expenses for tax purposes

---

## 🚀 Next Steps

1. **Verify Current Data State:**
   - Run analysis query to confirm transaction count
   - Check data quality metrics
   - Validate date range

2. **Build AI Context Loader:**
   - Create function to load transactions from Notion
   - Filter and transform for AI consumption
   - Include metadata (account ownership, person attribution)

3. **Test AI Understanding:**
   - Ask: "Who has more accounts, Beth or Bryan?"
   - Expected: "Bryan has 3 accounts (SECU 8182, SECU 2791, Cash App). Beth has 3 accounts (SECU Beth, Cash App, Apple Cash). Both have the same number of accounts."

4. **Implement Couple-Aware Responses:**
   - Individual queries filtered correctly
   - Household queries combined correctly
   - Respect privacy and joint planning

---

**This data context ensures the AI understands the household structure and provides accurate, personalized financial coaching for Beth and Bryan.**
