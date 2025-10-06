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

# Build production bundle
npm run build

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
Notion Databases → API Layer (/api/notion.ts) → React Hook (useFinanceData) → UI Components
```

**Key Points:**
- Never expose Notion API keys in frontend code
- All Notion queries happen server-side in `/api/notion.ts`
- Frontend fetches from `/api/notion?type=transactions` or `/api/notion?type=summary`
- Auto-refresh every 30 seconds via `setInterval` in hooks

### API Endpoints

The `/api/notion` endpoint accepts a `type` query parameter:

- `?type=transactions` - Returns combined income/expense transactions (last 20 of each)
- `?type=summary` - Returns aggregated monthly totals from Months database

### Notion Database Structure

Three databases are used (IDs hard-coded in `api/notion.ts:8-10`):

1. **Incomes** (`18986edc-ae2c-81b8-8f77-e19036368d99`)
   - Properties: Name (title), Amount (number), Date (date), Months (relation)

2. **Expenses** (`18986edc-ae2c-815f-b56c-ed1964dccaf5`)
   - Properties: Name (title), Amount (number), Date (date), Months (relation)

3. **Months** (`18986edc-ae2c-81ca-a41c-cde295ea544f`)
   - Properties:
     - `Incomes Amount` (rollup)
     - `Expenses amount` (rollup)
     - `Profite` (formula) - Note: typo in Notion property name

**Critical**: The Months database property is spelled "Profite" (not "Profit"). Do not change this in code without updating Notion.

**These database IDs are HARDCODED and should NEVER change.**

## Design System

### Colors
```
Background:  bg-gray-50
Cards:       bg-white border-gray-200
Text:        text-black (headings), text-gray-700 (body), text-gray-500 (metadata)
Accent:      bg-black text-white (CTAs)
Success:     text-emerald-600
Error:       text-red-600
Hover:       hover:border-black hover:bg-gray-800
```

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
page.properties.Name?.title[0]?.plain_text || 'Untitled'

// Number property
page.properties.Amount?.number || 0

// Date property
page.properties.Date?.date?.start || ''

// Rollup property (from Months database)
page.properties['Incomes Amount']?.rollup?.number || 0

// Formula property (from Months database - note the typo)
page.properties['Profite']?.formula?.number || 0
```

### Creating Pages
```typescript
await notion.pages.create({
  parent: {database_id: DATABASE_ID},
  properties: {
    Name: {title: [{text: {content: 'Transaction Name'}}]},
    Amount: {number: 100},
    Date: {date: {start: '2025-10-05'}},
    Type: {select: {name: 'expense'}}
  }
});
```

## Environment Variables

- `NOTION_API_KEY` - Integration token from Notion (required for all API calls)
- Stored in `.env.local` locally (NEVER commit this file)
- Added to Vercel via `vercel env add NOTION_API_KEY`

The integration must be connected to all three Notion databases for the app to function.

## Key Files

- `api/notion.ts` - Serverless API endpoint, handles CORS, queries Notion databases
- `src/hooks/useFinanceData.ts` - Data fetching hook with auto-refresh (30s interval at line 50)
- `src/components/FinancialDashboard.tsx` - Main UI component with navigation, metrics, and AI chat panel
- `vercel.json` - Routing configuration for Vercel deployment
- `.cursor/rules/` - Complete project documentation and patterns

## Current State

- ✅ Core dashboard UI implemented
- ✅ Notion integration working (3 databases)
- ✅ Real-time data sync (30s intervals)
- ✅ Vercel serverless API layer
- ⏳ AI chat assistant (planned)
- ⏳ Transaction creation form (planned)
- ⏳ Budget visualization (planned)

## Security Rules

- ✅ API keys ONLY in `.env.local` or Vercel env
- ✅ Notion queries ONLY in `/api/*.ts` (server-side)
- ❌ NEVER expose secrets in frontend
- ❌ NEVER commit `.env.local`

## Files to NOT Modify

- `package.json` (only edit if adding dependencies)
- `tsconfig.json` (TypeScript config - already optimized)
- `tailwind.config.js` (Tailwind setup - working as is)
- `postcss.config.js` (PostCSS - no changes needed)
- `vercel.json` (Vercel routing - configured correctly)
- Database IDs in `api/notion.ts` (HARDCODED constants)

## Common Workflows

### Adding a New Component
1. Create in `/src/components/ComponentName.tsx`
2. Define TypeScript interface for props
3. Use functional component with minimal object brace spacing
4. Follow Tailwind design system (black accents, gray backgrounds)
5. Export default

### Adding API Endpoint
1. Edit `/api/notion.ts`
2. Add new `if (type === 'newtype')` case
3. Query Notion database with error handling
4. Return formatted JSON with CORS headers
5. Update hook to fetch new data

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

## Additional Resources

For detailed patterns, task roadmap, and comprehensive documentation, see:
- `.cursor/rules/QUICKREF.mdc` - Quick reference card
- `.cursor/rules/patterns.mdc` - Copy-paste code snippets
- `.cursor/rules/instructions.mdc` - Complete guide
- `.cursor/rules/tasks.mdc` - Roadmap and backlog
- `.cursor/rules/context.mdc` - Project state
