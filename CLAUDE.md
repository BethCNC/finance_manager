# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Finance Manager is a React-based financial dashboard that integrates with Notion databases to display income, expenses, and financial summaries. It uses Vercel serverless functions to proxy Notion API requests and features a modern UI with AI-powered insights.

**Owner:** Beth Cartrette (7starsdesign)
**Stack:** React 18 + TypeScript + Tailwind CSS + Notion API + Vercel

## Critical Code Style Rules (NON-NEGOTIABLE)

These rules are enforced in this codebase:

1. **Arrow Functions** - ALWAYS use parentheses around parameters:
   ```typescript
   // ✅ Correct
   (param) => {...}
   ({name, value}) => {...}

   // ❌ Wrong
   param => {...}
   {name, value} => {...}
   ```

2. **Object Braces** - MINIMAL spacing inside braces:
   ```typescript
   // ✅ Correct
   const obj = {name, value}
   const {data, loading} = useHook()

   // ❌ Wrong
   const obj = { name, value }
   const { data, loading } = useHook()
   ```

3. **Styling** - ONLY Tailwind utility classes:
   - ❌ NO inline styles (`style={{...}}`)
   - ❌ NO custom CSS files
   - ✅ ONLY Tailwind classes in `className`

4. **Components** - Functional components only with TypeScript interfaces

## Development Commands

```bash
# Install dependencies
npm install

# Local development (React dev server only, API functions won't work)
npm start

# Local development with Vercel functions (required for API endpoints)
vercel dev

# Build production bundle (also transforms design tokens)
npm run build

# Transform design tokens only (tokens.json → CSS + Tailwind config)
npm run tokens:build

# Watch tokens.json and auto-transform on changes
npm run tokens:watch

# Run tests
npm test
```

**Important**: Use `vercel dev` instead of `npm start` when you need to test the `/api/notion` endpoint locally, as Vercel serverless functions only work in the Vercel environment.

## Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add NOTION_API_KEY
```

## Architecture

### Data Flow
```
Notion Databases → API Layer (/api/notion.js) → React Hook (useFinanceData) → UI Components
```

**Key Points:**
- Never expose Notion API keys in frontend code
- All Notion queries happen server-side in `/api/notion.js`
- Frontend fetches from `/api/notion?type=transactions`, `/api/notion?type=summary`, or `/api/notion?type=budget`
- Auto-refresh every 30 seconds via `setInterval` in hooks

### API Endpoints

The `/api/notion.js` endpoint accepts a `type` query parameter:

- `?type=transactions` - Returns combined income/expense transactions from the unified Transactions database (last 50)
- `?type=summary` - Returns aggregated totals (income, expenses, profit)
- `?type=budget&year=YYYY&month=M` - Returns zero-based budget plan and actuals for specified period
- `?type=debug` - Returns database structure and sample pages (for debugging)

### Notion Database Structure

Two primary databases are used (IDs can be set via environment variables):

1. **Transactions** (default: `82fc50e5b6b343a5a2ad1904f47404c0`)
   - Properties: Description (title), Amount (number), Date (date), Type (select: Credit/Debit), Category (select), Account (select), Who (select), Business (checkbox), Subscription (checkbox), Normalized Merchant (text)
   - Single unified database for all transactions (replaces old separate Income/Expense databases)
   - Type: "Credit" = income, "Debit" = expense

2. **Budget Plan** (default: `b94cf29beba14106bfd343d708b9e281`)
   - Properties: Title (title), Budgeted Amount (number), Type (select), Category (select), Date (date), Notes (rich_text)
   - Used for zero-based budgeting with planned income, expenses, savings, and debt payments
   - Type options: "Income", "Expense", "Savings", "Debt"

**These database IDs can be configured via environment variables:**
- `Transactions_database_id`
- `Budget_database_id`

## Design System

### Design Tokens

This project uses a token-based design system powered by Figma's Token Studio plugin:

- **Source of truth:** `tokens.json` (exported from Figma)
- **Build process:** `npm run tokens:build` transforms tokens.json into:
  - `src/tokens.css` - CSS custom properties
  - `src/tokens.tailwind.json` - Tailwind theme extension
- **Usage:** Tokens are auto-imported and available throughout the app

### Colors
```
Background:  bg-gray-50
Cards:       bg-white border-gray-200
Text:        text-black (headings), text-gray-700 (body), text-gray-500 (metadata)
Accent:      bg-black text-white (CTAs)
Success:     text-emerald-600
Warning:     text-yellow-600
Error:       text-red-600
Info:        text-blue-600
Hover:       hover:border-black hover:bg-gray-800
```

### Budget Category Colors
The BudgetScreen uses a color-coded system with Tailwind 300-level colors. Categories are organized by theme:
- **Housing** (red/orange/yellow): Housing, Mortgage, Utilities, Home
- **Living** (lime/emerald/cyan): George, Food, Auto, Transport
- **Personal** (blue/violet/fuchsia/pink): Entertainment, Health, Software, Personal Care
- **Admin** (slate/neutral): Fees, Bank Fees, Uncategorized

Each category has 4 color variants: `bg`, `text`, `border`, `accent` for consistent theming.

### Component Patterns
```typescript
// Card with hover effect
<div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-black transition-all">

// Primary button
<button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all">

// Input field
<input className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-black focus:outline-none" />
```

## Notion API Patterns

### Accessing Properties
```typescript
// Title property
page.properties.Description?.title[0]?.plain_text || 'Untitled'

// Number property
page.properties.Amount?.number || 0

// Date property
page.properties.Date?.date?.start || ''

// Select property (Category, Type, Account)
page.properties.Category?.select?.name || 'Uncategorized'
page.properties.Type?.select?.name || 'Debit'

// Checkbox property
page.properties.Business?.checkbox || false

// Rich text property (Notes, Normalized Merchant)
page.properties.Notes?.rich_text?.[0]?.plain_text || ''
```

### Creating Pages
```typescript
await notion.pages.create({
  parent: {database_id: DATABASE_ID},
  properties: {
    Description: {title: [{text: {content: 'Transaction Name'}}]},
    Amount: {number: 100},
    Date: {date: {start: '2025-10-05'}},
    Type: {select: {name: 'Debit'}},
    Category: {select: {name: 'Food'}}
  }
});
```

## Environment Variables

- `NOTION_API_KEY` - Integration token from Notion (required for all API calls)
- `Transactions_database_id` - ID for Transactions database (optional, has default)
- `Budget_database_id` - ID for Budget Plan database (optional, has default)
- `PLAID_CLIENT_ID` - Plaid client ID (optional, for bank integration)
- `PLAID_SECRET` - Plaid secret key (optional, for bank integration)
- Stored in `.env.local` locally (NEVER commit this file)
- Added to Vercel via `vercel env add NOTION_API_KEY`

The Notion integration must be connected to both Notion databases for the app to function.

## Key Files

- `api/notion.js` - Serverless API endpoint, handles CORS, queries Notion databases
- `src/hooks/useFinanceData.ts` - Data fetching hook with auto-refresh (30s interval)
- `src/components/FinancialDashboard.tsx` - Main UI component with navigation and budget visualization
- `src/components/MobileHeader.tsx` - Mobile-first header component
- `src/components/BottomNav.tsx` - Mobile navigation bar
- `tokens.json` - Design token definitions (Figma Token Studio export)
- `scripts/transform-tokens.js` - Token transformation build script
- `vercel.json` - Routing configuration for Vercel deployment
- `.cursor/rules/` - Complete project documentation and patterns

## Current State

- ✅ Core dashboard UI implemented with mobile-first design
- ✅ Notion integration working (2 databases: Transactions + Budget)
- ✅ Real-time data sync (30s intervals)
- ✅ Vercel serverless API layer
- ✅ Zero-based budgeting with category tracking
- ✅ Budget progress visualization with color-coded categories
- ✅ Design token system with Figma integration
- ⏳ AI chat assistant (planned)
- ⏳ Transaction creation form (planned)
- ⏳ Plaid bank integration (optional)

## Security Rules

- ✅ API keys ONLY in `.env.local` or Vercel env
- ✅ Notion queries ONLY in `/api/*.js` (server-side)
- ❌ NEVER expose secrets in frontend
- ❌ NEVER commit `.env.local`

## Files to NOT Modify

- `package.json` (only edit if adding dependencies)
- `tsconfig.json` (TypeScript config - already optimized)
- `tailwind.config.js` (Tailwind setup - working as is)
- `postcss.config.js` (PostCSS - no changes needed)
- `vercel.json` (Vercel routing - configured correctly)
- Database IDs in `api/notion.js` (can be overridden via env vars, but defaults are set)

## Common Workflows

### Adding a New Component
1. Create in `/src/components/ComponentName.tsx`
2. Define TypeScript interface for props
3. Use functional component with minimal object brace spacing
4. Follow Tailwind design system (black accents, gray backgrounds)
5. Export default

### Adding API Endpoint
1. Edit `/api/notion.js`
2. Add new `if (type === 'newtype')` case
3. Query Notion database with error handling
4. Return formatted JSON with CORS headers
5. Update hook to fetch new data

### Working with Design Tokens
1. Export tokens from Figma (Token Studio plugin) → `tokens.json`
2. Run `npm run tokens:build` to transform into CSS + Tailwind config
3. Use `npm run tokens:watch` during active design work
4. Reference tokens via Tailwind classes or CSS custom properties

### Before Committing
- [ ] Run `npm run build` to check for TypeScript errors
- [ ] Verify arrow functions have parentheses: `(x) => x`
- [ ] Verify object braces have minimal spacing: `{a, b}`
- [ ] Verify only Tailwind classes (no inline styles)
- [ ] Verify API keys only in `.env.local`
- [ ] Verify components under 200 lines
- [ ] Verify all Notion properties have fallbacks: `|| defaultValue`

## Common Issues

- **"Failed to fetch data from Notion"** - Check `NOTION_API_KEY` env var and database connection permissions
- **API 404 in local dev** - Use `vercel dev` instead of `npm start`
- **Empty data** - Verify Notion databases have data and integration has read permissions
- **Type errors** - Run `npm install @types/node --save-dev`
- **CORS errors** - Check CORS headers in API response
- **Design tokens not updating** - Run `npm run tokens:build` after changing `tokens.json`

## Additional Resources

For detailed patterns, task roadmap, and comprehensive documentation, see:
- `.cursor/rules/QUICKREF.mdc` - Quick reference card
- `.cursor/rules/patterns.mdc` - Copy-paste code snippets
- `.cursor/rules/instructions.mdc` - Complete guide
- `.cursor/rules/tasks.mdc` - Roadmap and backlog
- `.cursor/rules/context.mdc` - Project state
- `.cursor/rules/zero_based_budgeting_guide.mdc` - Zero-based budgeting methodology
- `docs/` - Additional documentation on Figma workflow, design system, etc.
