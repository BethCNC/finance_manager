# Figma → Code Workflow
**Repeatable process for converting Figma components to React/TypeScript**

Last Updated: 2025-10-21
Project: Finance Manager

---

## 🎯 Workflow Overview

This document outlines the exact steps to take a Figma component design and convert it into production-ready React code that follows our design system and code style guide.

## 📋 Prerequisites

- [x] Figma file access: `zksBuILVajtp60Oca28Vnl`
- [x] Figma MCP configured with API key
- [x] `tokens.json` in project root
- [x] `CLAUDE.md` code style guide reviewed

---

## 🔄 The Workflow (7 Steps)

### **Step 1: Access Figma Design**

**Tools:** Figma Dev Mode

1. Open component in Figma
2. Add `&m=dev` to URL to enter Dev Mode
3. Select specific component node
4. Note the node-id from URL (e.g., `node-id=43-13875`)

**Example URL:**
```
https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=43-13875&m=dev
```

---

### **Step 2: Extract Design Specifications**

**Tools:** Figma Inspect Panel (right sidebar in Dev Mode)

Extract the following from Figma Inspector:

#### **Layout**
- [ ] Container type (Frame, Auto Layout, etc.)
- [ ] Direction (Horizontal/Vertical)
- [ ] Alignment (Top/Middle/Bottom, Left/Center/Right)
- [ ] Sizing (Fixed/Hug/Fill)
- [ ] Width/Height values

#### **Spacing**
- [ ] Padding (top, right, bottom, left)
- [ ] Gap/Item spacing
- [ ] Margin (if any)

#### **Typography**
- [ ] Font family
- [ ] Font size
- [ ] Font weight
- [ ] Line height
- [ ] Letter spacing
- [ ] Text alignment
- [ ] Text case (if any)

#### **Colors**
- [ ] Background fill
- [ ] Text color
- [ ] Border color (if any)
- [ ] Icon color

#### **Effects**
- [ ] Border radius
- [ ] Shadows (drop shadow, inner shadow)
- [ ] Opacity
- [ ] Blur

#### **Component States**
Extract specs for EACH state:
- [ ] **Default** state
- [ ] **Hover** state
- [ ] **Active/Selected** state
- [ ] **Focus** state
- [ ] **Disabled** state (if applicable)

**Document Format:**
```
Component: Nav Item
Node ID: 43-13875

=== DEFAULT STATE ===
Layout: Horizontal auto layout, hug contents, middle center
Padding: 12px vertical, 16px horizontal
Gap: 8px
Border Radius: 8px

Typography:
- Font: Figtree
- Size: 14px (text-sm)
- Weight: 500 (medium)
- Line height: normal

Colors:
- Background: transparent
- Text: #6B7280 (Gray-500)
- Icon: #6B7280 (Gray-500)

=== HOVER STATE ===
Background: #F3F4F6 (Gray-100)

=== ACTIVE STATE ===
Background: #1F2937 (Gray-800)
Text: #FFFFFF (white)
Icon: #FFFFFF (white)
Font weight: 600 (semibold)
```

---

### **Step 3: Map Figma Values to tokens.json**

**Tools:** `tokens.json`, Figma color picker

For each color/spacing value extracted:

1. **Find matching token** in `tokens.json`
   - Search for hex value
   - Check `Brand` tokens first
   - Fall back to `Tailwind Colors`
   - Use `Semantic` tokens for states (success, error, etc.)

2. **Document token mapping**

```
Figma Value → Token → Tailwind Class
--------------------------------------
#6B7280      → Gray.500   → text-gray-500
#F3F4F6      → Gray.100   → bg-gray-100
14px         → text-sm    → text-sm
500 weight   → medium     → font-medium
8px          → spacing-2  → gap-2
```

**Decision Point:** Hex vs Tailwind Classes?
- Check existing components (Button.tsx uses hex values)
- If component needs **exact** Figma fidelity → use hex + comments
- If component uses **standard** tokens → use Tailwind classes

---

### **Step 4: Create Component Structure**

**Location:** `src/components/ui/[ComponentName].tsx`

**Template:**

```typescript
import React from 'react';
import {Link} from 'react-router-dom'; // if navigation component

interface [ComponentName]Props {
  // Define props based on Figma variants
  variant?: 'default' | 'active' | 'disabled';
  // Add other props
}

/**
 * [ComponentName] Component
 *
 * Figma: Family Finance Manager
 * Node ID: [insert-node-id]
 *
 * Design Specs:
 * - Layout: [from Step 2]
 * - Padding: [from Step 2]
 * - Typography: [from Step 2]
 *
 * Token Mapping:
 * - Default text: Gray.500 → text-gray-500
 * - Active bg: Gray.800 → bg-gray-800
 */
const [ComponentName]: React.FC<[ComponentName]Props> = ({
  variant = 'default',
  // other props
}) => {
  // Component logic

  // Base styles from Figma
  const baseStyles = `
    flex items-center
    gap-2
    px-4 py-3
    rounded-lg
    font-medium text-sm
    transition-colors
  `.replace(/\s+/g, ' ').trim();

  // Variant styles from Figma states
  const variantStyles = {
    default: 'text-gray-500',
    active: 'bg-gray-800 text-white',
    disabled: 'opacity-40 cursor-not-allowed'
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`}>
      {/* Component content */}
    </button>
  );
};

export default [ComponentName];
export {[ComponentName]};
```

---

### **Step 5: Implement Following Code Style Guide**

**Reference:** `CLAUDE.md`

Apply these **NON-NEGOTIABLE** rules:

#### ✅ Arrow Functions
```typescript
// ✅ Correct
(param) => {...}
({name, value}) => {...}

// ❌ Wrong
param => {...}
{name, value} => {...}
```

#### ✅ Object Braces - Minimal Spacing
```typescript
// ✅ Correct
const obj = {name, value}
const {data, loading} = useHook()

// ❌ Wrong
const obj = { name, value }
const { data, loading } = useHook()
```

#### ✅ Styling - Only Tailwind
```typescript
// ✅ Correct
className="bg-gray-50 text-black"

// ❌ Wrong - No inline styles
style={{backgroundColor: '#F9FAFB'}}

// ❌ Wrong - No custom CSS files
import './styles.css'
```

#### ✅ TypeScript Interfaces
```typescript
// ✅ Define interfaces for all props
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}
```

---

### **Step 6: Test Component**

Create a test/showcase file to verify:

1. **Visual Accuracy**
   - [ ] Matches Figma design pixel-perfect
   - [ ] All states render correctly (default, hover, active, disabled)
   - [ ] Spacing matches Figma specs
   - [ ] Typography matches (font, size, weight)

2. **Functionality**
   - [ ] Props work as expected
   - [ ] Variants switch correctly
   - [ ] Interactive states work (hover, click, focus)
   - [ ] Accessibility (keyboard navigation, ARIA labels)

3. **Code Quality**
   - [ ] Follows CLAUDE.md style guide
   - [ ] TypeScript errors resolved
   - [ ] No console warnings
   - [ ] Component under 200 lines

**Test Command:**
```bash
npm run build
# Check for TypeScript errors
```

---

### **Step 7: Document Component**

Add to component file:

1. **Figma reference** (node-id, link)
2. **Design specs** (layout, spacing, colors)
3. **Token mapping** (Figma → tokens.json)
4. **Usage example** in JSDoc comment
5. **Props documentation**

**Example Documentation:**

```typescript
/**
 * NavItem Component
 *
 * Navigation item for bottom nav or sidebar. Supports icons, labels,
 * active states, and badges.
 *
 * @example
 * ```tsx
 * <NavItem
 *   icon={<HomeIcon />}
 *   label="Home"
 *   href="/"
 *   active={true}
 *   badge={3}
 * />
 * ```
 *
 * Figma: https://www.figma.com/design/zksBuILVajtp60Oca28Vnl?node-id=43-13875
 *
 * Design Specs:
 * - Layout: Horizontal, middle-center, hug
 * - Padding: 12px vert, 16px horiz
 * - Gap: 8px
 * - Border radius: 8px (rounded-lg)
 * - Typography: Figtree, 14px/500 (text-sm/medium)
 *
 * Token Mapping:
 * - Text default: Gray.500 → text-gray-500
 * - Text active: White → text-white
 * - BG active: Gray.800 → bg-gray-800
 * - BG hover: Gray.100 → bg-gray-100
 */
```

---

## 🎨 Design System Considerations

### When to Use Hex Colors vs Tailwind Classes

**Use Hex Colors (like Button.tsx):**
- When Figma design uses custom brand colors not in Tailwind
- When exact color fidelity is critical
- When color is from `Brand` tokens in tokens.json
- Add comments documenting the Figma variable name

```typescript
// Brand / bg/bg-solid (#1E293B)
bg-[#1E293B]

// Brand / primary/bg (#BFDBFE)
bg-[#BFDBFE]
```

**Use Tailwind Classes:**
- When color exactly matches Tailwind default
- For standard grays, blacks, whites
- For semantic colors (success, warning, error)

```typescript
bg-gray-50
text-black
border-gray-200
text-emerald-600  // success
text-red-600      // error
```

### Typography Mapping

```
Figma → tokens.json → Tailwind
--------------------------------
12px  → text-xs     → text-xs
14px  → text-sm     → text-sm
16px  → text-base   → text-base
18px  → text-lg     → text-lg
20px  → text-xl     → text-xl
24px  → text-2xl    → text-2xl

400   → regular     → font-normal
500   → medium      → font-medium
600   → semibold    → font-semibold
700   → bold        → font-bold
```

### Spacing Mapping

```
Figma → Tailwind
----------------
2px   → 0.5  (spacing-0.5)
4px   → 1    (spacing-1)
8px   → 2    (spacing-2)
12px  → 3    (spacing-3)
16px  → 4    (spacing-4)
20px  → 5    (spacing-5)
24px  → 6    (spacing-6)
```

---

## 📝 Workflow Checklist

Use this for each component:

### Pre-Development
- [ ] Figma file accessible
- [ ] Component node-id identified
- [ ] Dev mode enabled
- [ ] Component specs extracted
- [ ] tokens.json reviewed
- [ ] Similar components reviewed for patterns

### Development
- [ ] Component file created in correct location
- [ ] TypeScript interface defined
- [ ] Props match Figma variants
- [ ] Styles extracted from Figma
- [ ] Tokens mapped correctly
- [ ] Code follows CLAUDE.md style guide
- [ ] States implemented (default, hover, active, disabled)
- [ ] Component documented with Figma reference

### Testing
- [ ] Visual comparison with Figma (screenshot)
- [ ] All states tested
- [ ] TypeScript build passes
- [ ] No console errors
- [ ] Accessibility checked
- [ ] Works in BottomNav/MenuDrawer integration

### Documentation
- [ ] Added to component library doc
- [ ] Usage examples written
- [ ] Token mapping documented
- [ ] Figma link added to component file

---

## 🔧 Tools Reference

### Figma MCP Commands
```bash
# Check MCP status
claude mcp list

# Get Figma MCP details
claude mcp get figma
```

### File Locations
- **Components:** `src/components/ui/`
- **Tokens:** `tokens.json`
- **Style Guide:** `CLAUDE.md`
- **Component Docs:** `docs/COMPONENT_LIBRARY.md`
- **This Workflow:** `docs/FIGMA_TO_CODE_WORKFLOW.md`

---

## 📊 Example: Nav Item Component

Let's apply this workflow to create the Nav Item component:

**Figma:** `node-id=43-13875`

**Step 1-2: Specs Extracted** *(Pending - needs Figma access)*

**Step 3: Token Mapping** *(Draft based on existing code)*

```typescript
// From BottomNav.tsx analysis:
Default text: #6B7280 → Gray.500 → text-gray-700
Active text:  #000000 → Black    → text-black
Icon size:    22px    → size={22}
Text size:    12px    → text-xs
Font weight:  500     → font-medium
Gap:          4px     → gap-1
Padding:      12px/12px → px-3 py-1
Border:       8px     → rounded-lg
```

**Step 4-7:** *(Next steps - implement component)*

---

## ✨ Best Practices

1. **Always reference Figma node-id** in component documentation
2. **Comment exact Figma variable names** when using hex colors
3. **Match spacing/sizing exactly** - don't approximate
4. **Document all states** - especially hover/active/disabled
5. **Keep components under 200 lines**
6. **Export both default and named** - `export default X; export {X};`
7. **Use TypeScript interfaces** - no `any` types
8. **Follow CLAUDE.md rules** - non-negotiable

---

## 🚀 Next Steps

**For Nav Item component:**
1. Access Figma design at node-id 43-13875
2. Extract exact specs (layout, colors, states)
3. Map to tokens.json
4. Create `src/components/ui/NavItem.tsx`
5. Test in BottomNav.tsx
6. Document and commit

**For future components:**
- Use this workflow for each new component
- Update token mappings as needed
- Build component library incrementally
- Keep documentation up-to-date
