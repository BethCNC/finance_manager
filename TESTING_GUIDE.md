# Mobile Dashboard Testing Guide

**Status:** ✅ Build Complete - Ready to Test  
**Dev Server:** Starting on http://localhost:3000

---

## 🧪 Testing Checklist

### 1. Visual Verification

Visit `http://localhost:3000/` and verify:

**Header:**
- [ ] Light gray header bar at top
- [ ] "Dashboard" title centered (30px text)
- [ ] Settings icon on right side

**Budget Categories Section:**
- [ ] "Budget Categories" section header (gray box)
- [ ] 10 category progress bars displayed:
  - [ ] Mortgage (pink/red icon)
  - [ ] Bills/Utilities (orange icon)
  - [ ] Home Reno (yellow icon)
  - [ ] George (lime green icon)
  - [ ] Food (emerald green icon)
  - [ ] Auto (cyan icon)
  - [ ] Entertainment (blue icon)
  - [ ] Health (purple icon)
  - [ ] Software (fuchsia icon)
  - [ ] Personal (pink icon)

**Each Progress Bar Should Show:**
- [ ] Category icon (18px, colored)
- [ ] Category name (16px semibold)
- [ ] "$85 of $150" on right
- [ ] Colored progress bar (56% filled)
- [ ] "56%" on left
- [ ] 3 alert circles (gray checkmark, orange warning, gray x)
- [ ] "$65 left" on right

**Savings Goals Section:**
- [ ] "Budget Categories" section header (Note: Should say "Savings Goals" - will fix)
- [ ] 3 goal cards in row:
  - [ ] Emergency Fund - 75% blue circle
  - [ ] Debt Paydown - 50% green circle
  - [ ] Roth IRA - 25% pink circle

**AI Insights Section:**
- [ ] "Budget Categories" section header (Note: Should say "AI Insights" - will fix)
- [ ] Container with gradient background
- [ ] 2 question cards:
  - [ ] "Your subscriptions rose 12%. Want to see why?"
  - [ ] "Your $83 under budget this month. Move that to savings?"

**Quick Actions:**
- [ ] 3 dark gray buttons in row:
  - [ ] "Save More"
  - [ ] "See Transactions"
  - [ ] "Ask AI Advisor"

**Bottom Navigation:**
- [ ] 5 nav items at bottom
- [ ] Home icon highlighted (you're on dashboard)
- [ ] Proper spacing and colors

---

## 🎨 Semantic Token Verification

Open DevTools (Right-click → Inspect Element) and check:

**Select any component and verify computed styles use CSS variables:**

```css
/* Header */
background-color: rgb(226, 232, 240)  /* var(--brand-bg-bg) */
border-color: rgb(209, 213, 219)      /* var(--brand-fg-border) */

/* Progress bars */
background-color: rgb(148, 163, 184)  /* var(--brand-bg-bg-active) for track */

/* Category colors (e.g., Mortgage) */
background-color: rgb(252, 165, 165)  /* #fca5a5 for mortgage */

/* Text */
color: rgb(100, 116, 139)             /* var(--brand-fg-text) */
```

---

## 🐛 Known Issues to Fix

### Issue 1: Section Header Titles
**Current:** All 3 sections say "Budget Categories"  
**Should be:**
- Section 1: "Budget Categories" ✅
- Section 2: "Savings Goals" ❌
- Section 3: "AI Insights" ❌

**Fix:** Update FinancialDashboard.tsx lines with correct titles.

### Issue 2: Question Card Layout
**Current:** Has lightbulb icon  
**Figma:** No icon in mobile view

**Fix:** Remove or make icon optional in dashboard usage.

---

## 🔍 Browser Console

Check for any errors:
```
No errors = ✅ Good to go!
Errors = Need to fix
```

---

## 📱 Mobile Responsiveness

Test at different widths:
- [ ] Mobile (375px) - Primary target
- [ ] Mobile (414px) - Larger phones
- [ ] Tablet (768px) - Should still work
- [ ] Desktop (1024px+) - Falls back gracefully

---

## ⚡ Performance

Check:
- [ ] Page loads quickly
- [ ] No layout shifts
- [ ] Smooth scrolling
- [ ] Button clicks responsive

---

## 🎯 Next Actions

### Immediate Fixes Needed:
1. Fix section header titles in FinancialDashboard.tsx
2. Remove icon from QuestionCard in dashboard usage

### Future Enhancements:
1. Connect to Notion API for real budget data
2. Make progress bars interactive (click to see details)
3. Implement AI question handlers
4. Add loading states
5. Add error handling
6. Connect button actions to real functionality

---

## 🚀 Test Now

```bash
# Server should be running on http://localhost:3000
# Open in browser and verify the checklist above!
```

If everything looks good, you have a fully functional mobile-first dashboard built with semantic tokens from Figma! 🎉

