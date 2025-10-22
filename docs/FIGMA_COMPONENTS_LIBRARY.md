# Figma Components Library

> Extracted from Family Finance Manager Figma File
> Total Components: 1,804 (171 UI components + 1,633 icons)

## 📦 Component Categories

### 🔘 Buttons (15 variants)

#### States: Default, Hover, Active
- **Solid** - Primary action button
- **Ghost** - Transparent background
- **Color** - Accent colored
- **Surface** - Subtle background
- **Outline** - Border only

### 🎴 Cards (18 types)

#### Account Cards
- `account-card` - Base account card component
- `account balance card = bryan acct 2721`
- `account balance card = beth acct 2763`
- `account balance card = bryan acct 8182`
- `account balance card = beth apple cash`

#### Data Cards
- `style=transaction card` - Transaction list item
- `style=insight card` - AI advisor insights
- `style=goals card` - Savings goals
- `style=balance - pie chart` - Balance with pie visualization
- `style=double chart` - Dual chart display
- `style=title - subtitle - chart` - Chart with headers
- `budget card` - Budget category card
- `Budget summary card` - Overall budget summary
- `advisor card` - AI advisor recommendations

#### Transaction Cards
- `card=income, state=default`
- `card=income, state=hover`
- `card=spent, state=default`
- `card=spent, state=hover`

### 🏷️ Chips - Category Filters (32 variants)

#### 11 Categories × 3 States (default, hover, active)
1. **Auto** - Transportation/vehicle expenses
2. **Entertainment** (also "Fun") - Leisure activities
3. **Fees** - Bank fees, service charges
4. **Food** - Groceries, dining
5. **George** - Personal category (custom)
6. **Health** - Medical, healthcare
7. **Home** (also "Home Renovations") - Housing expenses
8. **Mortgage** - Home loan payments
9. **Personal** - Personal care, misc
10. **Software** - Technology, subscriptions
11. **Utilities** - Bills, services

### 🧭 Navigation (2 components)

- **sidebar** - Desktop side navigation (256px width)
- **navbar** - Mobile bottom navigation

### 📝 Forms & Inputs (3 components)

- `select-menu` - Dropdown selector
- `open=On` - Dropdown opened state
- `open=Off` - Dropdown closed state

### 📊 Charts (7 types)

- `chart=line` - Line chart
- `chart=bar` - Standard bar chart
- `chart=bar long` - Horizontal bar chart
- `chart=bar tall` - Vertical bar chart
- `chart=pie` - Pie/donut chart
- `chart=stacked horizontal bar chart` - Stacked bars

### 🎨 Category Icons (Icon + Circle styles)

Each category has 2 visual styles:
- **Icon style** - Icon only
- **Circle style** - Icon in circular badge

Categories:
- Auto
- Entertainment
- Fees
- Food
- George
- Health
- Home Reno/Renovations
- Mortgage
- Personal
- Software
- Utilities

### ⚠️ Status Indicators (9 variants)

#### Alert Status
- `status=alert, state=default`
- `status=alert, state=active`

#### Success Status
- `status=success, state=default`
- `status=success, state=active`

#### Warning Status
- `status=warning, state=default`
- `status=warning, state=active`

### 🔄 Progress Circles (15 variants)

Circle completion states (0%, 25%, 50%, 75%, 100%) with color variants:
- **Default** (neutral)
- **Green** (on track)
- **Pink** (over budget)

Examples:
- `circle=0, blue=Default` - Empty state
- `circle=50, blue=green` - 50% complete, on track
- `circle=100, blue=pink` - Complete, over budget

### 🎭 Interactive States

General component states used across multiple components:
- `state=Default` - Initial state
- `state=hover` - Mouse hover
- `state=active` - Selected/active
- `state=focus` - Keyboard focus
- `state=inactive` - Disabled state

### 🏢 Logo Variants (3 types)

- `logo=full` - Logo with text
- `logo=text-only` - Text only
- `logo=symbol` - Icon only

### 📱 Responsive Variants

- `size=mobile` - Mobile optimized (430px)
- `size=desktop` - Desktop optimized (1440px)

### 🎨 Button Icon Configurations

Buttons with various icon placements:
- `leading-icon=on` - Icon before text
- `leading-icon=off` - No leading icon
- `trailing-icon=on` - Icon after text
- `trailing-icon=off` - No trailing icon

Combinations:
- `state=default, leading-icon=off` - Text only
- `state=default, leading-icon=on` - Icon + text
- `state=default, leading icon=off, trailing icon=on` - Text + icon
- etc.

### 🎯 Button Variants by Type

#### Primary Variants
- `variant=primary, type=solid` - Filled background
- `variant=primary, type=soft` - Subtle background
- `variant=primary, type=ghost` - Transparent
- `variant=primary, type=outline` - Border only
- `variant=primary, type=surface` - Surface tint

## 🏗️ Component Architecture

### Atomic Design Structure

```
Atoms (Base Components)
├── Buttons (15 variants)
├── Icons (1,633 Lucide icons)
├── Chips (32 category chips)
└── Status Indicators (9 variants)

Molecules (Combined Components)
├── Cards (18 types)
├── Charts (7 types)
├── Category Icons (22 variants)
└── Progress Circles (15 variants)

Organisms (Complex Components)
├── Navigation (sidebar, navbar)
├── Forms (select menus)
└── Account Cards (5 specific instances)

Templates (Screen Layouts)
├── Dashboard
├── Transactions
├── Budget
└── Advisor
```

## 🎨 Component Naming Convention

The Figma components follow these patterns:

1. **Variant-based**: `button=solid, state=hover`
2. **Style-based**: `style=transaction card`
3. **Category-based**: `chip=Personal, state=active`
4. **Instance-based**: `account balance card = bryan acct 2721`
5. **Property-based**: `circle=75, blue=green`

## 🚀 Implementation Mapping

### React Component Structure

```typescript
// Button Component
<Button
  variant="solid" | "ghost" | "color" | "surface" | "outline"
  state="Default" | "hover" | "active"
  leadingIcon={IconComponent}
  trailingIcon={IconComponent}
/>

// Chip Component
<CategoryChip
  category="Auto" | "Food" | "Health" | ... (11 categories)
  state="default" | "hover" | "active"
/>

// Card Component
<Card
  type="transaction" | "insight" | "goals" | "budget"
  data={cardData}
/>

// Category Icon
<CategoryIcon
  category="Auto" | "Food" | ... (11 categories)
  style="icon" | "circle"
/>

// Progress Circle
<ProgressCircle
  percentage={0 | 25 | 50 | 75 | 100}
  color="default" | "green" | "pink"
/>
```

## 📋 Component Checklist

### High Priority (MVP)
- [x] Design tokens extracted
- [ ] Button component (5 variants)
- [ ] Account card
- [ ] Transaction card
- [ ] Navbar (mobile)
- [ ] Sidebar (desktop)
- [ ] Category chips (11 types)

### Medium Priority
- [ ] Budget cards
- [ ] Advisor cards
- [ ] Select dropdown
- [ ] Status indicators
- [ ] Category icons

### Low Priority
- [ ] Charts (7 types)
- [ ] Progress circles
- [ ] Logo variants
- [ ] All state combinations

## 📊 Usage Statistics

- **Total Components**: 1,804
- **UI Components**: 171
- **Icon Library**: 1,633 (Lucide icons)
- **Button Variants**: 15
- **Card Types**: 18
- **Chip Variants**: 32
- **Chart Types**: 7
- **Category Icons**: 22

## 🎯 Next Steps

1. **Component Development Priority**:
   - Start with buttons (most reused)
   - Build card components
   - Implement navigation
   - Add chips for filtering

2. **Icon Integration**:
   - Install Lucide React: `npm install lucide-react`
   - All icons are from Lucide library
   - 1,633 icons available

3. **State Management**:
   - Implement hover/active states with CSS
   - Use Tailwind variants for state changes
   - Category colors from design tokens

4. **Responsive Design**:
   - Mobile components (430px)
   - Desktop components (1440px)
   - Breakpoint at 1024px
