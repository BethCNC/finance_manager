# Quick Start Guide

## Step 1: Get Your Notion API Key

1. Visit [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill out:
   - Name: **Finance Dashboard**
   - Associated workspace: **7starsdesign**
4. Click **"Submit"**
5. **Copy the Integration Token** (starts with `secret_`)

## Step 2: Connect Integration to Your Finance Tracker

1. Open this page: [Your Finance Tracker](https://www.notion.so/Finance-Tracker-18986edcae2c81b7a212cce615e18010)
2. Click **"•••"** in the top right
3. Select **"Connections"**
4. Click **"Connect to"** and choose **"Finance Dashboard"**

## Step 3: Install and Run

**In VS Code integrated terminal:**

```bash
# Navigate to project
cd ~/Desktop/finance_manager

# Install dependencies
npm install

# Add your API key to .env.local
# Replace "your_notion_integration_token_here" with your actual token

# Start development server
npm start
```

Your dashboard will open at `http://localhost:3000` 🎉

## Step 4: Deploy to Vercel (Optional)

**In VS Code integrated terminal:**

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add NOTION_API_KEY

# Deploy to production
vercel --prod
```

## Troubleshooting

**Can't see data?**
- Check `.env.local` has your real API key
- Verify the integration is connected in Notion
- Look at browser console for errors

**API errors?**
- Use `vercel dev` instead of `npm start` for local function testing
- Check that your Notion databases have data

**Need help?**
- All database IDs are already configured
- Your databases:
  - Incomes: 18986edc-ae2c-81b8-8f77-e19036368d99
  - Expenses: 18986edc-ae2c-815f-b56c-ed1964dccaf5
  - Months: 18986edc-ae2c-81ca-a41c-cde295ea544f
