# Component Build Status & Roadmap

**Last Updated:** 2025-10-22  
**Token Pipeline:** ✅ Complete and Operational  
**SSOT:** `tokens.json` from Figma Token Studio

---

## 📊 **Component Inventory Summary**

### **Status Breakdown:**
- ✅ **Built & Token-Migrated:** 1/31 components
- 🚧 **Partially Built (needs tokens):** 7/31 components
- ⏳ **Not Built:** 23/31 components

---

## ✅ **Components Ready (1)**

### **1. Button** ✅
- **File:** `src/components/Button.tsx`
- **Status:** ✅ Fully built with semantic tokens
- **Variants:** solid, color, surface, outline, ghost
- **States:** default, hover, focus, active, disabled
- **Token Classes:**
  - `bg-bg-bg-solid`, `text-fg-text-inverse`
  - `bg-primary-bg`, `text-fg-text`
  - `border-fg-border`, `hover:bg-bg-bg-hover`
- **Specimen:** `/test/button`
- **Figma Node:** `12:5087`, `12:5085`, etc.

---

## 🚧 **Components Partially Built (7)**

### **2. BottomNav** 🚧
- **File:** `src/components/BottomNav.tsx`
- **Status:** ⚠️ Built but uses hardcoded Tailwind colors
- **Need:** Migrate to semantic tokens
- **Current:** `bg-slate-100`, `text-gray-700`
- **Should Be:** `bg-bg-bg`, `text-fg-text`
- **Figma Node:** `289:1236`

### **3. MenuDrawer** 🚧
- **File:** `src/components/MenuDrawer.tsx`
- **Status:** ⚠️ Built but needs token audit
- **Need:** Migrate to semantic tokens
- **Figma Node:** `12:5343`

### **4. FinancialDashboard** 🚧
- **File:** `src/components/FinancialDashboard.tsx`
- **Status:** ⚠️ Built but needs token audit
- **Need:** Migrate to semantic tokens + extract cards

### **5. BudgetScreen** 🚧
- **File:** `src/components/BudgetScreen.tsx`
- **Status:** ⚠️ Built but needs token audit
- **Need:** Migrate to semantic tokens

### **6. AnalyticsScreen** 🚧
- **File:** `src/components/AnalyticsScreen.tsx`
- **Status:** ⚠️ Built but needs token audit
- **Need:** Migrate to semantic tokens

### **7. Card** 🚧
- **File:** `src/components/ui/card.tsx`
- **Status:** ⚠️ Shadcn generic card, not design-system specific
- **Need:** Replace with Figma-spec Card components

### **8. PlaidConnect** 🚧
- **File:** `src/components/PlaidConnect.tsx`
- **Status:** ⚠️ Built but needs token audit
- **Need:** Migrate to semantic tokens

---

## ⏳ **Components Not Built (23)**

### **Core Primitives (Priority 1)**

9. **Input** ⏳
   - **Figma Node:** `15:1219`, `15:1221`, `15:1225`
   - **States:** inactive, active, hover
   - **Tokens:** `border-fg-border-strong`, `text-fg-text`, `rounded-3xl`
   - **Build Time:** ~2 hours

10. **Chip** ⏳
    - **Figma Node:** `12:5545`, `46:18927`, etc.
    - **Categories:** All 11 categories
    - **Tokens:** `bg-data-default-*`, `bg-data-active-*`
    - **Build Time:** ~3 hours

11. **Select Menu** ⏳
    - **Figma Node:** `8:2685`, `8:2691`, `12:4989`
    - **Components:** Trigger + Menu + Menu Item
    - **Tokens:** `border-fg-border-strong`, `bg-bg-default-bg`
    - **Build Time:** ~4 hours

12. **Tabs** ⏳
    - **Figma Node:** `307:9287`, `307:9363`, etc.
    - **Styles:** neutral, color, outline, outline-color
    - **Tokens:** Style-specific semantic tokens
    - **Build Time:** ~3 hours

13. **Avatar** ⏳
    - **Figma Node:** `307:11039`, `307:11031`, etc.
    - **Styles:** initials, beth, bryan (with active/color variants)
    - **Sizes:** 12-64px
    - **Tokens:** `bg-secondary-solid` (Beth), `bg-primary-solid` (Bryan)
    - **Build Time:** ~2 hours

14. **Separator** ⏳
    - **Figma Node:** `362:21429`, etc.
    - **Sizes:** 1px, 1.5px, 2px, 3px
    - **Tokens:** `border-fg-line`
    - **Build Time:** ~30 min

15. **Icon Button** ⏳
    - **Figma Node:** `358:11220`, `358:11216`, etc.
    - **Variants:** Same as Button
    - **Tokens:** Same as Button
    - **Build Time:** ~1 hour (extend Button)

16. **Switch** ⏳
    - **Figma Node:** `347:6556`, `347:6551`, etc.
    - **Styles:** 7 variants
    - **Tokens:** Variant-specific
    - **Build Time:** ~2 hours

17. **Radio** ⏳
    - **Figma Node:** `347:5166`, `347:5165`, etc.
    - **Styles:** 7 variants
    - **Tokens:** Variant-specific
    - **Build Time:** ~2 hours

### **Cards (Priority 2)**

18. **Subscriptions Card** ⏳
    - **Figma Node:** `143:5813`, `316:146197`
    - **Content:** Title, amount, progress
    - **Tokens:** `bg-secondary-solid`, `text-fg-text-inverse`
    - **Build Time:** ~3 hours

19. **Budget Card** ⏳
    - **Figma Node:** `56:6822`, `316:146130`
    - **Content:** Category progress bars
    - **Tokens:** Category-specific
    - **Build Time:** ~4 hours

20. **Transaction Card** ⏳
    - **Figma Node:** `144:7024`, `46:22834`
    - **Orientations:** vertical, horizontal
    - **Tokens:** Card + category tokens
    - **Build Time:** ~3 hours

21. **Advisor Card** ⏳
    - **Figma Node:** `66:2591`, `316:146187`
    - **Content:** AI message
    - **Tokens:** Card semantic tokens
    - **Build Time:** ~2 hours

22. **Goals Card** ⏳
    - **Figma Node:** `43:18265`, `316:146105`
    - **Content:** Circle progress + goal info
    - **Tokens:** Progress tokens
    - **Build Time:** ~2 hours

23. **Insight Card** ⏳
    - **Figma Node:** `43:18321`, `316:146120`
    - **Content:** Insight text + icon
    - **Tokens:** Card semantic tokens
    - **Build Time:** ~2 hours

24. **Question Card** ⏳
    - **Figma Node:** `315:128246`, etc.
    - **States:** 4 states
    - **Tokens:** Card semantic tokens
    - **Build Time:** ~2 hours

25. **Budget Card Item** ⏳
    - **Figma Node:** `56:6766`
    - **Content:** Icon + amount
    - **Tokens:** Category-specific
    - **Build Time:** ~1 hour

### **Data Visualization (Priority 3)**

26. **Progress Bar - Categories** ⏳
    - **Figma Node:** `362:17349`, `362:17369`, etc.
    - **Categories:** All 11
    - **Tokens:** `bg-data-default-*`, `bg-data-active-*`
    - **Build Time:** ~3 hours

27. **Circle Progress** ⏳
    - **Figma Node:** `43:18195`, `43:18227`, `43:18246`
    - **Variants:** blue, green, pink
    - **Tokens:** Color variant tokens
    - **Build Time:** ~3 hours

28. **Balance Pie Chart** ⏳
    - **Figma Node:** `21:5359`, `316:142405`
    - **Library:** Recharts + semantic tokens
    - **Tokens:** Data viz colors
    - **Build Time:** ~4 hours

29. **Double Chart** ⏳
    - **Figma Node:** `316:142462`, `316:144724`
    - **Orientations:** vertical, horizontal
    - **Library:** Recharts + semantic tokens
    - **Tokens:** Chart colors
    - **Build Time:** ~5 hours

### **Specialized Components (Priority 4)**

30. **Category Icon** ⏳
    - **Figma Node:** `46:22701`, `46:22686`, etc.
    - **Categories:** All 11
    - **Styles:** circle (30px), icon (18px)
    - **Tokens:** `bg-data-default-*`
    - **Build Time:** ~2 hours

31. **Bank Marker** ⏳
    - **Figma Node:** `308:17082`, `308:17078`, `308:17080`
    - **Banks:** SECU (3 types), Apple Cash, Cash App
    - **Tokens:** `bg-bank-secu-solid`, `bg-bank-cash-app-solid`, `bg-bank-apple-cash-solid`
    - **Build Time:** ~2 hours

32. **Bank Account Card** ⏳
    - **Figma Node:** `308:17254`, `308:17251`, etc.
    - **States:** default, success, warning, error, disabled
    - **Tokens:** Bank + state tokens
    - **Build Time:** ~3 hours

33. **Alert Circle** ⏳
    - **Figma Node:** `39:12092`, `39:12091`, `39:12090`
    - **Statuses:** success, warning, alert
    - **States:** default, active
    - **Tokens:** `success-*`, `warning-*`, `error-*`
    - **Build Time:** ~1 hour

34. **Header** ⏳
    - **Figma Node:** `32:5741`, `15:4883`
    - **Sizes:** mobile, desktop
    - **Status:** Partially in App.tsx
    - **Tokens:** Header semantic tokens
    - **Build Time:** ~2 hours (refactor)

35. **Logo** ⏳
    - **Figma Node:** `12:5366`, `12:5367`, `12:5365`
    - **Variants:** symbol, full, text-only
    - **Tokens:** Logo brand colors
    - **Build Time:** ~1 hour

---

## 📅 **Suggested Build Schedule**

### **Week 1: Core Primitives**
- **Mon:** Input component
- **Tue:** Chip component
- **Wed:** Select Menu
- **Thu:** Avatar component
- **Fri:** Tabs component + Separator

### **Week 2: Navigation & Forms**
- **Mon:** Refactor BottomNav with tokens
- **Tue:** Refactor MenuDrawer/Sidebar with tokens
- **Wed:** Icon Button + Switch
- **Thu:** Radio button
- **Fri:** Review & specimens

### **Week 3: Cards Part 1**
- **Mon:** Subscriptions Card
- **Tue:** Budget Card
- **Wed:** Transaction Card
- **Thu:** Advisor Card
- **Fri:** Goals Card

### **Week 4: Cards Part 2 + Data Viz**
- **Mon:** Insight Card + Question Card
- **Tue:** Progress Bar - Categories
- **Wed:** Circle Progress
- **Thu:** Balance Pie Chart
- **Fri:** Double Chart

### **Week 5: Specialized + Polish**
- **Mon:** Category Icon + Bank Marker
- **Tue:** Bank Account Card
- **Wed:** Alert Circle + Logo
- **Thu:** Header refactor
- **Fri:** Final review & accessibility audit

---

## 🎯 **Success Metrics**

### **Quality Bar (from PRD):**
- ✅ Structure: Semantic HTML, correct roles, labels
- ✅ States: default, hover, focus-visible, active, disabled, error where applicable
- ✅ Sizing: sm, md, lg mapped to spacing tokens
- ✅ Tokens: 100% semantic token usage, 0 hardcoded hex/px
- ✅ Accessibility: AA contrast, keyboard nav, focus rings
- ✅ Theming: Dark mode ready via token override

### **Per Component Checklist:**
- [ ] Semantic tokens only (no hex values)
- [ ] All states implemented (default, hover, focus, active, disabled)
- [ ] Keyboard navigation supported
- [ ] ARIA labels and roles
- [ ] Focus-visible rings
- [ ] AA contrast verified
- [ ] Specimen page created
- [ ] Props API documented
- [ ] TypeScript interfaces complete

---

## 💡 **Key Insights from Figma Extraction**

### **1. Figma Already Uses Semantic Tokens** ✅
Your Figma design uses the exact same semantic token structure as `tokens.json`:

```tsx
// Figma-generated code
bg-[var(--bg\/bg-solid,#64748b)]
bg-[var(--primary\/bg,#bfdbfe)]
bg-[var(--data\/default\/mortgage,#fca5a5)]
```

This proves your Token Studio setup is correct!

### **2. Consistent Spacing (4pt Grid)** ✅
All components use spacing tokens:
- `px-[var(--spacing\/6,24px)]` → `px-6` (24px)
- `py-[var(--spacing\/3,12px)]` → `py-3` (12px)
- `gap-[var(--spacing\/2,8px)]` → `gap-2` (8px)

### **3. Consistent Border Radius** ✅
- Buttons: `rounded-default` (4px)
- Inputs: `rounded-3xl` (24px)
- Cards: `rounded-2xl` (16px)
- Chips: `rounded-md` (6px)

### **4. State Management Pattern** ✅
Every interactive component has 4 states:
1. Default
2. Hover
3. Focus
4. Active

Plus disabled where applicable.

### **5. Typography Scale** ✅
Figma uses Geist font but sizes match your Figtree scale:
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px
- 5xl: 48px

---

## 🔧 **Typography Utilities Note**

Your `globals.css` has 116 custom typography utilities (`.text-xs-black`, `.text-sm-bold`, etc.).

**Current Status:** ✅ Intentionally using fixed px values  
**Reason:** These are utility classes that provide shortcuts for common text styles. They map 1:1 with your Figma typography scale and don't need to be dynamic.

**Usage:**
```tsx
// Use utility classes for convenience
<p className="text-base-medium">Body text</p>
<h1 className="text-4xl-bold">Heading</h1>

// Or use Tailwind + font-weight
<p className="text-base font-medium">Body text</p>
<h1 className="text-4xl font-bold">Heading</h1>
```

Both approaches are valid. The utilities are more explicit about the exact Figma style being used.

---

## 📋 **Recommended Build Order**

### **Phase 1: Core Primitives (Week 1-2)**
Focus on reusable building blocks that other components depend on.

**Order:**
1. Input (needed for forms)
2. Chip (needed for categories everywhere)
3. Avatar (Beth/Bryan identification)
4. Separator (layout primitive)
5. Select Menu (form primitive)
6. Tabs (navigation primitive)

### **Phase 2: Navigation (Week 2)**
Refactor existing navigation components to use tokens.

**Order:**
1. BottomNav (token migration)
2. MenuDrawer (token migration)
3. Header (refactor + extract from Figma)

### **Phase 3: Specialized Primitives (Week 3)**
Additional form controls and UI elements.

**Order:**
1. Icon Button (extend Button)
2. Switch
3. Radio
4. Category Icon
5. Bank Marker
6. Alert Circle
7. Logo

### **Phase 4: Cards (Week 3-4)**
Dashboard card components.

**Order:**
1. Subscriptions Card
2. Budget Card
3. Transaction Card
4. Advisor Card
5. Goals Card
6. Insight Card
7. Question Card
8. Budget Card Item
9. Bank Account Card

### **Phase 5: Data Visualization (Week 4-5)**
Charts and progress components.

**Order:**
1. Progress Bar - Categories
2. Circle Progress
3. Balance Pie Chart
4. Double Chart

### **Phase 6: Refactor Screens (Week 5)**
Update existing screen components to use new primitives.

**Order:**
1. FinancialDashboard (use new cards)
2. BudgetScreen (use new cards + chips)
3. AnalyticsScreen (use new charts)

---

## 🎯 **Next Action: Build Input Component**

### **Step-by-Step:**

1. **Extract Full Specs from Figma:**
   ```bash
   # Get all Input states
   mcp_Figma_get_design_context --nodeId=15:1219  # inactive
   mcp_Figma_get_design_context --nodeId=15:1221  # active
   mcp_Figma_get_design_context --nodeId=15:1225  # hover
   ```

2. **Create Component File:**
   ```tsx
   // src/components/Input.tsx
   import React from 'react';

   interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
     leadingIcon?: React.ReactNode;
     // ... props
   }

   const Input: React.FC<InputProps> = ({...}) => {
     // Semantic tokens only
     const baseStyles = `
       border-fg-border-strong
       text-fg-text
       rounded-3xl
       px-4 py-3
       focus:border-primary-border
       hover:bg-bg-bg-subtle
     `;
     
     // ...
   };
   ```

3. **Create Specimen:**
   ```tsx
   // src/components/InputSpecimens.tsx
   // Show all states + variants
   ```

4. **Test:**
   ```bash
   npm start
   # Visit: http://localhost:3000/specimens/input
   ```

---

## 🚀 **You're Ready to Build!**

### **What You Have:**
✅ Token pipeline working  
✅ 774 semantic tokens from Figma  
✅ Button component as reference  
✅ Complete component inventory  
✅ Clear build roadmap  

### **What's Next:**
🔥 Start with Input component  
🔥 Then Chip component  
🔥 Then continue with primitives  

### **Resources:**
- 📖 [Figma Components Extracted](./FIGMA_COMPONENTS_EXTRACTED.md)
- 📖 [Token Workflow](./TOKEN_WORKFLOW.md)
- 📖 [Token Reference](./TOKENS.md)
- 💻 [Button Component](../src/components/Button.tsx) - Reference implementation

---

**Ready to build?** Start with Input component following the Button.tsx pattern! 🚀

