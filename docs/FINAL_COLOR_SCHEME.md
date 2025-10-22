# Final Category Color Scheme (Tailwind 300)

## Color Palette Mapping

### Housing & Utilities Family (Red → Orange → Yellow)
| Category | Base Color | Background | Text | Border | Accent |
|----------|-----------|------------|------|--------|--------|
| **Mortgage** | Red/300 | `bg-red-50` | `text-red-900` | `border-red-300` | `bg-red-300` |
| **Utilities** | Orange/300 | `bg-orange-50` | `text-orange-900` | `border-orange-300` | `bg-orange-300` |
| **Home & Household** | Yellow/300 | `bg-yellow-50` | `text-yellow-900` | `border-yellow-300` | `bg-yellow-300` |

### Living Expenses Family (Lime → Emerald → Cyan)
| Category | Base Color | Background | Text | Border | Accent |
|----------|-----------|------------|------|--------|--------|
| **George (Pet)** | Lime/300 | `bg-lime-50` | `text-lime-900` | `border-lime-300` | `bg-lime-300` |
| **Food** | Emerald/300 | `bg-emerald-50` | `text-emerald-900` | `border-emerald-300` | `bg-emerald-300` |
| **Auto/Transport** | Cyan/300 | `bg-cyan-50` | `text-cyan-900` | `border-cyan-300` | `bg-cyan-300` |

### Entertainment & Personal Family (Blue → Violet → Fuchsia → Pink)
| Category | Base Color | Background | Text | Border | Accent |
|----------|-----------|------------|------|--------|--------|
| **Entertainment** | Blue/300 | `bg-blue-50` | `text-blue-900` | `border-blue-300` | `bg-blue-300` |
| **Health** | Violet/300 | `bg-violet-50` | `text-violet-900` | `border-violet-300` | `bg-violet-300` |
| **Software** | Fuchsia/300 | `bg-fuchsia-50` | `text-fuchsia-900` | `border-fuchsia-300` | `bg-fuchsia-300` |
| **Personal** | Pink/300 | `bg-pink-50` | `text-pink-900` | `border-pink-300` | `bg-pink-300` |

### Administrative (Neutral/Slate)
| Category | Base Color | Background | Text | Border | Accent |
|----------|-----------|------------|------|--------|--------|
| **Fees** | Slate/300 | `bg-slate-50` | `text-slate-900` | `border-slate-300` | `bg-slate-300` |
| **Uncategorized** | Neutral/950 | `bg-neutral-50` | `text-neutral-900` | `border-neutral-300` | `bg-neutral-300` |

---

## Visual Hierarchy

### Color Intensity Guide:
- **50 shade** = Light background (e.g., `bg-red-50`)
- **300 shade** = Border and accent color (e.g., `border-red-300`)
- **900 shade** = Dark text for maximum contrast (e.g., `text-red-900`)

### Example Card Structure:
```tsx
<div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
  <h3 className="text-red-900 font-bold">Mortgage</h3>
  <div className="bg-red-300 h-3 rounded-full"></div> {/* Progress bar */}
</div>
```

---

## Color Logic by Category Type

### Essential Bills (Warm colors - Red/Orange/Yellow)
🔴 **Red** - Mortgage (most critical, fixed)
🟠 **Orange** - Utilities (essential, variable)
🟡 **Yellow** - Home & Household (necessary, flexible)

### Daily Living (Green spectrum - Lime/Emerald/Cyan)
🟢 **Lime** - George/Pet (responsibility, care)
💚 **Emerald** - Food (daily essential)
🩵 **Cyan** - Auto/Transport (mobility)

### Lifestyle & Self (Cool colors - Blue/Violet/Fuchsia/Pink)
🔵 **Blue** - Entertainment (leisure)
🟣 **Violet** - Health (wellness)
🩷 **Fuchsia** - Software (tools)
🌸 **Pink** - Personal Care (self-care)

### Other (Neutral)
⚪ **Slate** - Fees (administrative)
⚫ **Neutral** - Uncategorized (default)

---

## Accessibility Features

### High Contrast:
- ✅ 50-shade backgrounds with 900-shade text = excellent readability
- ✅ 300-shade borders provide clear visual boundaries
- ✅ Color + text labels (not color alone) for accessibility

### ADHD/Autism Friendly:
- ✅ Consistent color families (grouped by similarity)
- ✅ Logical progression (warm to cool)
- ✅ Visual consistency across app and Notion
- ✅ Clear visual scanning patterns

---

## Implementation

### React Component (BudgetScreen.tsx)
```tsx
const CATEGORY_COLORS = {
  'Mortgage': {
    bg: 'bg-red-50',
    text: 'text-red-900',
    border: 'border-red-300',
    accent: 'bg-red-300'
  },
  // ... other categories
};

const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Uncategorized'];
};

// Usage in component:
const colors = getCategoryColor(category);
<div className={`${colors.bg} ${colors.border} border-2`}>
  <h3 className={colors.text}>{category}</h3>
</div>
```

---

## Quick Reference Table

| Category | Color Chip | Tailwind Base |
|----------|-----------|---------------|
| Mortgage | 🔴 | red-300 |
| Utilities | 🟠 | orange-300 |
| Home | 🟡 | yellow-300 |
| George | 🟢 | lime-300 |
| Food | 💚 | emerald-300 |
| Auto | 🩵 | cyan-300 |
| Entertainment | 🔵 | blue-300 |
| Health | 🟣 | violet-300 |
| Software | 🩷 | fuchsia-300 |
| Personal | 🌸 | pink-300 |
| Fees | ⚪ | slate-300 |
| Uncategorized | ⚫ | neutral-950 |

---

## Files Updated

- ✅ `src/components/BudgetScreen.tsx` (lines 47-89)
- ✅ Color mapping includes accent color for progress bars
- ✅ Backward compatible with legacy categories
- ✅ Build successful

## Testing

View your budget at: `http://localhost:3001` → **Budget** tab

Each category card will now display with:
- Color-coded background (50 shade)
- Bold text (900 shade)
- Border (300 shade)
- Progress bar accent (300 shade)
