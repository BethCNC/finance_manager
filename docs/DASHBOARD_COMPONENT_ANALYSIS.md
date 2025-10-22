# Dashboard Component Analysis

> **Source:** Figma Design - Family Finance Manager
> **Node ID:** 31:5698 (dashboard / mobile)
> **Dimensions:** 430×1958px
> **Last Updated:** 2025-10-10

## Overview

The mobile dashboard is the primary screen of the Family Finance Manager app. It displays account balances, budget progress, savings goals, and AI-powered insights in a scrollable mobile layout.

## Screen Structure

### 1. Header Component (430×53px)
```
header/
├── Logo (24×24px)
├── Page Title: "Dashboard" (text-2xl)
└── Menu Icon (lucide, 24×24px)
```

**Tokens Required:**
- `--space-4` (16px) - padding
- `--text-2xl` (24px) - title size
- `--primary-solid` - logo/text color

---

### 2. Content Area (430×1741px)

#### 2.1 Accounts Section (382×334px)

**Structure:**
```
section/
├── H2: "Accounts" (text-4xl, 36px)
└── Grid: 2×2 cards
    ├── Bryan Checking ...8182 ($1212.42)
    ├── Bryan Checking ...8182 ($1212.42)
    ├── Beth Checking ...2763 ($1212.42)
    └── Beth Apple Cash ($1212.42)
```

**Account Balance Card** (185×131px)
- Account name (text-base, 16px)
- Account type (text-base, 16px)
- Balance amount (text-3xl, 30px bold)
- Detail text (text-sm, 14px)
- Chevron icon (lucide, 24×24px)

**Tokens Used:**
- `--radius-2xl` (20px) - card border radius
- `--space-6` (24px) - card padding
- `--shadow-sm` - card shadow
- `--bg-default` (white) - card background
- `--fg-default` - text color
- `--fg-text` - secondary text

---

#### 2.2 Monthly Budget Section (382×866px)

**Structure:**
```
section/
├── H2: "Monthly Budget" (text-4xl, 36px)
└── Stack: 10 progress bars
    ├── Mortgage
    ├── Utilities
    ├── Home Reno
    ├── George
    ├── Food
    ├── Auto
    ├── Entertainment
    ├── Health
    ├── Software
    └── Personal
```

**Budget Progress Bar** (382×59px)

**Top Row** (382×19px):
- Category icon (18×18px)
- Category name (text-base, 16px)
- Budget text: "$85 of $150" (text-sm, 14px)

**Progress Bar** (382×16px):
- Container: full width, rounded
- Fill: gradient, width based on percentage
- Height: 16px

**Budget Detail** (382×16px):
- Percentage: "56%" (text-sm, 14px)
- Alert icons: 3× status indicators (16×16px)
  - Success (green check)
  - Warning (yellow alert)
  - Alert (red exclamation)
- Remaining: "$65 left" (text-sm, 14px)

**Tokens Used:**
- Category colors: `--category-{name}-active`
- `--radius-full` (9999px) - progress bar rounded
- `--space-3` (12px) - vertical spacing
- Alert colors: `--success-solid`, `--warning-solid`, `--alert-solid`

---

#### 2.3 Savings Goals Section (382×191px)

**Structure:**
```
section/
├── H2: "Savings Goals" (text-4xl, 36px)
└── Grid: 3 goal cards
    ├── Emergency Fund (75%)
    ├── Emergency Fund (75%)
    └── Emergency Fund (75%)
```

**Goal Card** (119×131px)
- Circular progress (72×72px)
  - Base circle (stroke)
  - Progress arc (gradient stroke)
  - Percentage text (text-2xl, 24px center)
- Goal name: "Emergency Fund" (text-sm, 14px)

**Tokens Used:**
- `--radius-full` - circular progress
- `--success-solid` - on-track color (green)
- `--warning-solid` - approaching limit (yellow)
- `--alert-solid` - over budget (red/pink)
- `--space-2` (8px) - gap between circle and text

---

#### 2.4 Smart Insights Section (382×196px)

**Structure:**
```
section/
├── H2: "Smart Insights" (text-4xl, 36px)
└── Stack: 3 insight cards
    ├── Card 1 (334×62px)
    ├── Card 2 (334×62px)
    └── Card 3 (382×44px - full width)
```

**Insight Card**
- Icon (lucide, 24×24px) - lightbulb or sparkles
- Text: "Your subscriptions rose 12%. Want to see why?" (text-sm, 14px)
- Background: subtle with hover state
- Padding: `--space-4` (16px)

**Tokens Used:**
- `--radius-xl` (16px) - card border radius
- `--primary-bg-subtle` - card background
- `--primary-bg-hover` - hover state
- `--space-3` (12px) - gap between icon and text

---

#### 2.5 Action Buttons (382×58px)

**Structure:**
```
buttons/
├── Button 1 (111×58px)
├── Button 2 (111×58px)
└── Button 3 (111×58px)
```

**Button Component** (111×58px)
- Leading icon (lucide, 18×18px)
- Text: "Button" (text-xl, 20px bold)
- Trailing icon (lucide, 18×18px)
- Variants: solid, ghost, outline, surface, color

**Tokens Used:**
- `--radius-xl` (16px) - button border radius
- `--space-3` + `--space-6` - padding (12px 24px)
- `--primary-solid` - default button bg
- `--primary-on-primary` - button text color

---

### 3. Bottom Navigation (430×92px)

**Structure:**
```
navbar/
├── Nav Item 1: Home (86×92px)
├── Nav Item 2: Transactions (86×92px)
├── Nav Item 3: Budget (86×92px)
├── Nav Item 4: Advisor (86×92px)
└── Nav Item 5: Settings (86×92px)
```

**Nav Item** (86×92px)
- Icon container (64×42px)
  - State layer (42×42px circular)
  - Icon (lucide, 24×24px)
- Label text (text-xs, 12px)

**States:**
- Default: `--fg-text` (gray)
- Active: `--primary-solid` (dark)
- Hover: `--primary-bg-hover` (subtle background)

**Tokens Used:**
- `--radius-full` - state layer
- `--space-2` (8px) - gap between icon and label
- Material Design 3 state layers

---

## Component Dependency Tree

```
Dashboard Screen
├── Header
│   ├── Logo (primitive)
│   ├── Text (primitive)
│   └── Icon (primitive)
├── Section (layout primitive)
│   └── Heading (Text variant)
├── Account Balance Card
│   ├── Text (name, type, balance)
│   └── Icon (chevron)
├── Budget Progress Bar
│   ├── Category Icon (primitive)
│   ├── Text (category, amounts)
│   ├── Progress Bar (primitive)
│   └── Alert Icons (primitive)
├── Goal Card
│   ├── Circular Progress (primitive)
│   └── Text (label)
├── Insight Card
│   ├── Icon (primitive)
│   └── Text (message)
├── Button
│   ├── Icon (leading)
│   ├── Text
│   └── Icon (trailing)
└── Bottom Navigation
    └── Nav Item
        ├── Icon (with state layer)
        └── Text (label)
```

---

## Primitives Needed (Build Order)

### Phase 1 - Foundation (M1)
**Goal:** Build basic primitives with token-only styling

1. **Text Component**
   - Variants: h1, h2, h3, h4, body, label, caption
   - Uses: `--text-*` size tokens, `--font-sans` (Figtree)
   - States: default, muted, contrast

2. **Icon Component**
   - Wrapper for lucide-react icons
   - Sizes: xs (16px), sm (18px), md (24px), lg (32px)
   - Uses: `--space-*` tokens for sizing

3. **Stack/Grid Component**
   - Layout primitives using `--space-*` gaps
   - Responsive: mobile (1 col) → desktop (2-4 cols)

### Phase 2 - Interactive (M2)
**Goal:** Build stateful components with a11y

4. **Button Component**
   - Variants: solid, ghost, outline, surface, color
   - States: default, hover, focus-visible, active, disabled
   - Icon support: leading, trailing, icon-only
   - Uses: `--primary-*`, `--radius-xl`, `--space-*`

5. **Progress Bar Component**
   - Linear: horizontal bar with gradient fill
   - Circular: donut chart with percentage
   - Uses: category color tokens, `--radius-full`

6. **Alert Icon Component**
   - 3 types: success, warning, alert
   - Uses: `--success-solid`, `--warning-solid`, `--alert-solid`

### Phase 3 - Composite (M3)
**Goal:** Combine primitives into cards

7. **Account Balance Card**
   - Composition: Text + Icon
   - Responsive: 2-col mobile → 4-col desktop

8. **Budget Progress Bar**
   - Composition: Icon + Text + Progress + Alert Icons
   - Category color mapping

9. **Goal Card**
   - Composition: Circular Progress + Text
   - 3-col grid layout

10. **Insight Card**
    - Composition: Icon + Text
    - Hover state with subtle background

11. **Nav Item**
    - Composition: Icon + Text + State Layer
    - Active state management

### Phase 4 - Layout (M4)
**Goal:** Assemble dashboard from components

12. **Section Component**
    - Heading + content spacing
    - Consistent margins using `--space-*`

13. **Dashboard Screen**
    - Header + scrollable content + bottom nav
    - Mobile-first responsive layout

---

## Design Tokens Reference

### Colors by Section

**Accounts:**
- Card background: `--bg-default` (white)
- Text primary: `--fg-default` (near black)
- Text secondary: `--fg-text` (gray)
- Border: `--primary-border` (light gray)

**Budget Progress:**
- Mortgage: `--category-mortgage-active` (red)
- Utilities: `--category-utilities-active` (orange)
- Home Reno: `--category-home-active` (yellow)
- George: `--category-george-active` (lime)
- Food: `--category-food-active` (emerald)
- Auto: `--category-auto-active` (cyan)
- Entertainment: `--category-entertainment-active` (blue)
- Health: `--category-health-active` (purple)
- Software: `--category-software-active` (fuchsia)
- Personal: `--category-personal-active` (pink)

**Savings Goals:**
- On track: `--success-solid` (green)
- Warning: `--warning-solid` (amber)
- Over budget: `--alert-solid` (red)

**Smart Insights:**
- Background: `--primary-bg-subtle`
- Hover: `--primary-bg-hover`
- Text: `--fg-default`

**Navigation:**
- Default: `--fg-text` (gray)
- Active: `--primary-solid` (dark)
- State layer: `--overlay-dark-100`

### Spacing Scale

```
--space-1:  4px   (0.25rem)
--space-2:  8px   (0.5rem)
--space-3:  12px  (0.75rem)
--space-4:  16px  (1rem)
--space-5:  20px  (1.25rem)
--space-6:  24px  (1.5rem)
--space-8:  32px  (2rem)
--space-10: 40px  (2.5rem)
--space-12: 48px  (3rem)
```

### Typography Scale

```
--text-xs:   12px  (0.75rem)   - Nav labels, captions
--text-sm:   14px  (0.875rem)  - Budget details, card metadata
--text-base: 16px  (1rem)      - Body text, category names
--text-lg:   18px  (1.125rem)  - Subheadings
--text-xl:   20px  (1.25rem)   - Button text
--text-2xl:  24px  (1.5rem)    - Page title, progress percentage
--text-3xl:  30px  (1.875rem)  - Balance amounts
--text-4xl:  36px  (2.25rem)   - Section headings (h2)
```

### Border Radius

```
--radius-md:   8px    - Small elements
--radius-lg:   12px   - Medium elements
--radius-xl:   16px   - Cards, buttons
--radius-2xl:  20px   - Large cards
--radius-full: 9999px - Circular elements, pills
```

---

## Implementation Checklist

### M0: Tokens (✅ Complete)
- [x] Design tokens extracted to CSS
- [x] Figtree font configured
- [x] Category colors mapped
- [x] Lucide icons installed

### M1: Phase A - HTML/CSS Primitives
- [ ] Text component with variants
- [ ] Icon wrapper component
- [ ] Stack/Grid layout primitives
- [ ] Specimens page for primitives

### M2: Phase B - Tailwind Mapping
- [ ] Extend Tailwind theme with tokens
- [ ] Button component (5 variants × 3 states)
- [ ] Progress components (linear + circular)
- [ ] Alert icon component

### M3: Phase C - React Components
- [ ] Account Balance Card
- [ ] Budget Progress Bar
- [ ] Goal Card (with circular progress)
- [ ] Insight Card
- [ ] Nav Item
- [ ] A11y testing (keyboard, contrast, ARIA)

### M4: Dashboard Assembly
- [ ] Section wrapper component
- [ ] Header component
- [ ] Bottom Navigation
- [ ] Responsive layout (mobile → desktop)
- [ ] Connect to Notion API data

---

## Data Integration

### API Endpoints Needed

1. **Accounts** (`/api/notion?type=accounts`)
   ```typescript
   {
     accounts: [
       {
         name: "Bryan",
         type: "Checking ...8182",
         balance: 1212.42,
         change: 120
       }
     ]
   }
   ```

2. **Budget Progress** (`/api/notion?type=budget&year=2025&month=10`)
   ```typescript
   {
     categories: [
       {
         name: "Mortgage",
         icon: "home",
         spent: 85,
         budget: 150,
         percentage: 56,
         alerts: ["success", "warning", "alert"]
       }
     ]
   }
   ```

3. **Savings Goals** (`/api/notion?type=goals`)
   ```typescript
   {
     goals: [
       {
         name: "Emergency Fund",
         current: 7500,
         target: 10000,
         percentage: 75
       }
     ]
   }
   ```

4. **Smart Insights** (`/api/notion?type=insights`)
   ```typescript
   {
     insights: [
       {
         icon: "lightbulb",
         message: "Your subscriptions rose 12%. Want to see why?"
       }
     ]
   }
   ```

---

## Accessibility Requirements

### Keyboard Navigation
- Tab order: Header → Content sections → Bottom Nav
- Focus-visible rings on all interactive elements
- Skip links for screen readers

### ARIA Labels
- Account cards: `aria-label="Bryan Checking account ending 8182, balance $1212.42"`
- Progress bars: `role="progressbar" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100"`
- Nav items: `aria-current="page"` for active state

### Color Contrast
- Text on white: AA standard (4.5:1 minimum)
- Category colors: tested for readability
- Focus rings: high contrast border

---

## Next Steps

1. **Review this document** - Confirm component breakdown matches your vision
2. **Choose starting primitive** - Text, Icon, or Button?
3. **Begin Phase A or B** - HTML/CSS or Tailwind first?
4. **Set up specimens page** - Where to showcase components during development

**Questions:**
- Do you want to build primitives in isolation first, or start with a complete card?
- Should we use Tailwind from the start (Phase B) or learn CSS variables first (Phase A)?
- Which section of the dashboard is most important to get right first?
