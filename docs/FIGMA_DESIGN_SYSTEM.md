# Family Finance Manager - Figma Design System

> Extracted from Figma file: [Family Finance Manager](https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=15-127&m=dev)
> Last Updated: October 10, 2025

## 📱 Screens Overview

### Mobile Screens (430px width)
1. **Dashboard / Mobile** (430x1958px)
   - Account balances overview (4 cards)
   - Monthly budget progress (10 categories)
   - Savings goals
   - Quick action buttons

2. **Transactions / Mobile** (430x1152px)
   - Spending summary cards
   - Category chip navigation
   - Scrollable transaction list

3. **Budget / Mobile** (430x1808px)
   - Month selector dropdown
   - Budget summary card with donut chart
   - Budget alerts
   - Category breakdown cards
   - Upcoming charges

4. **Advisor / Mobile** (430x1784px)
   - AI-powered smart insights
   - "Ask me anything" prompts
   - Financial health score
   - Chat input

### Desktop Screens (1440px width)
1. **Dashboard / Desktop** (1440x1613px)
   - Sidebar navigation (256px)
   - Same components as mobile, optimized layout
   - 4-column account cards grid

## 🎨 Design Tokens

All design tokens have been extracted to `/src/styles/figma-design-tokens.css`

### Color System

#### Primary Colors
```css
--primary-solid: rgb(18, 19, 28)
--primary-bg: rgb(239, 240, 246)
--primary-text: rgb(97, 99, 115)
```

#### Background & Foreground
```css
--bg-default: rgb(255, 255, 255)
--bg-subtle: rgb(249, 249, 251)
--fg-default: rgb(10, 10, 10)
--fg-text: rgb(82, 82, 82)
```

#### Status Colors
- **Success**: Green scale (rgb(40, 167, 69))
- **Warning**: Amber scale (rgb(245, 158, 11))
- **Alert/Error**: Red scale (rgb(229, 77, 46))

#### Category Colors (Active States)
- Auto: `rgb(34, 211, 238)` - Cyan
- Entertainment: `rgb(96, 165, 250)` - Blue
- Fees: `rgb(148, 163, 184)` - Slate
- Food: `rgb(52, 211, 153)` - Emerald
- George: `rgb(163, 230, 53)` - Lime
- Health: `rgb(167, 139, 250)` - Purple
- Home: `rgb(250, 204, 21)` - Yellow
- Mortgage: `rgb(248, 113, 113)` - Red
- Personal: `rgb(244, 114, 182)` - Pink
- Software: `rgb(232, 121, 249)` - Fuchsia
- Utilities: `rgb(251, 146, 60)` - Orange

#### Brand Colors
- **Beth**: Purple scale `rgb(232, 121, 249)`
- **Bryan**: Blue scale `rgb(147, 197, 253)`

### Typography

#### Font Sizes
```css
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
... up to 9xl (128px)
```

#### Font Weights
- Thin: 100
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Black: 900

### Spacing (8px Grid)
```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
... up to --space-24: 96px
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 20px
--radius-3xl: 24px
--radius-full: 9999px
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05)
--shadow: 0 1px 3px 0 rgba(0,0,0,0.1)
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25)
```

## 🧩 Components

### Navigation
1. **Navbar (Bottom Navigation)** - Mobile
   - 5 navigation items with icons
   - Active/hover states
   - Material Design 3 state layers

2. **Sidebar** - Desktop (256px width)
   - Logo at top
   - 5 navigation items
   - Collapsed/expanded states

### Cards

#### Account Balance Card
- **Size**: 382x131px (mobile), 211x131px (desktop)
- **Contains**:
  - Account name (text-base/medium)
  - Balance amount (text-5xl/bold)
  - Details row with icon

#### Budget Progress Bar
- **Structure**:
  - Top row: Category icon + name, budget amount
  - Progress bar with gradient fill
  - Budget detail: spent/remaining, percentage, alert icons

#### Transaction Card
- **Size**: Flexible width, 37px height
- **Structure**:
  - Merchant name (text-base/semibold)
  - Price (text-lg/bold, right-aligned)
  - Category & date (text-sm, muted)

#### Advisor Card (Smart Insights)
- Icon button (collapsible)
- Label (text-lg/semibold)
- Insight text (text-sm)

### Inputs

#### Select Dropdown
- Height: 44px
- Rounded corners (--radius-md)
- Chevron icon on right
- Month/year selection

#### Chat Input
- Height: 43px
- Text input with send button
- Rounded pill shape (--radius-full)

### Buttons

#### Primary Button
```css
background: var(--primary-solid)
color: var(--fg-on-primary)
border-radius: var(--radius-xl)
padding: var(--space-3) var(--space-6)
font-weight: var(--font-semibold)
```

#### Icon Button
- Size: 42x42px
- State layer for hover/active
- Circular (--radius-full)

### Chips (Category Navigation)
- Horizontal scrollable
- Active/inactive states
- Category color coding
- Border radius: --radius-full

## 📐 Layout Patterns

### Mobile Layout (430px)
- **Padding**: 24px horizontal
- **Content width**: 382px
- **Section spacing**: 32px vertical
- **Card gap**: 16px

### Desktop Layout (1440px)
- **Sidebar**: 256px fixed
- **Content area**: 1156px
- **Max content width**: 1060px
- **Grid columns**: 4 for account cards
- **Section spacing**: 48px vertical

## 🎯 Component Hierarchy

```
Dashboard Screen
├── Header
│   ├── Logo
│   ├── Page Title
│   └── Menu Button (Mobile) / User Menu (Desktop)
├── Navigation (Bottom on Mobile, Sidebar on Desktop)
└── Content
    ├── Accounts Section
    │   └── 4x Account Balance Cards
    ├── Monthly Budget Section
    │   ├── Section Title
    │   └── 10x Budget Progress Bars
    ├── Savings Goals Section
    │   └── 3x Goal Cards
    └── Quick Actions
        └── 3x Action Buttons
```

## 🚀 Implementation Guide

### Step 1: Import Design Tokens
```tsx
import '../styles/figma-design-tokens.css';
```

### Step 2: Use CSS Variables in Components
```tsx
// Example: Account Balance Card
<div className="bg-white rounded-2xl p-6 shadow-sm"
     style={{
       borderRadius: 'var(--radius-2xl)',
       boxShadow: 'var(--shadow-sm)'
     }}>
  <p className="text-sm" style={{color: 'var(--fg-text)'}}>
    {accountName}
  </p>
  <h3 className="text-5xl font-bold"
      style={{color: 'var(--fg-default)'}}>
    ${balance}
  </h3>
</div>
```

### Step 3: Category Color Mapping
```tsx
const categoryColors = {
  'Auto': 'var(--category-auto-active)',
  'Entertainment': 'var(--category-entertainment-active)',
  'Food': 'var(--category-food-active)',
  'George': 'var(--category-george-active)',
  'Health': 'var(--category-health-active)',
  'Home': 'var(--category-home-active)',
  'Mortgage': 'var(--category-mortgage-active)',
  'Personal': 'var(--category-personal-active)',
  'Software': 'var(--category-software-active)',
  'Utilities': 'var(--category-utilities-active)',
  'Fees': 'var(--category-fees-active)'
};
```

### Step 4: Responsive Breakpoints
```css
/* Mobile first */
@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop - Show sidebar */
  .mobile-nav { display: none; }
  .desktop-sidebar { display: block; }
}
```

## 📝 Key Design Decisions

1. **Mobile-First Design**: Base screens are 430px (iPhone 14 Pro Max width)
2. **8px Grid System**: All spacing uses multiples of 8px
3. **Material Design 3**: State layers for interactive elements
4. **Category Color Coding**: Each budget category has unique color
5. **Consistent Border Radius**: Cards use 20-24px radius for modern look
6. **Typography Scale**: Uses Tailwind-inspired scale (xs to 9xl)
7. **Shadow System**: Subtle shadows for depth (sm, md, lg, xl, 2xl)

## 🔄 Next Steps

1. ✅ Design tokens extracted
2. ⏳ Update Tailwind config with custom colors
3. ⏳ Build component library matching Figma
4. ⏳ Implement responsive layouts
5. ⏳ Add animations and transitions
6. ⏳ Connect to Notion API data

## 📦 Component Priority

### High Priority (MVP)
1. Navigation (Navbar + Sidebar)
2. Account Balance Card
3. Budget Progress Bar
4. Transaction Card

### Medium Priority
5. Header Component
6. Select Dropdown
7. Button variants
8. Chip Navigation

### Low Priority
9. Advisor Cards
10. Charts (Donut, Bar)
11. Chat Input
12. Alert Cards
