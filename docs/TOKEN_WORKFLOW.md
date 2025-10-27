# Token-First Workflow Guide

## 🎯 Overview

Your design system uses **`tokens.json`** as the Single Source of Truth (SSOT). All tokens are managed in Figma using Token Studio, exported to `tokens.json`, and automatically transformed into CSS variables and Tailwind config.

## 📁 File Structure

```
finance_manager/
├── tokens.json                    # ← SSOT: Figma Token Studio export
├── scripts/
│   └── transform-tokens.js        # Token transformation script
├── src/
│   ├── tokens.css                 # ← Generated: CSS variables
│   ├── tokens.tailwind.json       # ← Generated: Tailwind theme config
│   └── globals.css                # Imports tokens.css
├── tailwind.config.js             # Uses tokens.tailwind.json
└── docs/
    ├── TOKENS.md                  # ← Generated: Token reference
    └── TOKEN_WORKFLOW.md          # ← This guide
```

## 🔄 The Token Pipeline

```
┌─────────────────┐
│  Figma Design   │
│  Token Studio   │
└────────┬────────┘
         │ Export
         ▼
┌─────────────────┐
│  tokens.json    │ ◄── SSOT (Single Source of Truth)
└────────┬────────┘
         │ npm run tokens:build
         ▼
┌─────────────────────────────────────┐
│  scripts/transform-tokens.js        │
│  • Resolves token references        │
│  • Generates CSS variables          │
│  • Creates Tailwind config           │
└────────┬────────────────────────────┘
         │
         ├──────────────────┬──────────────────┐
         ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ tokens.css   │   │ tokens.      │   │  TOKENS.md   │
│ (CSS vars)   │   │ tailwind.json│   │  (docs)      │
└──────┬───────┘   └──────┬───────┘   └──────────────┘
       │                  │
       ▼                  ▼
┌─────────────┐   ┌──────────────────┐
│ globals.css │   │ tailwind.config  │
│ @import     │   │ require()        │
└─────────────┘   └──────────────────┘
       │                  │
       └────────┬─────────┘
                ▼
       ┌────────────────┐
       │  Components    │
       │  Use semantic  │
       │  token classes │
       └────────────────┘
```

## 🚀 Daily Workflow

### When Updating Tokens in Figma

1. **Edit in Figma Token Studio**
   - Update colors, spacing, typography, etc.
   - Use semantic naming: `Brand/primary/bg`, `Brand/fg/text`

2. **Export from Token Studio**
   - Export as JSON
   - Replace `tokens.json` in your project root

3. **Regenerate Tokens**
   ```bash
   npm run tokens:build
   ```

4. **Verify Changes**
   - Check `src/tokens.css` for new CSS variables
   - Check `src/tokens.tailwind.json` for Tailwind mappings
   - Review `docs/TOKENS.md` for documentation

5. **Test Components**
   ```bash
   npm start
   ```

### When Building Components

**✅ DO:**
```tsx
// Use semantic token classes from Tailwind
<button className="bg-bg-bg-solid text-fg-text-inverse hover:bg-bg-bg-solid-hover">
  Button
</button>
```

**❌ DON'T:**
```tsx
// Never use hardcoded hex values
<button className="bg-[#1E293B] text-[#FAFAFA]">
  Button
</button>
```

## 📚 Available Token Categories

### Brand Colors
```
bg-*            → Background colors
fg-*            → Foreground/text colors
primary-*       → Primary brand colors
secondary-*     → Secondary brand colors
success-*       → Success state colors
warning-*       → Warning state colors
error-*         → Error state colors
disabled-*      → Disabled state colors
overlays-*      → Overlay/backdrop colors
```

### Semantic Bank Colors
```
bank-secu-*         → SECU brand colors
bank-cash-app-*     → Cash App brand colors
bank-apple-cash-*   → Apple Cash brand colors
```

### Data Visualization Colors
```
data-default-*  → Default data viz colors
data-active-*   → Active/hover data viz colors
```

### Dimensions
```
spacing-*       → Spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, etc.)
borderRadius-*  → Border radius scale (sm, md, lg, xl, 2xl, 3xl, 4xl)
borderWidth-*   → Border width scale
sizing-*        → Size scale
```

## 🎨 Token Naming Convention

### Structure
```
{Category}/{Group}/{Property}/{State}
```

### Examples
- `Brand/primary/bg-subtle` → Light background
- `Brand/primary/bg` → Default background
- `Brand/primary/bg-hover` → Hover state background
- `Brand/primary/bg-active` → Active/pressed state background
- `Brand/fg/text` → Default text color
- `Brand/fg/text-contrast` → High contrast text

### In CSS Variables
```css
--brand-primary-bg-subtle
--brand-primary-bg
--brand-primary-bg-hover
--brand-fg-text
```

### In Tailwind Classes
```html
bg-primary-bg-subtle
bg-primary-bg
hover:bg-primary-bg-hover
text-fg-text
```

## 🔧 NPM Scripts

```bash
# Build tokens once
npm run tokens:build

# Build tokens automatically on change (requires nodemon)
npm run tokens:watch

# Build app (automatically runs tokens:build first)
npm run build

# Start dev server
npm start
```

## 📖 Token Reference

See [`TOKENS.md`](./TOKENS.md) for the complete auto-generated token reference with:
- Token counts by type
- All available color tokens
- Spacing scale
- Usage examples in CSS and Tailwind

## 🚨 Important Rules

### 1. Never Edit Generated Files
- ❌ Don't edit `src/tokens.css`
- ❌ Don't edit `src/tokens.tailwind.json`  
- ❌ Don't edit `docs/TOKENS.md`
- ✅ Always edit `tokens.json` and run `npm run tokens:build`

### 2. Token-Only Components
- All component styling must use semantic tokens
- No hardcoded hex values (`#1E293B`)
- No hardcoded pixel values for spacing (`12px`)
- Use Tailwind classes that reference tokens

### 3. Keep 4pt Grid
- Spacing follows 4pt increments (4, 8, 12, 16, 20, 24, etc.)
- Borders can be 1px (exception to 4pt rule)
- Use spacing tokens: `p-4`, `gap-2`, `space-y-3`

### 4. Semantic Over Visual
```tsx
// ✅ Good: Semantic naming
className="bg-primary-bg text-fg-text"

// ❌ Bad: Visual naming
className="bg-blue-200 text-gray-700"
```

## 🐛 Troubleshooting

### Tokens Not Updating in Browser?

1. **Rebuild tokens:**
   ```bash
   npm run tokens:build
   ```

2. **Clear React cache:**
   ```bash
   rm -rf node_modules/.cache
   npm start
   ```

3. **Check browser DevTools:**
   - Inspect element
   - Check computed styles
   - Verify CSS variable values

### Token References Not Resolving?

The transform script automatically resolves token references like `{Blue.50}` by looking in `Tailwind Colors`. If you see warnings:

```bash
⚠️  Could not resolve token reference: {SomeColor.500}
```

Check that:
1. The color exists in `tokens.json`
2. It's in the correct section (`Tailwind Colors`, `Brand`, etc.)
3. The reference path is correct

### Tailwind Not Recognizing Token Classes?

1. **Check tailwind.config.js:**
   ```javascript
   const tokenConfig = require('./src/tokens.tailwind.json');
   
   module.exports = {
     theme: {
       extend: {
         colors: {
           ...tokenConfig.colors,
         },
         spacing: {
           ...tokenConfig.spacing,
         },
         // ...
       }
     }
   };
   ```

2. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

## 💡 Best Practices

### 1. Start with Tokens
Before styling a component:
1. Check which semantic tokens apply
2. Use existing tokens rather than creating new ones
3. If you need a new token, add it in Figma Token Studio first

### 2. Component Token Pattern
```tsx
// Button.tsx - Good example
const variantStyles = {
  solid: `
    bg-bg-bg-solid text-fg-text-inverse
    hover:bg-bg-bg-solid-hover
    active:bg-bg-bg-solid-active
  `,
  outline: `
    bg-transparent text-fg-text
    border border-fg-text
    hover:text-primary-solid hover:border-primary-solid
  `
};
```

### 3. State Management with Tokens
```tsx
// ✅ All states use tokens
<button className="
  bg-primary-bg
  hover:bg-primary-bg-hover
  active:bg-primary-bg-active
  disabled:bg-disabled-disabled
  focus:ring-primary-border
">
```

### 4. Responsive with Tokens
```tsx
// ✅ Responsive spacing using tokens
<div className="p-4 md:p-6 lg:p-8">
```

## 🎯 Next Steps

1. **Audit Remaining Components**
   - [ ] BottomNav.tsx
   - [ ] MenuDrawer.tsx
   - [ ] FinancialDashboard.tsx
   - [ ] BudgetScreen.tsx
   - [ ] Card.tsx
   - [ ] Others...

2. **Update Typography Utilities**
   - Convert hardcoded `font-size` in `globals.css`
   - Reference CSS variables instead

3. **Add Dark Mode**
   - Create dark mode tokens in Figma
   - Add dark mode variants to CSS variables
   - Use Tailwind dark mode utilities

4. **Document Component APIs**
   - Create component specimen pages
   - Document which tokens each component uses
   - Show all variants and states

## 📞 Support

**Token Reference:** [`docs/TOKENS.md`](./TOKENS.md)  
**Component Examples:** `/specimens/button`, `/specimens/text`, `/specimens/color`  
**Figma File:** [Link to your Figma file]

---

**Last Updated:** 2025-10-22  
**Status:** ✅ Active  
**SSOT:** `tokens.json` (exported from Figma Token Studio)

