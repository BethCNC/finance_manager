# Figma Component Extraction Report

**Source:** [Family Finance Manager - Components Page](https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=15-126&m=dev)  
**Extracted:** 2025-10-22  
**Total Components Found:** 24+ component families

---

## 📋 Component Inventory

### ✅ **Already Built in Codebase**

1. **Button** (Figma node: `307:9476`)
   - ✅ Built: `src/components/Button.tsx`
   - ✅ Migrated to semantic tokens
   - **Variants:** solid (default), color, surface, outline, ghost
   - **States:** default, hover, focus, active
   - **Additional:** warning, success, destructive variants
   - **Props:** leadingIcon, trailingIcon, disabled, fullWidth
   - **Semantic Tokens Used:**
     - `bg-bg-bg-solid`, `text-fg-text-inverse`
     - `bg-primary-bg`, `text-fg-text`
     - `border-fg-border`, `hover:bg-bg-bg-hover`

---

### 🚧 **Need to Build - Primitives**

2. **Icon Button** (Figma node: `358:11092`)
   - ⏳ Status: Not built
   - **Variants:** Same as Button (default, color, surface, outline, ghost) + warning, success, destructive
   - **States:** default, hover, focus, active
   - **Size:** 42px × 42px
   - **Semantic Tokens:**
     - Same as Button component
   - **Props:** `variant`, `icon`, `disabled`, `ariaLabel`

3. **Input** (Figma node: `307:10091`)
   - ⏳ Status: Not built
   - **States:** inactive, active, hover
   - **Size:** 160px × 44px
   - **Semantic Tokens:**
     - `border-fg-border-strong`
     - `text-fg-text`
     - `rounded-3xl` (24px radius)
     - `px-4`, `py-3`, `gap-2`
   - **Props:** `value`, `onChange`, `placeholder`, `leadingIcon`, `disabled`

4. **Chip** (Figma node: `307:10863`)
   - ⏳ Status: Not built
   - **Categories:** Mortgage, Utilities, Home, George, Food, Auto, Fun, Entertainment, Health, Software, Personal, Fees
   - **States:** default, hover, active
   - **Size:** 75px × 32px
   - **Semantic Tokens:**
     - `bg-data-default-mortgage`, `bg-data-default-food`, etc.
     - `bg-data-active-mortgage`, `bg-data-active-food`, etc.
     - `text-fg-text-contrast`
     - `rounded-md`, `p-2`
   - **Props:** `category`, `label`, `active`, `onClick`

5. **Separator** (Figma node: `362:21432`)
   - ⏳ Status: Not built
   - **Sizes:** 1px, 1.5px, 2px, 3px
   - **Semantic Tokens:**
     - `border-fg-line`
   - **Props:** `size`

6. **Switch** (Figma node: `347:6979`)
   - ⏳ Status: Not built
   - **Styles:** default, primary, secondary, success, warning, error, inverse
   - **States:** default, hover, active
   - **Size:** 32px × 18px
   - **Semantic Tokens:**
     - Style-specific (primary, secondary, success, warning, error tokens)
   - **Props:** `checked`, `onChange`, `variant`, `disabled`

7. **Radio** (Figma node: `347:7053`)
   - ⏳ Status: Not built
   - **Styles:** default, primary, secondary, success, warning, error, inverse
   - **States:** default, hover, active
   - **Size:** 18px × 18px
   - **Semantic Tokens:**
     - Style-specific tokens
   - **Props:** `checked`, `onChange`, `variant`, `disabled`, `name`

8. **Avatar** (Figma node: `307:11041`)
   - ⏳ Status: Not built
   - **Styles:** initials, placeholder, beth, beth-active, beth-color, bryan, bryan-active, bryan-color
   - **Sizes:** 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px
   - **Semantic Tokens:**
     - `bg-secondary-solid` (Beth)
     - `bg-primary-solid` (Bryan)
     - Person-specific colors
   - **Props:** `size`, `style`, `initials`, `src`

---

### 🚧 **Need to Build - Navigation**

9. **Tabs** (Figma node: `307:9464`)
   - ⏳ Status: Not built
   - **Styles:** neutral, color, outline, outline-color
   - **States:** default, hover, focus, active
   - **Components:** Tab Trigger (individual tab) + Tabs (container)
   - **Semantic Tokens:**
     - Varies by style (neutral, color, outline)
   - **Props:** `tabs`, `activeTab`, `onTabChange`

10. **Nav Bar** (Figma node: `307:9606`)
    - ⏳ Status: Partially built (`BottomNav.tsx` exists)
    - **States:** default, hover, focus, active
    - **Size:** 430px × 92px (desktop), mobile variants
    - **Semantic Tokens:**
      - Navigation-specific tokens
    - **Props:** `items`, `activeRoute`

11. **Sidebar** (Figma node: `307:9878`)
    - ⏳ Status: Partially built (`MenuDrawer.tsx` exists)
    - **Components:** Sidebar container + Sidebar Item
    - **States:** default, hover, active (for items)
    - **Size:** 277px × 900px
    - **Semantic Tokens:**
      - Similar to Nav items
    - **Props:** `items`, `activeRoute`, `isOpen`, `onClose`

---

### 🚧 **Need to Build - Form Components**

12. **Select Menu** (Figma node: `307:9923`)
    - ⏳ Status: Not built
    - **States:** open/closed
    - **Components:** Select trigger + Select Menu + Select Menu Item
    - **Select Menu Item States:** default, hover, active
    - **Options:** with/without leading icon, with/without trailing icon
    - **Size:** 219px × 45px (trigger), 184px × 578px (menu)
    - **Semantic Tokens:**
      - `border-fg-border-strong`
      - `bg-bg-default-bg`
    - **Props:** `options`, `value`, `onChange`, `placeholder`

13. **Calendar** (Figma node: `358:11404`)
    - ⏳ Status: Not built
    - **Types:** Single day select, Multiple day select, Dual calendar
    - **Components:** Calendar Head, Calendar Week, Calendar Day
    - **Day States:** day, day-today, single-day-selected, day-range-beginning, day-range-end, day-range-middle, disabled, day-outside
    - **Size:** 276px × 305px (single), 553px × 349px (dual)
    - **Semantic Tokens:**
      - Date-specific tokens
    - **Props:** `selectedDate`, `onDateChange`, `mode`, `minDate`, `maxDate`

---

### 🚧 **Need to Build - Data Visualization**

14. **Progress Bar - Categories** (Figma node: `362:17345`)
    - ⏳ Status: Not built
    - **Categories:** Personal, Software, Health, Entertainment, Auto, Food, George, Home, Utilities, Mortgage
    - **Size:** 382px × 61px per bar
    - **Semantic Tokens:**
      - `bg-data-default-personal`, `bg-data-default-software`, etc.
      - Progress bars use category colors
    - **Props:** `category`, `label`, `amount`, `percentage`, `budget`

15. **Circle Progress** (Figma node: `307:10555`)
    - ⏳ Status: Not built
    - **Variants:** Default (blue), green, pink
    - **Progress:** 0%, 25%, 50%, 75%, 100%
    - **Size:** 72px × 72px
    - **Semantic Tokens:**
      - Color variant specific
    - **Props:** `percentage`, `color`, `size`

16. **Balance - Pie Chart** (Figma node: `316:142226`)
    - ⏳ Status: Not built (may be using Recharts)
    - **States:** default, state2
    - **Size:** 387px × 410px
    - **Semantic Tokens:**
      - Data visualization colors
    - **Props:** `data`, `categories`

17. **Double Chart** (Figma node: `316:142246`)
    - ⏳ Status: Not built
    - **Orientations:** vertical, horizontal
    - **States:** default, hover
    - **Size:** Vertical: 292px × 394px, Horizontal: 480px × 274px
    - **Semantic Tokens:**
      - Chart-specific colors
    - **Props:** `data`, `orientation`, `categories`

---

### 🚧 **Need to Build - Cards**

18. **Subscriptions Card** (Figma node: `316:142276`)
    - ⏳ Status: Not built
    - **States:** default, hover
    - **Size:** 382px × 179px
    - **Content:** Title, Amount, Progress bar
    - **Semantic Tokens:**
      - `bg-secondary-solid` (#e879f9 - Fuchsia 400)
      - `text-fg-text-inverse`
      - `border-fg-border-strong`
    - **Props:** `title`, `amount`, `percentage`, `onClick`
    - **Extracted Code:**
      ```tsx
      bg-secondary-solid
      text-fg-text-inverse
      rounded-2xl
      p-6
      gap-3
      ```

19. **Budget Card** (Figma node: `316:142270`)
    - ⏳ Status: Not built
    - **States:** default, hover
    - **Size:** 382px × 306px
    - **Content:** Category progress bars
    - **Semantic Tokens:**
      - Card uses semantic bg/fg tokens
      - Progress bars use category tokens
    - **Props:** `categories`, `budgets`, `onClick`

20. **Goals Card** (Figma node: `316:142253`)
    - ⏳ Status: Not built
    - **States:** default, state2
    - **Size:** 129px × 131px
    - **Content:** Circle progress with goal info
    - **Semantic Tokens:**
      - Progress-specific tokens
    - **Props:** `goalName`, `percentage`, `color`

21. **Advisor Card** (Figma node: `316:142273`)
    - ⏳ Status: Not built
    - **States:** default, hover
    - **Size:** 354px × 192px
    - **Content:** AI advisor suggestions
    - **Semantic Tokens:**
      - Card semantic tokens
    - **Props:** `message`, `onClick`

22. **Transaction Card** (Figma node: `316:142279`)
    - ⏳ Status: Not built
    - **Orientations:** vertical, horizontal
    - **States:** default, hover
    - **Size:** Vertical: 176px × 154px, Horizontal: 410px × 61px
    - **Content:** Merchant, amount, category, date
    - **Semantic Tokens:**
      - Card semantic tokens
      - Category color chips
    - **Props:** `merchant`, `amount`, `category`, `date`, `orientation`, `onClick`

23. **Insight Card** (Figma node: `316:142260`)
    - ⏳ Status: Not built
    - **States:** default, hover
    - **Size:** 332px × 95px
    - **Content:** AI insight/tip
    - **Semantic Tokens:**
      - Card semantic tokens
    - **Props:** `insight`, `icon`, `onClick`

24. **Question Card** (Figma node: `316:142304`)
    - ⏳ Status: Not built
    - **States:** default, hover, focus, active
    - **Size:** 324px × 169px
    - **Content:** Question prompt for AI
    - **Semantic Tokens:**
      - Card semantic tokens
    - **Props:** `question`, `onClick`

25. **Budget Card Item** (Figma node: `307:10149`)
    - ⏳ Status: Not built
    - **Size:** 78px × 71px
    - **Content:** Category icon + amount
    - **Semantic Tokens:**
      - Category-specific
    - **Props:** `category`, `amount`, `icon`

---

### 🚧 **Need to Build - Specialized**

26. **Category Icon** (Figma node: `307:10527`)
    - ⏳ Status: Not built
    - **Categories:** Mortgage, Utilities, Home, George, Food, Auto, Entertainment, Health, Software, Personal, Fees
    - **Styles:** circle (30px), icon (18px)
    - **Semantic Tokens:**
      - `bg-data-default-{category}`
    - **Props:** `category`, `style`, `size`

27. **Bank Marker** (Figma node: `307:12811`)
    - ⏳ Status: Not built
    - **Banks:** SECU Checking, SECU Savings, SECU Credit Card, Apple Cash, Cash App
    - **Size:** 32px × 32px
    - **Semantic Tokens:**
      - `bg-bank-secu-solid`
      - `bg-bank-cash-app-solid`
      - `bg-bank-apple-cash-solid`
    - **Props:** `bank`, `accountType`

28. **Bank Account Card** (Figma node: `308:17256`)
    - ⏳ Status: Not built
    - **States:** default, success, warning, error, disabled
    - **Size:** 399px × 88px
    - **Components:** Account section with name
    - **Names:** Beth, Bryan
    - **Semantic Tokens:**
      - Bank-specific brand colors
      - State colors (success, warning, error)
    - **Props:** `accountName`, `accountType`, `balance`, `owner`, `state`

29. **Alert Circle Group** (Figma node: `313:23835`)
    - ⏳ Status: Not built
    - **Statuses:** success, warning, alert
    - **States:** default, active
    - **Size:** 16px × 16px
    - **Semantic Tokens:**
      - `success-*`, `warning-*`, `error-*` tokens
    - **Props:** `status`, `active`

30. **Header** (Figma node: `307:10126`)
    - ⏳ Status: Partially built (top bar in App.tsx)
    - **Sizes:** mobile (430px × 63px), desktop (1440px × 72px)
    - **Content:** Logo, navigation, menu button
    - **Semantic Tokens:**
      - Header-specific bg/fg tokens
    - **Props:** `size`, `title`, `onMenuClick`

31. **Logo** (Figma node: `307:9953`)
    - ⏳ Status: Not built
    - **Variants:** symbol (48px), full (234px × 48px), text-only (178px × 45px)
    - **Semantic Tokens:**
      - Logo brand colors
    - **Props:** `variant`, `size`

---

## 🎨 **Semantic Token Usage in Figma**

### **Excellent News:** Your Figma design already uses semantic tokens!

#### **Button Example:**
```tsx
// Figma-generated code uses var(--token-name, fallback)
bg-[var(--bg\/bg-solid,#64748b)]           // Solid button bg
text-[var(--fg\/text-inverse-hover,#f8fafc)] // White text
px-[var(--spacing\/6,24px)]                 // Horizontal padding
py-[var(--spacing\/3,12px)]                 // Vertical padding
rounded-[var(--borderradius\/rounded-default,4px)] // Border radius
```

#### **Chip Example:**
```tsx
// Category-specific data tokens
bg-[var(--data\/default\/mortgage,#fca5a5)]  // Mortgage category
bg-[var(--data\/default\/food,#6ee7b7)]      // Food category
text-[var(--fg\/text-contrast,#475569)]      // Text color
```

#### **Input Example:**
```tsx
border-[var(--fg\/border-strong,#6b7280)]    // Strong border
rounded-[var(--borderradius\/rounded-3xl,24px)] // Large radius
```

### **Token Mapping:**

Your `tokens.json` already has these exact tokens! The transformation script maps them correctly:

| Figma Token | CSS Variable | Tailwind Class |
|-------------|--------------|----------------|
| `--bg/bg-solid` | `--brand-bg-bg-solid` | `bg-bg-bg-solid` |
| `--fg/text-inverse` | `--brand-fg-text-inverse` | `text-fg-text-inverse` |
| `--primary/bg` | `--brand-primary-bg` | `bg-primary-bg` |
| `--data/default/mortgage` | `--semantic-data-default-mortgage` | `bg-data-default-mortgage` |
| `--spacing/6` | `--dimensions-spacing-6` | `px-6` or `p-6` |
| `--borderradius/rounded-md` | `--dimensions-borderradius-rounded-md` | `rounded-md` |

---

## 📊 Component Priority Matrix

### **High Priority** (Core Primitives - Week 1-2)
1. ✅ Button (Done)
2. 🔥 Input
3. 🔥 Chip (Category tags)
4. 🔥 Select Menu
5. 🔥 Avatar (Beth/Bryan)

### **Medium Priority** (Navigation & Layout - Week 2-3)
6. Tabs
7. Nav Bar (refactor existing)
8. Sidebar (refactor existing)
9. Header (refactor existing)
10. Separator

### **Medium-High Priority** (Cards - Week 3-4)
11. Subscriptions Card
12. Budget Card  
13. Transaction Card
14. Advisor Card
15. Insight Card
16. Goals Card
17. Question Card

### **Medium Priority** (Data Viz - Week 4-5)
18. Progress Bar - Categories
19. Circle Progress
20. Balance Pie Chart
21. Double Chart

### **Lower Priority** (Specialized - Week 5-6)
22. Icon Button
23. Switch
24. Radio
25. Bank Marker
26. Bank Account Card
27. Alert Circle
28. Category Icon
29. Logo
30. Budget Card Item

---

## 🎯 **Extraction Strategy**

### **Phase A: Individual Component Build**
For each component:

1. **Get Figma Specs**
   ```bash
   # Get full design context for component
   mcp_Figma_get_design_context --nodeId={nodeId}
   
   # Get screenshot for visual reference
   mcp_Figma_get_screenshot --nodeId={nodeId}
   ```

2. **Extract Semantic Tokens**
   - Note all `var(--token-name)` references
   - Map to your `tokens.json` structure
   - Verify in generated `tokens.css`

3. **Build React Component**
   - Follow `Button.tsx` pattern
   - Use semantic token Tailwind classes
   - Include all states (default, hover, focus, active, disabled)
   - Add prop API for variants

4. **Create Specimen Page**
   - Show all variants
   - Show all states
   - Interactive examples

### **Phase B: Composite Components**
After primitives are built:

1. **Cards** - Compose from primitives
2. **Charts** - Use Recharts + semantic tokens
3. **Complex Forms** - Combine Input + Select + Button

---

## 📝 **Component Template (Based on Button.tsx)**

```tsx
import React from 'react';

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  // Component-specific props
}

const Component: React.FC<ComponentProps> = ({
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  // Base styles - semantic tokens only
  const baseStyles = `
    // Layout
    // Typography  
    // Spacing (4pt grid)
    // Border radius
  `.replace(/\s+/g, ' ').trim();

  // Variant styles - semantic tokens
  const variantStyles = {
    default: `bg-bg-bg text-fg-text hover:bg-bg-bg-hover`,
    primary: `bg-primary-bg text-fg-text hover:bg-primary-bg-hover`,
    secondary: `bg-secondary-bg text-fg-text hover:bg-secondary-bg-hover`
  };

  // Size styles - spacing tokens
  const sizeStyles = {
    sm: `px-4 py-2 text-sm`,
    md: `px-6 py-3 text-base`,
    lg: `px-8 py-4 text-lg`
  };

  const disabledStyles = 'opacity-40 cursor-not-allowed';

  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `;

  return (
    <div className={combinedStyles} {...props}>
      {/* Component content */}
    </div>
  );
};

export default Component;
```

---

## 🚀 **Quick Start: Build Next Component**

### **Recommended: Input Component**

1. **Extract from Figma:**
   ```bash
   # Already have node ID: 15:1219
   # Get inactive, active, hover states
   ```

2. **Create Component:**
   ```tsx
   // src/components/Input.tsx
   interface InputProps {
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     leadingIcon?: React.ReactNode;
     disabled?: boolean;
   }
   
   // Use semantic tokens:
   border-fg-border-strong
   text-fg-text
   rounded-3xl
   px-4 py-3 gap-2
   ```

3. **Create Specimen:**
   ```tsx
   // src/components/InputSpecimens.tsx
   // Show inactive, active, hover states
   // Show with/without icon
   ```

---

## 📚 **Reference Links**

- **Figma Design:** [Family Finance Manager Components](https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=15-126&m=dev)
- **Token Reference:** [`docs/TOKENS.md`](./TOKENS.md)
- **Token Workflow:** [`docs/TOKEN_WORKFLOW.md`](./TOKEN_WORKFLOW.md)
- **Button Component:** [`src/components/Button.tsx`](../src/components/Button.tsx) (reference implementation)

---

## ✅ **Next Actions**

1. **Immediate:**
   - [ ] Build Input component (node: `15:1219`)
   - [ ] Build Chip component (node: `12:5545`)
   - [ ] Build Select Menu (node: `8:2685`)

2. **This Week:**
   - [ ] Build Tabs component
   - [ ] Build Avatar component
   - [ ] Refactor existing Nav/Sidebar to use tokens

3. **Next Week:**
   - [ ] Build all card components
   - [ ] Build progress/chart components
   - [ ] Create specimens pages

---

**Status:** ✅ Extraction Complete - 30+ components identified  
**SSOT:** `tokens.json` ← Figma Token Studio  
**Ready to Build:** Yes! Follow Button.tsx pattern with semantic tokens

