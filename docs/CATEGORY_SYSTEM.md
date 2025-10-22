# Category Color System

## Semantic Category List (Aligned with Notion)

### Essential Living (Blue/Cyan/Green family)
| Category | Tailwind Color | Notion Color | Use Cases |
|----------|---------------|--------------|-----------|
| **Food & Dining** | `emerald-500` | Green | Groceries, restaurants, takeout, meal delivery |
| **Housing** | `cyan-600` | Orange | Rent, mortgage |
| **Utilities** | `blue-500` | Blue | Power, water, internet, phone |
| **George (Pet Care)** | `amber-500` | Orange | Vet, pet supplies, pet food |

### Health & Personal (Purple/Pink family)
| Category | Tailwind Color | Notion Color | Use Cases |
|----------|---------------|--------------|-----------|
| **Health & Medical** | `purple-500` | Purple | Doctor visits, prescriptions, medical supplies, treatments |
| **Personal Care** | `pink-500` | Pink | Self-care items, personal hygiene, grooming |

### Home & Entertainment (Orange/Pink family)
| Category | Tailwind Color | Notion Color | Use Cases |
|----------|---------------|--------------|-----------|
| **Home & Household** | `orange-500` | Orange | Home supplies, maintenance, household items |
| **Entertainment** | `fuchsia-500` | Pink | Leisure activities (non-subscription) |

### Work & Income (Yellow/Green family)
| Category | Tailwind Color | Notion Color | Use Cases |
|----------|---------------|--------------|-----------|
| **Software & Tech** | `yellow-500` | Yellow | Work tools, tech subscriptions, software |
| **Income** | `green-500` | Green | Money coming in, payments received |

### Administrative (Gray family)
| Category | Tailwind Color | Notion Color | Use Cases |
|----------|---------------|--------------|-----------|
| **Fees & Charges** | `slate-500` | Red | Bank fees, transfer fees, service charges |
| **Uncategorized** | `gray-400` | Gray | Default catch-all for unclassified transactions |

---

## Behavior Markers (Checkboxes)

Use existing Notion properties to mark transaction behavior:

### Subscription Checkbox
- ✓ Netflix → Entertainment + Subscription
- ✓ Claude AI → Software & Tech + Subscription
- ✓ Spotify → Entertainment + Subscription
- ✓ Adobe → Software & Tech + Subscription

### Recurring Bill Checkbox
- ✓ Rent → Housing + Recurring Bill
- ✓ Electric Bill → Utilities + Recurring Bill
- ✓ Internet → Utilities + Recurring Bill

---

## Migration Guide

### Old Category → New Category

| Old | New | Notes |
|-----|-----|-------|
| Food | Food & Dining | No change needed |
| Health | Health & Medical | No change needed |
| Monthly Bills → Streaming | Entertainment + Subscription ✓ | Semantic change |
| Monthly Bills → Rent | Housing + Recurring Bill ✓ | Split into semantic |
| Monthly Bills → Utilities | Utilities + Recurring Bill ✓ | Split into semantic |
| Software | Software & Tech | No change needed |
| Home | Home & Household | No change needed |
| Personal | Personal Care | No change needed |
| George | George (Pet Care) | No change needed |
| Income | Income | No change needed |
| Fees/Transfer Fee/Bank Fees | Fees & Charges | Consolidated |

---

## UI Color Palette

Each category card uses:
- **Background**: 50-shade (e.g., `bg-emerald-50`)
- **Text**: 700-shade (e.g., `text-emerald-700`)
- **Border**: 200-shade (e.g., `border-emerald-200`)

### Progress Bar Colors:
- ✅ **Under 80%**: `bg-emerald-500` (green - on track)
- ⚠️ **80-100%**: `bg-yellow-500` (yellow - warning)
- 🔴 **Over 100%**: `bg-red-500` (red - over budget)

---

## Benefits of This System

### For ADHD/Autism:
✅ **Visual consistency** - Colors match between Notion and app
✅ **Color-coded categories** - Quick visual scanning
✅ **Semantic meaning** - Categories describe WHAT not HOW OFTEN
✅ **Checkbox flexibility** - Easy to filter by behavior (subscriptions, recurring)

### For Budgeting:
✅ **Clear grouping** - Living expenses in blue family, health in purple
✅ **Easy filtering** - "Show me all subscriptions" or "Show me all entertainment"
✅ **Meaningful totals** - "How much do I spend on health?" vs "How much on monthly bills?"

---

## Implementation Files

- `src/components/BudgetScreen.tsx` - Category color mapping (lines 47-75)
- Budget cards automatically apply colors based on category name
- Backward compatible with legacy categories (Monthly Bills, Business, Transport)
