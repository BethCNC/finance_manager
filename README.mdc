# Finance Manager - AI Dashboard

A modern financial management dashboard powered by React, Tailwind CSS, and Notion, with AI-driven insights.

## 🚀 Features

- **Real-time Notion Integration** - Syncs with your Notion Finance Tracker
- **AI-Powered Insights** - Smart recommendations based on spending patterns
- **Modern UI** - Clean, accessible design with black accents
- **Live Updates** - Auto-refreshes every 30 seconds
- **Responsive** - Works on desktop, tablet, and mobile

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Notion account with Finance Tracker setup
- Notion Integration Token

## 🔧 Setup Instructions

### 1. Install Dependencies

In your **VS Code integrated terminal**, run:

```bash
cd ~/Desktop/finance_manager
npm install
```

### 2. Configure Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name it **"Finance Dashboard"**
4. Select your workspace: **7starsdesign**
5. Click **"Submit"**
6. **Copy the "Internal Integration Token"**

### 3. Connect Integration to Your Notion Page

1. Open your Finance Tracker in Notion
2. Click the **"•••"** menu (top right)
3. Go to **"Connections"** → **"Connect to"**
4. Select your **"Finance Dashboard"** integration

### 4. Add API Key to Environment

Edit the `.env.local` file and replace the placeholder:

```bash
NOTION_API_KEY=secret_your_actual_token_here
```

### 5. Run Development Server

In your **VS Code integrated terminal**:

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🌐 Deploy to Vercel

### 1. Install Vercel CLI

In your **macOS terminal**:

```bash
npm i -g vercel
```

### 2. Deploy

In your **VS Code integrated terminal**:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **finance-manager**
- Directory? **./`** (just press Enter)
- Override settings? **N**

### 3. Add Environment Variable

```bash
vercel env add NOTION_API_KEY
```

Paste your Notion token when prompted.

### 4. Deploy to Production

```bash
vercel --prod
```

## 📊 Notion Database Structure

Your Finance Tracker uses these databases:

- **Incomes** (ID: `18986edc-ae2c-81b8-8f77-e19036368d99`)
  - Name, Amount, Date, Months

- **Expenses** (ID: `18986edc-ae2c-815f-b56c-ed1964dccaf5`)
  - Name, Amount, Date, Months

- **Months** (ID: `18986edc-ae2c-81ca-a41c-cde295ea544f`)
  - Aggregates with rollups and formulas

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Vercel Serverless Functions
- **Data Source**: Notion API
- **Deployment**: Vercel

## 📁 Project Structure

```
finance_manager/
├── api/
│   └── notion.ts           # Vercel API endpoint
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── FinancialDashboard.tsx
│   ├── hooks/
│   │   └── useFinanceData.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── .env.local              # Environment variables
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔄 How It Works

1. **API Layer** (`api/notion.ts`) fetches data from your Notion databases
2. **React Hook** (`useFinanceData.ts`) manages state and API calls
3. **Dashboard Component** displays transactions and metrics
4. **Auto-refresh** keeps data in sync every 30 seconds

## 🎨 Customization

### Update Colors

Edit `tailwind.config.js` to change the color scheme.

### Modify Refresh Rate

In `useFinanceData.ts`, change the interval (default: 30000ms):

```typescript
const interval = setInterval(fetchData, 30000); // 30 seconds
```

### Add Categories

Extend the Notion databases with a "Category" field, then update the API mapping in `api/notion.ts`.

## 🐛 Troubleshooting

### "Failed to fetch data from Notion"

- Check your `.env.local` file has the correct API key
- Verify the integration is connected to your Notion page
- Ensure database IDs match your Notion setup

### API Not Working Locally

- Vercel Functions only work in production by default
- Use `vercel dev` for local development with functions:

```bash
vercel dev
```

### Styling Issues

- Run `npm install` to ensure Tailwind is installed
- Check `tailwind.config.js` includes the correct content paths

## 📝 Next Steps

- [ ] Add transaction creation form
- [ ] Implement AI chatbot with Claude API
- [ ] Add budget tracking visualization
- [ ] Create monthly reports export
- [ ] Add expense categories from Notion

## 📄 License

MIT - Feel free to use this for your personal finance tracking!
