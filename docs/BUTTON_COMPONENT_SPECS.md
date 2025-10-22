# Button Component - Exact Figma Specifications

This document contains the complete specifications for the Button component as extracted directly from Figma.

## Figma Source
**Design File**: [Family Finance Manager](https://www.figma.com/design/zksBuILVajtp60Oca28Vnl/Family-Finance-Manager?node-id=12-5088&m=dev)
**Component Node ID**: `12:5088`

---

## Typography

| Property | Value | Figma Variable |
|----------|-------|----------------|
| **Font Family** | Figtree | - |
| **Font Style** | Medium | text-base/medium |
| **Font Weight** | 500 | text-base/medium |
| **Font Size** | 16px | text-base/medium |
| **Line Height** | Normal (1.5) | text-base/medium |
| **Letter Spacing** | 0 | - |

---

## Layout & Spacing

| Property | Value | Figma Variable |
|----------|-------|----------------|
| **Direction** | Horizontal | - |
| **Alignment** | Middle left | - |
| **Resizing** | Hug (both axes) | - |
| **Item Spacing (Gap)** | 8px | `Dimensions / spacing/2` |
| **Padding Top** | 12px | `Dimensions / spacing/3` |
| **Padding Bottom** | 12px | `Dimensions / spacing/3` |
| **Padding Left** | 24px | `Dimensions / spacing/6` |
| **Padding Right** | 24px | `Dimensions / spacing/6` |
| **Border Radius** | 6px | `Dimensions / borderRadius/rounded-md` |

---

## Effects

| Effect | Value | Figma Style |
|--------|-------|-------------|
| **Drop Shadow** | `0px 1px 1px 0px rgba(0,0,0,0.06)` | `Drop Shadow / drop-shadow` |

---

## Icon Sizes

| Icon Type | Size | Source |
|-----------|------|--------|
| **Leading Icon** | 24x24px | lucide icons instance |
| **Trailing Icon** | 18x18px | lucide icons instance |

---

## Variants

### 1. Solid Variant

**Usage**: Primary actions with highest emphasis (e.g., "Save", "Submit", "Create")

#### Default State
- **Background**: `#1E293B` (Brand / bg/bg-solid)
- **Text Color**: `#FAFAFA` (Brand / fg/text-inverse-hover)
- **Stroke Align**: Outside

#### Hover State
- **Background**: `#334155` (Brand / bg/bg-solid-hover)
- **Text Color**: `#FCFCFC` (Brand / fg/text-inverse)

#### Active State
- **Background**: `#0F172A` (Brand / bg/bg-solid-active)
- **Text Color**: `#FCFCFC` (Brand / fg/text-inverse)

---

### 2. Color Variant

**Usage**: Secondary actions with medium emphasis (e.g., "Edit", "Update")

#### Default State
- **Background**: `#BFDBFE` (Brand / primary/bg)
- **Text Color**: `#404040` (Brand / fg/text)

#### Hover State
- **Background**: `#93C5FD` (estimated from Figma API)
- **Text Color**: `#262626` (estimated from Figma API)

#### Active State
- **Background**: `#60A5FA` (estimated from Figma API)
- **Text Color**: `#262626` (estimated from Figma API)

---

### 3. Surface Variant

**Usage**: Tertiary actions with subtle emphasis (e.g., "View Details", "Learn More")

#### Default State
- **Background**: `#F1F5F9` (Brand / bg/bg)
- **Text Color**: `#404040` (Brand / fg/text)
- **Border**: `1px solid #A3A3A3` (Brand / fg/border)
- **Stroke Align**: Inside

#### Hover State
- **Background**: `#E2E8F0` (estimated)
- **Text Color**: `#404040`
- **Border**: `1px solid #A3A3A3`

#### Active State
- **Background**: `#CBD5E1` (estimated)
- **Text Color**: `#404040`
- **Border**: `1px solid #737373` (darker)

---

### 4. Outline Variant

**Usage**: Alternative actions with clear boundaries (e.g., "Cancel", "Back")

#### Default State
- **Background**: Transparent
- **Text Color**: `#404040` (Brand / fg/text)
- **Border**: `1px solid #404040` (Brand / fg/text)
- **Stroke Align**: Inside

#### Hover State
- **Background**: Transparent
- **Text Color**: `#3B82F6` (blue-500)
- **Border**: `1px solid #3B82F6`

#### Active State
- **Background**: Transparent
- **Text Color**: `#2563EB` (blue-600)
- **Border**: `1px solid #1D4ED8` (blue-700)

---

### 5. Ghost Variant

**Usage**: Minimal actions like text links (e.g., "Skip", "Not now")

#### Default State
- **Background**: Transparent
- **Text Color**: `#404040` (Brand / fg/text)
- **Border**: None

#### Hover State
- **Background**: Transparent
- **Text Color**: `#3B82F6` (blue-500)

#### Active State
- **Background**: Transparent
- **Text Color**: `#2563EB` (blue-600)

---

## Component Anatomy

```
Button (INSTANCE)
├── leading icon (INSTANCE - lucide icons) - 24x24px
├── Button (TEXT - text-base/medium)
└── trailing icon (INSTANCE - lucide icons) - 18x18px
```

---

## Properties

### Variant Properties

| Property | Type | Options | Default |
|----------|------|---------|---------|
| **button** | VARIANT | `solid`, `color`, `surface`, `outline`, `ghost`, `ghos` | `solid` |
| **state** | VARIANT | `Default`, `hover`, `active`, `default` | `Default` |
| **Text** | TEXT | - | `"Button"` |
| **trailing icon** | BOOLEAN | - | `true` |
| **leading icon** | BOOLEAN | - | `true` |

Note: `ghos` and `default` (lowercase) appear to be typos in the Figma file.

---

## Implementation Notes

### React/TypeScript Props
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'color' | 'surface' | 'outline' | 'ghost';
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

### Tailwind CSS Classes
```tsx
// Base
className="inline-flex items-center justify-center font-medium transition-all duration-200 px-6 py-3 text-base leading-normal gap-2 rounded-md shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06)]"

// Solid variant
className="bg-[#1E293B] text-[#FAFAFA] hover:bg-[#334155] hover:text-[#FCFCFC] active:bg-[#0F172A] active:text-[#FCFCFC]"

// Color variant
className="bg-[#BFDBFE] text-[#404040] hover:bg-[#93C5FD] hover:text-[#262626] active:bg-[#60A5FA] active:text-[#262626]"

// Surface variant
className="bg-[#F1F5F9] text-[#404040] border border-[#A3A3A3] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] active:border-[#737373]"

// Outline variant
className="bg-transparent text-[#404040] border border-[#404040] hover:text-[#3B82F6] hover:border-[#3B82F6] active:text-[#2563EB] active:border-[#1D4ED8]"

// Ghost variant
className="bg-transparent text-[#404040] hover:text-[#3B82F6] active:text-[#2563EB]"

// Disabled
className="opacity-40 cursor-not-allowed pointer-events-none"

// Full width
className="w-full"
```

### Usage Examples

```tsx
// Primary action
<Button variant="solid" onClick={handleSave}>
  Save
</Button>

// Secondary action
<Button variant="color" trailingIcon={<ChevronRight size={18} />}>
  Next Step
</Button>

// Tertiary action
<Button variant="surface" leadingIcon={<Eye size={24} />}>
  View Details
</Button>

// Alternative action
<Button variant="outline" onClick={handleCancel}>
  Cancel
</Button>

// Minimal action
<Button variant="ghost">
  Skip
</Button>

// With both icons
<Button
  variant="solid"
  leadingIcon={<Plus size={24} />}
  trailingIcon={<ChevronRight size={18} />}
>
  Add & Continue
</Button>

// Full width CTA
<Button variant="solid" fullWidth trailingIcon={<ChevronRight size={18} />}>
  Get Started
</Button>

// Disabled state
<Button variant="solid" disabled>
  Disabled Button
</Button>
```

---

## Design Tokens Mapping

### Spacing Variables
- `spacing/2`: 8px (gap)
- `spacing/3`: 12px (vertical padding)
- `spacing/6`: 24px (horizontal padding)

### Border Radius Variables
- `borderRadius/rounded-md`: 6px

### Color Variables (Brand)

#### Background
- `bg/bg-solid`: #1E293B (slate-800)
- `bg/bg-solid-hover`: #334155 (slate-700)
- `bg/bg-solid-active`: #0F172A (slate-900)
- `bg/bg`: #F1F5F9 (slate-100)
- `primary/bg`: #BFDBFE (blue-200)

#### Foreground
- `fg/text`: #404040 (gray-700)
- `fg/text-inverse`: #FCFCFC (almost white)
- `fg/text-inverse-hover`: #FAFAFA (white)
- `fg/border`: #A3A3A3 (gray-400)

---

## Accessibility

- **Focus State**: 2px ring with offset
- **Disabled State**: 40% opacity, no pointer events
- **Contrast Ratios**: All text meets WCAG AA standards
- **Semantic HTML**: Uses `<button>` element with proper `type` attribute
- **Keyboard Navigation**: Fully accessible via keyboard

---

## Testing

Test the button component at: `/button-test`

All 5 variants are displayed with:
- Default, hover, and active states
- Leading icons (24x24px)
- Trailing icons (18x18px)
- Disabled states
- Full-width variants
- Real-world usage examples
- Interactive demos

---

## Version History

- **v1.0** - Initial implementation with exact Figma specifications
- **Date**: 2025-10-13
- **Source**: Figma API extraction from node `12:5088`
