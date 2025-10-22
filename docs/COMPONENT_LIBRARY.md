# Finance Manager Component Library

**Based on:** Figma - Family Finance Manager
**Status:** 📋 Implementation Roadmap
**Last Updated:** 2025-10-13

---

## Component Inventory

From your Figma design file, here are all 23 components that need to be created:

### ✅ Existing Components (5)

1. **Button** - `src/components/Button.tsx` ✅
2. **Header** - Implemented in `src/App.tsx` (AppLayout) ✅
3. **Navbar** - `src/components/BottomNav.tsx` ✅
4. **Sidebar** - `src/components/MenuDrawer.tsx` ✅
5. **Card** - Used throughout (inline implementations) ⚠️ Needs standardization

### 🚧 Components to Create (18)

#### Form Components (4)
6. **Input** - Text input with validation states
7. **Select** - Dropdown select menu
8. **Select Menu** - Dropdown menu component
9. **Select Menu Item** - Individual menu items

#### Navigation Components (2)
10. **Nav Item** - Navigation link component
11. **Sidebar Item** - Sidebar menu item
12. **Tab** - Tab navigation component

#### Card Components (4)
13. **Alert Card** - Warning/error/info cards
14. **Question Card** - FAQ or help cards
15. **Spent Cards** - Expense summary cards
16. **Budget Card Item** - Budget line item card

#### Icon & Visual Components (5)
17. **Icon Button** - Circular icon buttons
18. **Category Icons** - Category-specific icons
19. **Alert Circle Icons** - Status icons
20. **Chip** - Small badge/tag component
21. **Logo** - App logo component

#### Progress Components (3)
22. **Circle Progress** - Circular progress indicator
23. **Account Progress Bar** - Linear progress with account info

---

## Component Specifications

### 1. Button ✅

**Location:** `src/components/Button.tsx`

**Variants:**
- Primary (black background)
- Secondary (gray background)
- Bryan (blue theme)
- Beth (pink theme)
- Outline
- Ghost

**Sizes:** sm, md, lg

### 2. Input 🚧

**To Create:** `src/components/ui/Input.tsx`

**Variants:**
- Default
- Error state
- Success state
- Disabled

```tsx
interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

**Design Specs:**
- Border radius: `rounded-xl` (12px)
- Padding: `px-4 py-3`
- Background: `bg-gray-50`
- Border: `border border-gray-200`
- Focus: `focus:border-black focus:outline-none`
- Error: `border-alert-border bg-alert-bg-subtle`

### 3. Select 🚧

**To Create:** `src/components/ui/Select.tsx`

**Features:**
- Dropdown menu
- Keyboard navigation
- Search filter
- Multi-select option

```tsx
interface SelectProps {
  options: Array<{value: string, label: string}>;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
}
```

**Design Specs:**
- Same styling as Input
- Dropdown: `rounded-2xl shadow-lg border border-gray-200`
- Max height: `max-h-60 overflow-y-auto`

### 4. Select Menu & Menu Item 🚧

**To Create:**
- `src/components/ui/SelectMenu.tsx`
- `src/components/ui/MenuItem.tsx`

**Features:**
- Context menu / dropdown
- Icon support
- Dividers
- Keyboard shortcuts

### 5. Alert Card 🚧

**To Create:** `src/components/ui/AlertCard.tsx`

**Variants:**
- Success (green)
- Warning (yellow)
- Alert/Error (red)
- Info (blue)

```tsx
interface AlertCardProps {
  type: 'success' | 'warning' | 'alert' | 'info';
  title?: string;
  message: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}
```

**Design Specs:**
```tsx
// Success
<div className="bg-success-bg-subtle border border-success-border rounded-2xl p-4">
  <div className="flex items-start gap-3">
    <CheckCircle className="text-success-solid" size={20} />
    <div>
      <h4 className="text-sm font-semibold text-success-text">Success!</h4>
      <p className="text-sm text-gray-700">Transaction saved successfully.</p>
    </div>
  </div>
</div>
```

### 6. Chip 🚧

**To Create:** `src/components/ui/Chip.tsx`

**Variants:**
- Default
- Category (with color)
- Status (active/inactive)
- Removable (with X)

```tsx
interface ChipProps {
  label: string;
  category?: string; // Uses category colors
  onRemove?: () => void;
  icon?: React.ReactNode;
}
```

**Design Specs:**
```tsx
<span className="inline-flex items-center gap-1 bg-category-food text-white px-3 py-1 rounded-full text-xs font-medium">
  Food & Dining
  {onRemove && <X size={12} className="cursor-pointer" />}
</span>
```

### 7. Circle Progress 🚧

**To Create:** `src/components/ui/CircleProgress.tsx`

**Features:**
- SVG-based circular progress
- Percentage display
- Color variants
- Size variants (sm, md, lg)

```tsx
interface CircleProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
}
```

**Design Specs:**
- Small: 40px diameter
- Medium: 60px diameter
- Large: 80px diameter
- Stroke width: 4px
- Background: `stroke-gray-200`
- Progress: `stroke-emerald-500` (or custom)

### 8. Account Progress Bar 🚧

**To Create:** `src/components/ui/AccountProgressBar.tsx`

**Features:**
- Account name
- Current amount / Total amount
- Linear progress bar
- Percentage label

```tsx
interface AccountProgressBarProps {
  accountName: string;
  current: number;
  total: number;
  color?: string;
}
```

**Design Specs:**
```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-black">Checking Account</p>
    <p className="text-xs text-gray-500">$2,450 / $3,000</p>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '82%'}} />
  </div>
</div>
```

### 9. Budget Card Item 🚧

**To Create:** `src/components/ui/BudgetCardItem.tsx`

**Features:**
- Category icon
- Category name
- Budgeted amount
- Spent amount
- Progress bar
- Color-coded by category

```tsx
interface BudgetCardItemProps {
  category: string;
  budgeted: number;
  spent: number;
  icon?: React.ReactNode;
}
```

**Design Specs:**
```tsx
<div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-black transition-all">
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-category-food flex items-center justify-center">
        <UtensilsIcon className="text-white" size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-black">Food & Dining</p>
        <p className="text-xs text-gray-500">$450 budgeted</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-black">${spent}</p>
      <p className="text-xs text-emerald-600">${budgeted - spent} left</p>
    </div>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-category-food h-2 rounded-full transition-all"
      style={{width: `${(spent / budgeted) * 100}%`}}
    />
  </div>
</div>
```

### 10. Spent Cards 🚧

**To Create:** `src/components/ui/SpentCard.tsx`

**Features:**
- Category summary
- Total spent this month
- Comparison to last month
- Trend indicator

```tsx
interface SpentCardProps {
  category: string;
  spent: number;
  previousMonth?: number;
  icon?: React.ReactNode;
}
```

### 11. Icon Button 🚧

**To Create:** `src/components/ui/IconButton.tsx`

**Variants:**
- Default (gray)
- Primary (black)
- Ghost (transparent)

**Sizes:** sm, md, lg

```tsx
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

**Design Specs:**
```tsx
// Default
<button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
  <Menu size={20} className="text-gray-700" />
</button>

// Primary
<button className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
  <Plus size={20} className="text-white" />
</button>
```

### 12. Category Icons 🚧

**To Create:** `src/components/ui/CategoryIcon.tsx`

**Categories:**
- Mortgage (Home icon)
- Utilities (Zap icon)
- Home (House icon)
- George (User icon)
- Food (Utensils icon)
- Auto (Car icon)
- Entertainment (Film icon)
- Health (Heart icon)
- Software (Code icon)
- Personal (User icon)
- Fees (DollarSign icon)

```tsx
interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
}
```

### 13. Logo 🚧

**To Create:** `src/components/ui/Logo.tsx`

**Variants:**
- Full logo (icon + text)
- Icon only
- Text only

**Sizes:** sm, md, lg

### 14. Nav Item 🚧

**To Create:** `src/components/ui/NavItem.tsx`

**Features:**
- Icon + label
- Active state
- Badge/counter
- Hover effect

```tsx
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}
```

### 15. Tab 🚧

**To Create:** `src/components/ui/Tab.tsx` & `src/components/ui/Tabs.tsx`

**Features:**
- Horizontal tabs
- Active indicator
- Keyboard navigation

```tsx
interface TabsProps {
  tabs: Array<{label: string, value: string}>;
  value: string;
  onChange: (value: string) => void;
}
```

**Design Specs:**
```tsx
<div className="flex gap-2 border-b border-gray-200">
  <button className="px-4 py-2 text-sm font-medium border-b-2 border-black text-black">
    Overview
  </button>
  <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-black">
    Transactions
  </button>
</div>
```

### 16. Question Card 🚧

**To Create:** `src/components/ui/QuestionCard.tsx`

**Features:**
- Collapsible FAQ item
- Question + Answer
- Icon indicator

```tsx
interface QuestionCardProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}
```

### 17. Alert Circle Icons 🚧

**To Create:** `src/components/ui/AlertIcon.tsx`

**Variants:**
- Success (CheckCircle - green)
- Warning (AlertTriangle - yellow)
- Error (XCircle - red)
- Info (Info - blue)

---

## Implementation Priority

### Phase 1: Core Form Components (Week 1)
1. ✅ Button (already done)
2. 🚧 Input
3. 🚧 Select & Select Menu
4. 🚧 Icon Button
5. 🚧 Chip

### Phase 2: Card Components (Week 2)
6. 🚧 Alert Card
7. 🚧 Budget Card Item
8. 🚧 Spent Card
9. 🚧 Question Card

### Phase 3: Progress & Visual (Week 3)
10. 🚧 Circle Progress
11. 🚧 Account Progress Bar
12. 🚧 Category Icons
13. 🚧 Alert Circle Icons
14. 🚧 Logo

### Phase 4: Navigation (Week 4)
15. 🚧 Nav Item (refactor existing)
16. 🚧 Sidebar Item (refactor existing)
17. 🚧 Tab
18. ✅ Header (already done)
19. ✅ Navbar (already done)
20. ✅ Sidebar (already done)

---

## Design System Alignment

All components should follow these principles:

### Colors
- Use design system colors from `tailwind.config.js`
- Category colors for budget items
- Bryan/Beth themes for personal sections
- Semantic colors (success, warning, alert)

### Typography
- Figtree font family
- Font sizes: text-xs to text-3xl
- Font weights: regular, medium, semibold, bold

### Spacing
- Consistent padding: p-3, p-4, p-6
- Gaps: gap-2, gap-3, gap-4
- Card padding: p-5 or p-6

### Borders
- Border radius: rounded-xl (buttons), rounded-2xl (cards)
- Border color: border-gray-200 default
- Border width: border (1px)

### Hover States
- Transitions: transition-all or transition-colors
- Hover colors: hover:border-black, hover:bg-gray-50
- Cursor: cursor-pointer for interactive elements

### Accessibility
- Focus states: focus:outline-none focus:ring-2 focus:ring-black
- ARIA labels for icon buttons
- Keyboard navigation support
- Color contrast ratios (WCAG AA minimum)

---

## Component Structure

Organize components in this structure:

```
src/
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx          ✅
│   │   ├── Input.tsx           🚧
│   │   ├── Select.tsx          🚧
│   │   ├── SelectMenu.tsx      🚧
│   │   ├── MenuItem.tsx        🚧
│   │   ├── IconButton.tsx      🚧
│   │   ├── Chip.tsx            🚧
│   │   ├── AlertCard.tsx       🚧
│   │   ├── BudgetCardItem.tsx  🚧
│   │   ├── SpentCard.tsx       🚧
│   │   ├── QuestionCard.tsx    🚧
│   │   ├── CircleProgress.tsx  🚧
│   │   ├── AccountProgressBar.tsx 🚧
│   │   ├── CategoryIcon.tsx    🚧
│   │   ├── AlertIcon.tsx       🚧
│   │   ├── Logo.tsx            🚧
│   │   ├── NavItem.tsx         🚧
│   │   ├── SidebarItem.tsx     🚧
│   │   ├── Tab.tsx             🚧
│   │   └── Tabs.tsx            🚧
│   ├── BottomNav.tsx           ✅
│   ├── MenuDrawer.tsx          ✅
│   ├── FinancialDashboard.tsx  ✅
│   └── BudgetScreen.tsx        ✅
```

---

## Next Steps

1. **Review this component list** - Confirm all components match your Figma design
2. **Prioritize components** - Which ones are most critical for your MVP?
3. **Create components incrementally** - Start with Phase 1 (form components)
4. **Test each component** - Create stories/showcase pages
5. **Document usage** - Add examples to component files

Would you like me to start creating any specific components from this list?
