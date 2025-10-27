# Mobile Dashboard Component Analysis

**Figma Source:** [Mobile Dashboard](https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=31-5698&m=dev)  
**Node ID:** `31:5698`  
**Date:** 2025-10-22

---

## 📱 **Dashboard Structure Overview**

```
┌─────────────────────────────────────┐
│  Header (with back + settings)     │
├─────────────────────────────────────┤
│                                     │
│  📊 Budget Categories Section       │
│  ├─ H2 Header                       │
│  ├─ Progress Bar (Mortgage)         │
│  ├─ Progress Bar (Bills)            │
│  ├─ Progress Bar (Home Reno)        │
│  ├─ Progress Bar (Food)             │
│  ├─ Progress Bar (Auto)             │
│  ├─ Progress Bar (Entertainment)    │
│  ├─ Progress Bar (Health)           │
│  ├─ Progress Bar (Software)         │
│  └─ Progress Bar (Personal)         │
│                                     │
│  🎯 Savings Goals Section           │
│  ├─ H2 Header                       │
│  ├─ Goal Card (Emergency Fund)      │
│  ├─ Goal Card (Debt Paydown)        │
│  └─ Goal Card (Roth IRA)            │
│                                     │
│  🤖 AI Advisor Section              │
│  ├─ H2 Header                       │
│  ├─ Question Card 1                 │
│  └─ Question Card 2                 │
│                                     │
│  💬 Quick Actions                   │
│  ├─ Button (Save More)              │
│  ├─ Button (See Transactions)       │
│  └─ Button (Ask AI Advisor)         │
│                                     │
├─────────────────────────────────────┤
│  Bottom Navigation (5 items)        │
└─────────────────────────────────────┘
```

---

## 🧩 **Components Used in Dashboard**

### **✅ Already Have (1)**

1. **Button** ✅
   - **File:** `src/components/Button.tsx`
   - **Usage:** 3 CTA buttons at bottom
   - **Variant:** solid (default)
   - **Tokens:** `bg-bg-bg-solid`, `text-fg-text-inverse-hover`

### **🚧 Have But Need Token Migration (1)**

2. **BottomNav** 🚧
   - **File:** `src/components/BottomNav.tsx`
   - **Usage:** Bottom navigation
   - **Current:** Hardcoded Tailwind colors
   - **Need:** Migrate to `bg-bg-bg`, `border-fg-line`, `text-fg-text-subtle`
   - **Figma Node:** `43:13913`

### **⏳ Need to Build (6)**

3. **MobileHeader** ⏳
   - **Figma Node:** `31:5699`
   - **Size:** Full width × 63px
   - **Content:**
     - Left: Back icon (24px, optional - currently invisible)
     - Center: Page title (30px text)
     - Right: Settings icon (32px)
   - **Tokens:**
     - `bg-bg-bg` (#e2e8f0)
     - `border-b` with `border-fg-border`
     - `text-fg-text` (#64748b)
     - `px-4 py-3`
   - **Props:** `title`, `onBackClick?`, `onSettingsClick`, `showBack`

4. **SectionHeader (H2)** ⏳
   - **Figma Node:** `316:135376`
   - **Size:** Full width × auto
   - **Content:** Section title (24px semibold)
   - **Tokens:**
     - `bg-bg-bg` (#e2e8f0)
     - `border border-fg-border-strong`
     - `text-fg-text-contrast` (#475569)
     - `rounded-md`
     - `p-3`
   - **Props:** `title`

5. **CategoryProgressBar** ⏳ **PRIORITY #1**
   - **Figma Node:** Multiple (42:12457, 42:12488, etc.)
   - **Size:** Full width × 61px
   - **Structure:**
     - Top Row: Icon (18px) + Label (16px semibold) | Spent/Budget (12px)
     - Progress Bar: 16px height, rounded-full
     - Bottom Row: Percentage (12px medium) + Alerts (3× 16px icons) | Amount left (12px)
   - **Tokens:**
     - **Category Icons:** `bg-data-default-{category}` colors
     - **Progress bar bg:** `bg-bg-bg-active` (#94a3b8)
     - **Progress fill:** `bg-data-default-{category}`
     - **Text:** `text-fg-text` (#64748b)
     - **Border:** `border-fg-border-strong`
     - **Spacing:** `gap-1` (4px), `gap-2` (8px)
   - **Props:**
     ```typescript
     interface CategoryProgressBarProps {
       category: 'mortgage' | 'utilities' | 'home' | 'food' | 'auto' | 
                 'entertainment' | 'health' | 'software' | 'personal' | 'fees' | 'george';
       label: string;
       spent: number;
       budget: number;
       alerts?: {
         success?: boolean;
         warning?: boolean;
         error?: boolean;
       };
     }
     ```

6. **GoalCard** ⏳ **PRIORITY #2**
   - **Figma Node:** `43:18265`, `43:18266`, `43:18273`, `43:18280`
   - **Size:** Flexible width × 131px
   - **Content:**
     - Circle progress indicator (72px)
     - Goal name (12px medium, centered)
   - **Tokens:**
     - `bg-bg-bg-subtle` (#f8fafc)
     - `border border-fg-border`
     - `rounded-xl` (12px)
     - `p-3`
     - Circle colors: blue (default), green, pink variants
   - **Props:**
     ```typescript
     interface GoalCardProps {
       goalName: string;
       percentage: number;
       color?: 'blue' | 'green' | 'pink';
     }
     ```

7. **QuestionCard** ⏳ **PRIORITY #3**
   - **Figma Node:** `129:3183`, `129:3184`
   - **Size:** Full width × auto
   - **Content:** AI-generated question/prompt text (16px medium, centered)
   - **Tokens:**
     - `bg-bg-default-bg` (#fcfcfc)
     - `border-2 border-fg-border`
     - `rounded-md`
     - `px-3 py-4`
     - `text-fg-text`
   - **Props:**
     ```typescript
     interface QuestionCardProps {
       question: string;
       onClick?: () => void;
     }
     ```

8. **CategoryIcon** ⏳ **PRIORITY #4**
   - **Figma Node:** `46:22703`, `46:22727`, etc.
   - **Size:** 18px × 18px
   - **Categories:** All 11 categories
   - **Tokens:** Category-specific stroke colors
   - **Props:**
     ```typescript
     interface CategoryIconProps {
       category: CategoryType;
       size?: 16 | 18 | 24 | 30;
     }
     ```

9. **AlertCircle** ⏳
   - **Figma Node:** `39:12106`, `39:12107`, `39:12109`
   - **Size:** 16px × 16px
   - **Variants:** success (green), warning (orange), error (gray when inactive)
   - **States:** default (gray), active (colored)
   - **Tokens:**
     - Success: `stroke-success-solid`
     - Warning: `stroke-warning-solid`
     - Inactive: `stroke-gray-300`
   - **Props:**
     ```typescript
     interface AlertCircleProps {
       type: 'success' | 'warning' | 'error';
       active: boolean;
     }
     ```

---

## 🎨 **Extracted Semantic Tokens**

### **Colors Used:**

#### **Layout:**
```tsx
bg-bg-default-bg      // #fcfcfc - Main background
bg-bg-bg              // #e2e8f0 - Header/Nav background
bg-bg-bg-subtle       // #f8fafc - Goal card background
bg-bg-bg-active       // #94a3b8 - Progress bar track
```

#### **Text:**
```tsx
text-fg-text          // #64748b - Default text
text-fg-text-contrast // #475569 - Headers
text-fg-text-inverse-hover // #f8fafc - Button text
```

#### **Borders:**
```tsx
border-fg-border        // #d1d5db - Default borders
border-fg-border-strong // #6b7280 - Strong borders
border-fg-line          // #cbd5e1 - Nav dividers
```

#### **Category Colors (Data Viz):**
```tsx
bg-data-default-mortgage      // #fca5a5 (Red 300)
bg-data-default-utilities     // #fdba74 (Orange 300)
bg-data-default-home          // #fde047 (Yellow 300)
bg-data-default-food          // #6ee7b7 (Emerald 300)
bg-data-default-auto          // #67e8f9 (Cyan 300)
bg-data-default-entertainment // #93c5fd (Blue 300)
bg-data-default-health        // #d8b4fe (Purple 300)
bg-data-default-software      // #f0abfc (Fuchsia 300)
bg-data-default-personal      // #f9a8d4 (Pink 300)
```

### **Spacing (4pt Grid):**
```tsx
gap-0   // 0px
gap-1   // 4px
gap-2   // 8px
gap-3   // 12px
gap-6   // 24px
p-3     // 12px
p-4     // 16px
p-6     // 24px
px-4 py-3  // 16px × 12px
```

### **Border Radius:**
```tsx
rounded-default  // 4px - Buttons
rounded-md       // 6px - Headers
rounded-xl       // 12px - Goal cards
rounded-2xl      // 16px - Question container
rounded-full     // 9999px - Progress bars, nav items
```

---

## 📊 **Component Priority for Dashboard**

### **Critical Path (Build These First):**

**Week 1 - Day 1-2:**
1. **CategoryProgressBar** 🔥
   - Most complex component
   - Used 6× on dashboard
   - Needs: CategoryIcon, AlertCircle
   - Build time: ~4 hours

**Week 1 - Day 3:**
2. **CategoryIcon** 🔥
   - Simple SVG wrapper
   - Used in CategoryProgressBar
   - Build time: ~2 hours

3. **AlertCircle** 🔥
   - Simple status indicator
   - Used in CategoryProgressBar
   - Build time: ~1 hour

**Week 1 - Day 4:**
4. **GoalCard** 🔥
   - Needs CircleProgress component
   - Used 3× on dashboard
   - Build time: ~3 hours

5. **CircleProgress** 🔥
   - SVG progress circle
   - Used in GoalCard
   - Build time: ~2 hours

**Week 1 - Day 5:**
6. **QuestionCard** 🔥
   - Simple card with text
   - Used 2× on dashboard
   - Build time: ~1 hour

7. **SectionHeader (H2)** 🔥
   - Simple header component
   - Used 3× on dashboard
   - Build time: ~30 min

**Week 2 - Day 1:**
8. **MobileHeader** 🔥
   - Replace current header
   - Build time: ~1 hour

9. **Refactor BottomNav** 🔥
   - Migrate to semantic tokens
   - Match Figma specs exactly
   - Build time: ~1 hour

---

## 🎯 **Dashboard Data Structure**

Based on the design, here's the data model needed:

```typescript
interface DashboardData {
  budgetCategories: CategoryBudget[];
  savingsGoals: SavingsGoal[];
  aiQuestions: AIQuestion[];
}

interface CategoryBudget {
  category: CategoryType;
  label: string;
  spent: number;
  budget: number;
  percentage: number;
  amountLeft: number;
  alerts: {
    success: boolean;
    warning: boolean;
    error: boolean;
  };
}

interface SavingsGoal {
  name: string;
  percentage: number;
  color: 'blue' | 'green' | 'pink';
  current: number;
  target: number;
}

interface AIQuestion {
  id: string;
  question: string;
  onClick: () => void;
}

type CategoryType = 
  | 'mortgage'
  | 'utilities' 
  | 'home'
  | 'food'
  | 'auto'
  | 'entertainment'
  | 'health'
  | 'software'
  | 'personal'
  | 'fees'
  | 'george';
```

---

## 🔧 **Component Specs (Detailed)**

### **1. CategoryProgressBar**

**Visual Breakdown:**
```
┌──────────────────────────────────────────────┐
│ [Icon] Category Name     $85 of $150         │  ← Top row
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ← Progress bar
│ 56% [✓][!][✗]           $65 left             │  ← Bottom row
└──────────────────────────────────────────────┘
```

**Semantic Tokens:**
```tsx
// Container
flex flex-col gap-1 w-full

// Top row
flex items-center justify-between
gap-2  // Icon + label
text-base-semi-bold  // Category name (16px)
text-xs-regular      // Budget amounts (12px)

// Progress bar
bg-bg-bg-active      // Track (#94a3b8)
h-4                  // 16px height
rounded-full
border border-fg-border-strong

// Progress fill (dynamic width based on percentage)
bg-data-default-{category}  // Category color
border border-fg-border-strong

// Bottom row
flex items-start justify-between
text-xs-medium       // Percentage (12px medium)
text-xs-regular      // Amount left (12px regular)
gap-1                // Alert group spacing
```

**Component Code Structure:**
```tsx
// src/components/CategoryProgressBar.tsx
import React from 'react';
import {CategoryIcon} from './CategoryIcon';
import {AlertCircle} from './AlertCircle';

interface CategoryProgressBarProps {
  category: CategoryType;
  label: string;
  spent: number;
  budget: number;
  alerts?: {
    success?: boolean;
    warning?: boolean;
    error?: boolean;
  };
}

export const CategoryProgressBar: React.FC<CategoryProgressBarProps> = ({
  category,
  label,
  spent,
  budget,
  alerts = {}
}) => {
  const percentage = Math.round((spent / budget) * 100);
  const amountLeft = budget - spent;
  
  // Category color mapping to semantic tokens
  const categoryColors = {
    mortgage: 'bg-data-default-mortgage',
    utilities: 'bg-data-default-utilites',
    home: 'bg-data-default-home',
    food: 'bg-data-default-food',
    auto: 'bg-data-default-auto',
    entertainment: 'bg-data-default-entertainment',
    health: 'bg-data-default-health',
    software: 'bg-data-default-software',
    personal: 'bg-data-default-personal',
    fees: 'bg-data-default-fees',
    george: 'bg-data-default-george'
  };
  
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <CategoryIcon category={category} size={18} />
          <p className="text-base-semi-bold text-fg-text">{label}</p>
        </div>
        <p className="text-xs-regular text-fg-text">
          ${spent} of ${budget}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="bg-bg-bg-active border border-fg-border-strong h-4 rounded-full relative w-full">
        <div 
          className={`h-4 ${categoryColors[category]} border border-fg-border-strong rounded-full`}
          style={{width: `${percentage}%`}}
        />
      </div>
      
      {/* Bottom row */}
      <div className="flex items-start justify-between">
        <div className="flex gap-1 items-center">
          <p className="text-xs-medium text-fg-text">{percentage}%</p>
          <div className="flex gap-1 items-center">
            <AlertCircle type="success" active={alerts.success || false} />
            <AlertCircle type="warning" active={alerts.warning || false} />
            <AlertCircle type="error" active={alerts.error || false} />
          </div>
        </div>
        <p className="text-xs-regular text-fg-text">${amountLeft} left</p>
      </div>
    </div>
  );
};
```

---

### **2. GoalCard**

**Visual:**
```
┌─────────────┐
│   ╭─────╮   │
│   │ 75% │   │  ← Circle progress
│   ╰─────╯   │
│             │
│ Goal Name   │  ← Label (12px)
└─────────────┘
```

**Tokens:**
```tsx
bg-bg-bg-subtle          // #f8fafc
border border-fg-border  // #d1d5db
rounded-xl               // 12px
p-3                      // 12px padding
gap-3                    // 12px gap
text-xs-medium           // Goal name
text-fg-default-fg       // #475569
```

**Component:**
```tsx
// src/components/GoalCard.tsx
import React from 'react';
import {CircleProgress} from './CircleProgress';

interface GoalCardProps {
  goalName: string;
  percentage: number;
  color?: 'blue' | 'green' | 'pink';
  current?: number;
  target?: number;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goalName,
  percentage,
  color = 'blue'
}) => {
  return (
    <div className="flex-1 bg-bg-bg-subtle border border-fg-border rounded-xl p-3 flex flex-col gap-3 items-center justify-center min-w-0">
      <CircleProgress percentage={percentage} color={color} size={72} />
      <p className="text-xs-medium text-fg-default-fg text-center w-full">
        {goalName}
      </p>
    </div>
  );
};
```

---

### **3. QuestionCard**

**Visual:**
```
┌─────────────────────────────────────┐
│ Your subscriptions rose 12%.        │
│ Want to see why?                    │
└─────────────────────────────────────┘
```

**Tokens:**
```tsx
bg-bg-default-bg         // #fcfcfc
border-2 border-fg-border // #d1d5db
rounded-md               // 6px
px-3 py-4                // 12px × 16px
text-base-medium         // 16px medium
text-fg-text             // #64748b
text-center
```

**Component:**
```tsx
// src/components/QuestionCard.tsx
import React from 'react';

interface QuestionCardProps {
  question: string;
  onClick?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-bg-default-bg 
        border-2 border-fg-border 
        rounded-md 
        px-3 py-4 
        flex items-center justify-center 
        w-full
        ${onClick ? 'cursor-pointer hover:bg-bg-bg-subtle transition-colors' : ''}
      `}
    >
      <p className="text-base-medium text-fg-text text-center">
        {question}
      </p>
    </Component>
  );
};
```

---

### **4. SectionHeader (H2)**

**Visual:**
```
┌─────────────────┐
│ Budget Categories │
└─────────────────┘
```

**Tokens:**
```tsx
bg-bg-bg                   // #e2e8f0
border border-fg-border-strong  // #6b7280
rounded-md                 // 6px
p-3                        // 12px
text-2xl-semi-bold         // 24px semibold
text-fg-text-contrast      // #475569
```

**Component:**
```tsx
// src/components/SectionHeader.tsx
import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = ''
}) => {
  return (
    <div className={`
      bg-bg-bg 
      border border-fg-border-strong 
      rounded-md 
      p-3 
      w-full
      ${className}
    `}>
      <h2 className="text-2xl-semi-bold text-fg-text-contrast">
        {title}
      </h2>
    </div>
  );
};
```

---

### **5. MobileHeader**

**Visual:**
```
┌─────────────────────────────────────┐
│ [←]      Dashboard         [⚙]     │
└─────────────────────────────────────┘
```

**Tokens:**
```tsx
bg-bg-bg                  // #e2e8f0
border-b border-fg-border // #d1d5db
px-4 py-3                 // 16px × 12px
text-3xl-regular          // 30px regular (title)
text-fg-text              // #64748b
```

**Component:**
```tsx
// src/components/MobileHeader.tsx
import React from 'react';
import {ChevronLeft, Settings} from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
  showBack?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  onBackClick,
  onSettingsClick,
  showBack = false
}) => {
  return (
    <div className="bg-bg-bg border-b border-fg-border px-4 py-3 flex items-center justify-between w-full">
      {/* Left: Back button */}
      <div className="flex items-center p-1">
        {showBack && onBackClick ? (
          <button onClick={onBackClick} className="p-0">
            <ChevronLeft size={24} className="text-fg-text" strokeWidth={2} />
          </button>
        ) : (
          <div className="w-6 h-6" /> 
        )}
      </div>
      
      {/* Center: Title */}
      <h1 className="text-3xl-regular text-fg-text text-center">
        {title}
      </h1>
      
      {/* Right: Settings */}
      <div className="flex items-center p-1">
        {onSettingsClick && (
          <button onClick={onSettingsClick} className="p-0">
            <Settings size={24} className="text-fg-text" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
};
```

---

## 📝 **Build Order & Dependencies**

```
Build Order (dependency graph):

1. CategoryIcon (no deps)
      ↓
2. AlertCircle (no deps)
      ↓
3. CategoryProgressBar (uses CategoryIcon + AlertCircle)
      ↓
4. CircleProgress (no deps)
      ↓
5. GoalCard (uses CircleProgress)
      ↓
6. SectionHeader (no deps)
      ↓
7. QuestionCard (no deps)
      ↓
8. MobileHeader (no deps)
      ↓
9. Refactor BottomNav (token migration)
      ↓
10. Assemble Dashboard (uses all components)
```

---

## 🚀 **Dashboard Assembly**

Once all components are built:

```tsx
// src/components/Dashboard.tsx
import React from 'react';
import {MobileHeader} from './MobileHeader';
import {SectionHeader} from './SectionHeader';
import {CategoryProgressBar} from './CategoryProgressBar';
import {GoalCard} from './GoalCard';
import {QuestionCard} from './QuestionCard';
import {Button} from './Button';
import BottomNav from './BottomNav';

export const Dashboard: React.FC = () => {
  // TODO: Connect to Notion API for real data
  const budgetData = [
    {category: 'mortgage', label: 'Mortgage', spent: 85, budget: 150, 
     alerts: {warning: true}},
    {category: 'utilities', label: 'Bills', spent: 85, budget: 150, 
     alerts: {warning: true}},
    // ... more categories
  ];
  
  const goalsData = [
    {name: 'Emergency Fund', percentage: 75, color: 'blue'},
    {name: 'Debt Paydown', percentage: 50, color: 'green'},
    {name: 'Roth IRA', percentage: 25, color: 'pink'}
  ];
  
  const questions = [
    {id: '1', question: 'Your subscriptions rose 12%. Want to see why?'},
    {id: '2', question: 'Your $83 under budget this month. Move that to savings?'}
  ];
  
  return (
    <div className="bg-bg-default-bg flex flex-col min-h-screen">
      <MobileHeader 
        title="Dashboard" 
        onSettingsClick={() => {/* handle settings */}}
      />
      
      <div className="flex flex-col gap-6 p-6 pb-24">
        {/* Budget Categories */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Budget Categories" />
          <div className="flex flex-col gap-6">
            {budgetData.map((item) => (
              <CategoryProgressBar key={item.category} {...item} />
            ))}
          </div>
        </div>
        
        {/* Savings Goals */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Savings Goals" />
          <div className="flex gap-3">
            {goalsData.map((goal, idx) => (
              <GoalCard key={idx} {...goal} />
            ))}
          </div>
        </div>
        
        {/* AI Questions */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="AI Insights" />
          <div className="border border-fg-border rounded-2xl p-6 flex flex-col gap-6">
            {questions.map((q) => (
              <QuestionCard 
                key={q.id} 
                question={q.question}
                onClick={() => {/* handle click */}}
              />
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3 h-14">
          <Button variant="solid" fullWidth>Save More</Button>
          <Button variant="solid" fullWidth>See Transactions</Button>
          <Button variant="solid" fullWidth>Ask AI Advisor</Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};
```

---

## 📏 **Design Specs Summary**

### **Layout:**
- **Container padding:** `p-6` (24px)
- **Section gaps:** `gap-6` (24px between sections)
- **Item gaps:** `gap-3` (12px within sections)
- **Progress bar spacing:** `gap-1` (4px between rows)

### **Typography:**
- **Page title:** `text-3xl-regular` (30px, 400 weight)
- **Section headers:** `text-2xl-semi-bold` (24px, 600 weight)
- **Category labels:** `text-base-semi-bold` (16px, 600 weight)
- **Progress details:** `text-xs-regular` (12px, 400 weight)
- **Progress percentage:** `text-xs-medium` (12px, 500 weight)
- **Goal names:** `text-xs-medium` (12px, 500 weight)
- **Questions:** `text-base-medium` (16px, 500 weight)
- **Circle progress %:** `text-lg-semi-bold` (18px, 600 weight)

### **Colors:**
- **Main bg:** `bg-bg-default-bg` (#fcfcfc)
- **Header bg:** `bg-bg-bg` (#e2e8f0)
- **Card bg:** `bg-bg-bg-subtle` (#f8fafc)
- **Progress track:** `bg-bg-bg-active` (#94a3b8)
- **Progress fill:** Category-specific data colors
- **Text:** `text-fg-text` (#64748b)
- **Headers:** `text-fg-text-contrast` (#475569)

### **Border Radius:**
- **Buttons:** `rounded-default` (4px)
- **Headers:** `rounded-md` (6px)
- **Goal cards:** `rounded-xl` (12px)
- **Question container:** `rounded-2xl` (16px)
- **Progress bars:** `rounded-full`

---

## 🎯 **Recommended Build Sequence**

### **Day 1: Foundation Components**

**Morning (2-3 hours):**
```bash
# 1. Build CategoryIcon
# src/components/CategoryIcon.tsx
# - 11 category variants
# - SVG icon wrapper
# - Semantic token colors
```

**Afternoon (1-2 hours):**
```bash
# 2. Build AlertCircle
# src/components/AlertCircle.tsx  
# - Success/warning/error variants
# - Active/inactive states
# - 16px size
```

### **Day 2: Progress Bar (Most Complex)**

**All Day (4-5 hours):**
```bash
# 3. Build CategoryProgressBar
# src/components/CategoryProgressBar.tsx
# - Integrate CategoryIcon + AlertCircle
# - Dynamic progress calculation
# - All 11 category colors
# - Create CategoryProgressBarSpecimens.tsx
```

### **Day 3: Goals**

**Morning (2-3 hours):**
```bash
# 4. Build CircleProgress
# src/components/CircleProgress.tsx
# - SVG circular progress
# - 3 color variants (blue, green, pink)
# - Percentage display
```

**Afternoon (2-3 hours):**
```bash
# 5. Build GoalCard
# src/components/GoalCard.tsx
# - Use CircleProgress
# - Responsive flex layout
# - Create GoalCardSpecimens.tsx
```

### **Day 4: Headers & Cards**

**Morning (1-2 hours):**
```bash
# 6. Build SectionHeader
# src/components/SectionHeader.tsx
# - Simple header component
# - 30 minutes

# 7. Build QuestionCard
# src/components/QuestionCard.tsx
# - Interactive card
# - 1 hour
```

**Afternoon (2 hours):**
```bash
# 8. Build MobileHeader
# src/components/MobileHeader.tsx
# - Back button (optional)
# - Title
# - Settings button
```

### **Day 5: Assembly & Refactor**

**Morning (2 hours):**
```bash
# 9. Refactor BottomNav
# Migrate to semantic tokens
# Match Figma specs exactly
```

**Afternoon (3-4 hours):**
```bash
# 10. Build new Dashboard component
# src/components/DashboardMobile.tsx
# - Assemble all components
# - Connect to Notion API data
# - Test responsiveness
# - Verify all semantic tokens
```

---

## ✅ **Success Criteria**

### **Visual Fidelity:**
- [ ] Matches Figma design pixel-perfect
- [ ] All spacing follows 4pt grid (4, 8, 12, 16, 24px)
- [ ] All colors use semantic tokens
- [ ] Typography matches Figma specs

### **Functionality:**
- [ ] Progress bars calculate percentages correctly
- [ ] Alert indicators show proper states
- [ ] Goal cards display progress circles
- [ ] Question cards are clickable
- [ ] Navigation works
- [ ] Buttons trigger actions

### **Token Usage:**
- [ ] Zero hardcoded hex values
- [ ] Zero hardcoded pixel spacing
- [ ] All colors via semantic tokens
- [ ] All spacing via spacing tokens
- [ ] All typography via utility classes

### **Accessibility:**
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Keyboard navigation
- [ ] Focus states on interactive elements
- [ ] AA color contrast

---

## 💡 **Key Insights**

### **1. Simple, Effective Dashboard**
The mobile dashboard is beautifully simple:
- Budget progress bars (main content)
- 3 savings goals (visual KPIs)
- 2 AI questions (engagement)
- 3 quick action buttons

### **2. Category Colors Are Consistent**
Every category uses the same token pattern:
- Icon color: matches category
- Progress bar: matches category
- All use `data-default-{category}` tokens

### **3. Reusable Progress Pattern**
The CategoryProgressBar is used 6× with different data - perfect for a reusable component.

### **4. AI Integration Points**
- Question cards suggest AI-generated insights
- "Ask AI Advisor" button for conversational AI
- Ready for your OpenAI integration!

---

## 🚀 **Next Action**

### **Start Building Now:**

```bash
# 1. Create CategoryIcon component
# This is the simplest dependency

# 2. Create AlertCircle component  
# Another simple dependency

# 3. Create CategoryProgressBar
# The main dashboard component

# 4. Create CircleProgress
# For goal visualization

# 5. Create GoalCard
# Uses CircleProgress

# 6. Create SectionHeader + QuestionCard
# Simple components

# 7. Assemble dashboard
# Put it all together
```

**Estimated Total Time:** 2-3 days of focused work

---

## 📋 **Action Items**

### **Immediate:**
- [ ] Build CategoryIcon component
- [ ] Build AlertCircle component
- [ ] Build CategoryProgressBar component

### **This Week:**
- [ ] Build CircleProgress + GoalCard
- [ ] Build SectionHeader + QuestionCard  
- [ ] Build MobileHeader
- [ ] Refactor BottomNav with tokens
- [ ] Assemble complete Dashboard component

### **Next Week:**
- [ ] Connect Dashboard to Notion API
- [ ] Add real transaction data
- [ ] Implement click handlers
- [ ] Add loading states
- [ ] Test on real devices

---

**Ready to start building? Let's begin with CategoryIcon!** 🚀

