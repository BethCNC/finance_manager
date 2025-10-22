# Finance Manager Design System

**Source:** Figma - Family Finance Manager
**Last Updated:** 2025-10-13
**Status:** ✅ Fully Integrated

---

## Overview

This design system is extracted from your Figma file and fully integrated into Tailwind CSS. All colors, typography, spacing, and component styles are available as utility classes.

---

## Typography

### Font Family

```css
font-family: 'Figtree', ui-sans-serif, system-ui, -apple-system, sans-serif
```

**Usage:** Applied automatically to all text (configured as default sans font)

### Font Sizes

All sizes match your Figma design with 0em letter-spacing:

| Size | Value | Usage |
|------|-------|-------|
| `text-xs` | 12px | Small labels, metadata |
| `text-sm` | 14px | Body text, secondary info |
| `text-base` | 16px | Default body text |
| `text-lg` | 18px | Large body text |
| `text-xl` | 20px | Small headings |
| `text-2xl` | 24px | Section headings |
| `text-3xl` | 30px | Page headings |
| `text-4xl` | 36px | Hero headings |
| `text-5xl` | 48px | Display text |
| `text-6xl` | 60px | Large display |
| `text-7xl` | 72px | Extra large display |
| `text-8xl` | 96px | Massive display |
| `text-9xl` | 128px | Ultra display |

### Font Weights

| Weight | Value | Class | Usage |
|--------|-------|-------|-------|
| Thin | 100 | `font-thin` | Rarely used |
| Extra Light | 200 | `font-extralight` | Very light text |
| Light | 300 | `font-light` | Light emphasis |
| Regular | 400 | `font-regular` | Body text |
| Medium | 500 | `font-medium` | Subtle emphasis |
| Semi Bold | 600 | `font-semibold` | Headings |
| Bold | 700 | `font-bold` | Strong emphasis |
| Extra Bold | 800 | `font-extrabold` | Very strong |
| Black | 900 | `font-black` | Maximum weight |

### Typography Examples

```jsx
// Small metadata
<p className="text-xs font-medium text-gray-500">Last updated</p>

// Body text
<p className="text-sm font-regular text-gray-700">Description here</p>

// Section heading
<h2 className="text-2xl font-bold text-black">Section Title</h2>

// Page heading
<h1 className="text-3xl font-bold text-black">Welcome Back, Beth</h1>
```

---

## Color System

### Theme Colors

#### Bryan Theme (Blue)
Personal color scheme for Bryan:

| Token | Value | Usage |
|-------|-------|-------|
| `bryan-bg-subtle` | rgb(239, 246, 255) | Lightest bg |
| `bryan` | rgb(219, 234, 254) | Default bg |
| `bryan-bg-hover` | rgb(147, 197, 253) | Hover state |
| `bryan-bg-active` | rgb(96, 165, 250) | Active state |
| `bryan-solid` | rgb(147, 197, 253) | Solid color |
| `bryan-solid-hover` | rgb(0, 129, 241) | Solid hover |
| `bryan-text` | rgb(0, 106, 220) | Text color |
| `bryan-border` | rgb(150, 199, 242) | Border color |

```jsx
// Bryan-themed button
<button className="bg-bryan-solid text-bryan-on-bryan hover:bg-bryan-solid-hover">
  Bryan's Button
</button>
```

#### Beth Theme (Fuchsia/Pink)
Personal color scheme for Beth:

| Token | Value | Usage |
|-------|-------|-------|
| `beth-bg-subtle` | rgb(253, 244, 255) | Lightest bg |
| `beth-bg` | rgb(250, 232, 255) | Default bg |
| `beth-bg-hover` | rgb(240, 171, 252) | Hover state |
| `beth-bg-active` | rgb(245, 208, 254) | Active state |
| `beth-solid` | rgb(232, 121, 249) | Solid color |
| `beth-solid-hover` | rgb(240, 171, 252) | Solid hover |
| `beth-text` | rgb(192, 38, 211) | Text color |
| `beth-border` | rgb(232, 121, 249) | Border color |

```jsx
// Beth-themed card
<div className="bg-beth-bg border border-beth-border rounded-2xl p-6">
  <h3 className="text-beth-text font-bold">Beth's Section</h3>
</div>
```

### Base Colors

#### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | rgb(255, 255, 255) | Default white |
| `bg-base` | rgb(252, 252, 253) | Off-white |
| `bg-subtle` | rgb(249, 249, 251) | Subtle bg |
| `bg-secondary` | rgb(226, 232, 240) | Secondary bg |
| `bg-solid` | rgb(15, 23, 42) | Dark solid |

#### Foreground Colors

| Token | Value | Usage |
|-------|-------|-------|
| `fg` | rgb(10, 10, 10) | Default text |
| `fg-text` | rgb(82, 82, 82) | Secondary text |
| `fg-text-contrast` | rgb(38, 38, 38) | Higher contrast |
| `fg-primary` | rgb(23, 23, 23) | Primary dark |
| `fg-on-primary` | rgb(250, 250, 250) | Text on dark |

### Semantic Colors

#### Success (Green)

```jsx
<div className="bg-success-bg-subtle border border-success-border rounded-xl p-4">
  <p className="text-success-text font-semibold">Transaction completed!</p>
</div>
```

#### Warning (Yellow/Amber)

```jsx
<div className="bg-warning-bg-subtle border border-warning-border rounded-xl p-4">
  <p className="text-warning-text font-semibold">Budget threshold reached</p>
</div>
```

#### Alert (Red)

```jsx
<div className="bg-alert-bg-subtle border border-alert-border rounded-xl p-4">
  <p className="text-alert-text font-semibold">Payment overdue</p>
</div>
```

### Category Colors

Budget category colors with hover/active states:

| Category | Base Color | Hover Color |
|----------|------------|-------------|
| Mortgage | `category-mortgage` rgb(248, 113, 113) | `category-mortgage-hover` |
| Utilities | `category-utilities` rgb(251, 146, 60) | `category-utilities-hover` |
| Home | `category-home` rgb(250, 204, 21) | `category-home-hover` |
| George | `category-george` rgb(163, 230, 53) | `category-george-hover` |
| Food | `category-food` rgb(52, 211, 153) | `category-food-hover` |
| Auto | `category-auto` rgb(34, 211, 238) | `category-auto-hover` |
| Entertainment | `category-entertainment` rgb(96, 165, 250) | `category-entertainment-hover` |
| Health | `category-health` rgb(167, 139, 250) | `category-health-hover` |
| Software | `category-software` rgb(232, 121, 249) | `category-software-hover` |
| Personal | `category-personal` rgb(244, 114, 182) | `category-personal-hover` |
| Fees | `category-fees` rgb(148, 163, 184) | `category-fees-hover` |

```jsx
// Category badge with hover
<span className="bg-category-food text-white px-3 py-1 rounded-full hover:bg-category-food-hover">
  Food & Dining
</span>
```

---

## Layout System

### Mobile Layout (430px width)

Based on Figma dashboard design:

```
┌────────────────────────────┐
│  Header (72px)             │ bg-slate-100
├────────────────────────────┤
│                            │
│  Scrollable Content        │ bg-gray-50
│  (1841px height)           │
│                            │
├────────────────────────────┤
│  Bottom Nav (92px)         │ bg-slate-100
└────────────────────────────┘
```

### Spacing Scale

All spacing matches Figma (in pixels):

```
0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240,
256, 288, 320, 384, 448, 512, 576, 672
```

Usage: `p-4` (16px padding), `m-6` (24px margin), `gap-3` (12px gap)

### Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | No rounding |
| `rounded-sm` | 2px | Minimal |
| `rounded` | 4px | Default |
| `rounded-md` | 6px | Medium |
| `rounded-lg` | 8px | Large |
| `rounded-xl` | 12px | Extra large (buttons) |
| `rounded-2xl` | 16px | Cards |
| `rounded-3xl` | 24px | Large cards |
| `rounded-4xl` | 32px | Very large |
| `rounded-full` | 9999px | Circles |

---

## Component Patterns

### Card Component

```jsx
<div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-black transition-all">
  <h3 className="text-lg font-bold text-black mb-3">Card Title</h3>
  <p className="text-sm text-gray-700">Card content goes here</p>
</div>
```

### Button - Primary

```jsx
<button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
  Primary Action
</button>
```

### Button - Secondary

```jsx
<button className="bg-gray-100 text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
  Secondary Action
</button>
```

### Button - Bryan Theme

```jsx
<button className="bg-bryan-solid text-bryan-on-bryan px-6 py-3 rounded-xl font-semibold hover:bg-bryan-solid-hover transition-all">
  Bryan's Action
</button>
```

### Button - Beth Theme

```jsx
<button className="bg-beth-solid text-beth-on-beth px-6 py-3 rounded-xl font-semibold hover:bg-beth-solid-hover transition-all">
  Beth's Action
</button>
```

### Input Field

```jsx
<input
  type="text"
  placeholder="Enter amount..."
  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:border-black focus:outline-none transition-all"
/>
```

### Badge

```jsx
<span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
  Active
</span>
```

### Progress Bar

```jsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-emerald-500 h-2 rounded-full transition-all"
    style={{width: '65%'}}
  />
</div>
```

### Transaction Item

```jsx
<div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 rounded-full bg-category-food" />
    <div>
      <p className="text-black font-medium text-sm">Grocery Store</p>
      <p className="text-gray-500 text-xs">Food • Oct 13</p>
    </div>
  </div>
  <p className="font-bold text-sm text-black">-$45.20</p>
</div>
```

### Modal Overlay

```jsx
<div className="fixed inset-0 bg-overlay-dark-900 z-50 flex items-center justify-center">
  <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-slide-up">
    <h2 className="text-2xl font-bold text-black mb-4">Modal Title</h2>
    <p className="text-gray-700">Modal content...</p>
  </div>
</div>
```

---

## Animations

### Slide Up (Bottom Sheet)

```jsx
<div className="animate-slide-up">
  Content slides up from bottom
</div>
```

### Slide In Right (Drawer)

```jsx
<div className="animate-slide-in-right">
  Content slides in from right
</div>
```

---

## Design Principles

### Color Usage Guidelines

1. **Black Accents**: Use `text-black` and `bg-black` for primary CTAs and headings
2. **Gray Backgrounds**: Use `bg-gray-50` for page backgrounds, `bg-white` for cards
3. **Slate Navigation**: Use `bg-slate-100` for header and navbar (matches Figma)
4. **Personal Themes**: Use Bryan (blue) and Beth (pink) colors for personal sections
5. **Category Colors**: Use consistent category colors across all budget visualizations

### Typography Guidelines

1. **Headings**: Use `font-bold` or `font-semibold` with `text-black`
2. **Body Text**: Use `font-regular` with `text-gray-700`
3. **Metadata**: Use `text-xs` or `text-sm` with `text-gray-500`
4. **CTAs**: Use `font-semibold` for button text

### Spacing Guidelines

1. **Card Padding**: Use `p-5` or `p-6` (20-24px)
2. **Section Gaps**: Use `gap-4` or `gap-6` (16-24px)
3. **Page Margins**: Use `p-6` or `p-8` (24-32px)
4. **Component Gaps**: Use `gap-2` or `gap-3` (8-12px)

### Border Guidelines

1. **Cards**: Use `rounded-2xl` (16px) with `border border-gray-200`
2. **Buttons**: Use `rounded-xl` (12px)
3. **Inputs**: Use `rounded-xl` (12px)
4. **Modals**: Use `rounded-3xl` (24px)
5. **Badges**: Use `rounded-full`

---

## Responsive Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## Accessibility

### Contrast Ratios

- **Text on White**: Use `text-black` (10, 10, 10) for maximum contrast
- **Secondary Text**: Use `text-gray-700` (55, 65, 81) for readable body text
- **Metadata Text**: Use `text-gray-500` (107, 114, 128) for metadata (minimum 4.5:1)

### Focus States

```jsx
// Accessible focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
  Accessible Button
</button>
```

---

## Summary

✅ **Font**: Figtree (loaded from Google Fonts)
✅ **Colors**: Complete Bryan/Beth themes + semantic colors + category colors
✅ **Typography**: 9 sizes, 9 weights, all configured
✅ **Spacing**: Tailwind scale matching Figma exactly
✅ **Border Radius**: 10 variants from sm to 4xl
✅ **Animations**: Slide-up and slide-in-right
✅ **Responsive**: 5 breakpoints (sm to 2xl)

**Status**: Ready to use! All design tokens are available as Tailwind utility classes.
