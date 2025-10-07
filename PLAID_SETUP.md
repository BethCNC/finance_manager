# Plaid Integration Setup Guide

## ✅ What's Been Built

1. **API Endpoint** (`/api/plaid.js`) - Handles all Plaid operations
2. **React Component** (`PlaidConnect.tsx`) - UI for connecting banks and importing transactions
3. **Dashboard Integration** - Added "Connect Bank" tab to sidebar
4. **Auto-sync to Notion** - Batch import Plaid transactions → Notion Transactions database

---

## 🔧 Setup Steps (What You Need to Do)

### Step 1: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id_here
PLAID_SECRET=your_plaid_secret_here
PLAID_ENV=sandbox  # or 'development' or 'production'

# After connecting your bank, you'll get this token
PLAID_ACCESS_TOKEN=  # Leave empty initially
```

**Where to find your Plaid credentials:**
1. Go to https://dashboard.plaid.com/
2. Sign in to your Plaid account
3. Go to **Keys** section
4. Copy your `client_id` and `secret` (sandbox or development)

### Step 2: Configure Notion Database

Your Transactions database needs these properties (should already exist):
- ✅ **Description** (title)
- ✅ **Amount** (number)
- ✅ **Date** (date)
- ✅ **Type** (select) - with options "Credit" and "Debit"
- ✅ **Category** (select)

**Optional**: Add an "Account" select property to track which bank account each transaction came from.

### Step 3: Add Plaid to Vercel Environment Variables

If deploying to Vercel:

```bash
vercel env add PLAID_CLIENT_ID
vercel env add PLAID_SECRET
vercel env add PLAID_ENV
vercel env add PLAID_ACCESS_TOKEN
```

---

## 🚀 How to Use

### First-Time Setup (Connecting Your Bank)

1. **Start the app**:
   ```bash
   vercel dev
   ```

2. **Navigate to "Connect Bank"** tab in the sidebar

3. **Click "Connect Bank Account"**
   - Creates a link token
   - Opens Plaid Link UI

4. **Click "Open Plaid Link"**
   - Plaid modal will appear
   - Search for your bank (e.g., "SECU")
   - Enter your credentials
   - Select accounts to link

5. **Copy the access token**
   - After successful connection, you'll see a message:
     ```
     Connected! Save this to your .env:
     PLAID_ACCESS_TOKEN=access-sandbox-xxxx-yyyy-zzzz
     ```
   - Copy that token to your `.env.local` file
   - Restart `vercel dev`

### Daily Usage (Importing Transactions)

Once you have `PLAID_ACCESS_TOKEN` set:

1. **Click "Fetch Accounts"**
   - Shows all connected bank accounts with balances

2. **Click "Fetch Transactions (30d)"**
   - Retrieves last 30 days of transactions from Plaid
   - Displays them in the UI

3. **Click "Sync to Notion"**
   - Imports all transactions into your Notion Transactions database
   - Creates one page per transaction
   - Maps Plaid data → Notion properties:
     - `merchant_name` or `name` → Description
     - `amount` → Amount (absolute value)
     - `date` → Date
     - Positive amount → "Debit" (money out)
     - Negative amount → "Credit" (money in)
     - `category[0]` → Category

---

## 📊 API Endpoints Reference

All endpoints: `/api/plaid?action={action}`

### 1. Create Link Token
```
POST /api/plaid?action=create_link_token
```
Returns `link_token` for Plaid Link UI.

### 2. Exchange Public Token
```
POST /api/plaid?action=exchange_public_token
Body: {
  "public_token": "public-sandbox-xxx"
}
```
Returns permanent `access_token` (save this to .env).

### 3. Get Accounts
```
GET /api/plaid?action=accounts
```
Returns all connected bank accounts with balances.

### 4. Get Transactions
```
GET /api/plaid?action=transactions&start_date=2025-10-01&end_date=2025-10-07
```
Returns transactions for date range (defaults to last 30 days).

### 5. Sync to Notion
```
POST /api/plaid?action=sync_to_notion
Body: {
  "start_date": "2025-10-01",
  "end_date": "2025-10-07",
  "account_filter": "optional_account_id"
}
```
Batch imports Plaid transactions → Notion.

---

## 🎯 Transaction Mapping

### Plaid → Notion

| Plaid Field | Notion Property | Notes |
|------------|----------------|-------|
| `merchant_name` or `name` | Description (title) | Transaction description |
| `amount` | Amount (number) | Absolute value (always positive) |
| `date` | Date (date) | Transaction date |
| amount > 0 | Type = "Debit" | Money out |
| amount < 0 | Type = "Credit" | Money in |
| `category[0]` | Category (select) | Primary category |

### Plaid Amount Convention
⚠️ **Important**: Plaid uses opposite sign convention:
- **Positive amount** = money OUT (debit)
- **Negative amount** = money IN (credit)

Our sync converts this to your Notion convention (Type select: Credit/Debit).

---

## 🔐 Security Notes

### Current Setup (Single-User)
- Access token stored in `.env.local` (not committed to git)
- ✅ Good for personal use
- ⚠️ **Do NOT commit** `.env.local` to git

### For Production (Multi-User)
If you want to support multiple users:
1. Store access tokens in encrypted database (use Vercel KV or Firestore with encryption)
2. Add user authentication (JWT, Auth0, etc.)
3. Associate each access token with a user ID
4. Implement webhook verification for real-time updates

---

## 🐛 Troubleshooting

### "PLAID_ACCESS_TOKEN not set"
**Solution**: Make sure you:
1. Connected your bank via Plaid Link
2. Copied the access token from success message
3. Added it to `.env.local`
4. Restarted `vercel dev`

### "Failed to create link token"
**Solution**: Check your Plaid credentials in `.env.local`:
- `PLAID_CLIENT_ID` - correct client ID from dashboard
- `PLAID_SECRET` - correct secret for your environment
- `PLAID_ENV` - matches your credentials (sandbox/development/production)

### "Transaction sync failed"
**Solutions**:
- Verify Notion database ID: `Transactions_database_id` in `.env.local`
- Check Notion integration has access to the database
- Verify property names match (Description, Amount, Date, Type, Category)

### Plaid Link doesn't open
**Solution**: Check browser console for errors. Common issues:
- Link token expired (tokens expire in 30 minutes)
- Click "Connect Bank Account" again to get a fresh token

---

## 📁 Files Created

```
api/plaid.js                          # Plaid API serverless function
src/components/PlaidConnect.tsx       # React UI component
src/components/FinancialDashboard.tsx # Updated with Plaid tab
PLAID_SETUP.md                        # This guide
```

---

## 🎓 Next Steps (Optional Enhancements)

1. **Automatic Sync Webhook**
   - Set up Plaid webhook endpoint
   - Auto-import new transactions as they post

2. **Duplicate Detection**
   - Check if transaction already exists in Notion before creating
   - Match by Plaid transaction_id

3. **Category Mapping**
   - Create custom mapping: Plaid categories → Your Notion categories
   - Use AI to refine categorization

4. **Multiple Accounts**
   - Support connecting multiple banks
   - Add "Account" property to track source

5. **Historical Import**
   - Add date range picker in UI
   - Import transactions from specific date range (up to 2 years)

---

## 📝 Environment Variables Checklist

```bash
# Notion (existing)
✅ NOTION_API_KEY=secret_xxx
✅ Transactions_database_id=82fc50e5b6b343a5a2ad1904f47404c0

# Plaid (new - add these)
⬜ PLAID_CLIENT_ID=your_client_id
⬜ PLAID_SECRET=your_secret
⬜ PLAID_ENV=sandbox
⬜ PLAID_ACCESS_TOKEN=  # Get this after connecting bank
```

---

## ✅ Testing Checklist

After setup, test these in order:

1. ⬜ Click "Connect Bank Account" → See "Ready to connect" message
2. ⬜ Click "Open Plaid Link" → Plaid modal opens
3. ⬜ Search for bank → Find it in Plaid's list
4. ⬜ Enter credentials → Successfully authenticate
5. ⬜ See success message with access token → Copy to `.env.local`
6. ⬜ Restart vercel dev → Token loaded
7. ⬜ Click "Fetch Accounts" → See your bank accounts with balances
8. ⬜ Click "Fetch Transactions" → See last 30 days transactions
9. ⬜ Click "Sync to Notion" → Transactions appear in Notion database
10. ⬜ Check Notion → Verify transactions imported correctly

---

## 🆘 Need Help?

**Plaid Dashboard**: https://dashboard.plaid.com/
**Plaid Docs**: https://plaid.com/docs/
**Notion API**: https://developers.notion.com/

**Common Plaid Sandbox Test Credentials**:
- Username: `user_good`
- Password: `pass_good`
- MFA: `1234`
