# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Finance Manager is a React-based financial dashboard that integrates with Notion databases to display income, expenses, and financial summaries. It uses Vercel serverless functions to proxy Notion API requests and features a modern UI with AI-powered insights.

## Development Commands

```bash
# Install dependencies
npm install

# Local development (React dev server only, API functions won't work)
npm start

# Local development with Vercel functions (required for API endpoints)
vercel dev

# Build production bundle
npm build

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
1. **Notion Databases** → Hard-coded database IDs in `api/notion.ts`
2. **API Layer** (`api/notion.ts`) → Vercel serverless function that queries Notion API
3. **React Hook** (`src/hooks/useFinanceData.ts`) → Fetches from `/api/notion` endpoint
4. **Dashboard Component** (`src/components/FinancialDashboard.tsx`) → Consumes hook data

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

### Data Refresh

The dashboard auto-refreshes every 30 seconds via `useFinanceData.ts:50`. Adjust interval by changing the `setInterval` delay.

### Environment Variables

- `NOTION_API_KEY` - Integration token from Notion (required for all API calls)

The integration must be connected to all three Notion databases for the app to function.

## Key Files

- `api/notion.ts` - Serverless API endpoint, handles CORS, queries Notion databases
- `src/hooks/useFinanceData.ts` - Data fetching hook with auto-refresh
- `src/components/FinancialDashboard.tsx` - Main UI component with navigation, metrics, and AI chat panel
- `vercel.json` - Routing configuration for Vercel deployment

## UI Components

The dashboard uses a sidebar navigation with three screens (Dashboard, Budgets, Analytics), though only Dashboard is currently implemented. The AI chat panel is a placeholder - it doesn't connect to any AI service yet.

## Common Issues

- **"Failed to fetch data from Notion"** - Check `NOTION_API_KEY` env var and database connection permissions
- **API 404 in local dev** - Use `vercel dev` instead of `npm start`
- **Empty data** - Verify Notion databases have data and integration has read permissions
