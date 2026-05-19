# Portfolio Design System

## Overview

This document defines the design system, component patterns, and visual language used throughout the Sara Jakubowicz portfolio. The system emphasizes clarity, accessibility, and smooth interactions while maintaining a modern, professional aesthetic.

---

## Color Palette

### Primary Colors

| Color | Value | Usage |
|-------|-------|-------|
| Purple | `#C084FC` / `rgb(192, 132, 252)` | Primary accent, profile glow, hover states |
| Blue | `#3B82F6` | Research projects, secondary accent |
| Teal/Cyan | `#06B6D4` | Tertiary accent, transitions |
| Indigo | `#6366F1` | Design projects, gradients |
| Pink | `#EC4899` | Accent gradients, hover states |
| Rose | `#F43F5E` | Strong accents, CTAs |

### Neutral Colors

| Color | Value | Usage |
|-------|-------|-------|
| Dark Gray | `#1F2937` | Text, backgrounds |
| Medium Gray | `#6B7280` | Secondary text, borders |
| Light Gray | `#F3F4F6` | Backgrounds, subtle dividers |
| White | `#FFFFFF` | Primary background |

### Semantic Colors

| Color | Usage |
|-------|-------|
| `rgba(192, 132, 252, 0.1)` | Subtle backgrounds, focus states |
| `rgba(59, 130, 246, 0.1)` | Research project backgrounds |
| `rgba(99, 102, 241, 0.18)` | Blob overlays, animations |

---

## Typography

### Type Scale

| Role | Font Size | Line Height | Weight | Usage |
|------|-----------|-------------|--------|-------|
| **H1** | 48px / 3rem | 1.2 | 700 | Page headings |
| **H2** | 36px / 2.25rem | 1.3 | 700 | Section headings |
| **H3** | 24px / 1.5rem | 1.4 | 600 | Card titles, subheadings |
| **Body Large** | 18px / 1.125rem | 1.6 | 400 | Intro text, descriptions |
| **Body** | 16px / 1rem | 1.6 | 400 | Standard paragraph text |
| **Body Small** | 14px / 0.875rem | 1.6 | 400 | Secondary text, labels |
| **Label** | 12px / 0.75rem | 1.5 | 500 | Badge labels, metadata |

### Font Family

- **Primary:** System fonts (Segoe UI, Roboto, etc.) via CSS system stack
- **Fallback:** San Francisco (macOS), Helvetica, Arial
- **Weight:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Minimal spacing, icon gaps |
| `sm` | 8px | Small component padding |
| `md` | 12px | Standard padding |
| `lg` | 16px | Card padding, medium gaps |
| `xl` | 24px | Section spacing |
| `2xl` | 32px | Large gaps |
| `3xl` | 48px | Page margins, hero spacing |

---

## Components

### Buttons

#### Primary Button (CTA)
```css
Background: Gradient (blue → cyan)
Text: White, semibold
Padding: 12px 24px
Border Radius: 8px
Hover: Opacity increase, slight shadow
Transition: 200ms ease-in-out
```

#### Secondary Button (Navigation)
```css
Background: Transparent
Border: 1px solid medium-gray
Text: Medium gray, regular
Padding: 10px 20px
Border Radius: 8px
Hover: Background light-gray, text darker
```

#### Icon Button
```css
Size: 40px × 40px
Background: Transparent
Padding: 8px
Hover: Background light-gray
Border Radius: 8px
```

### Cards

#### Project Card
```css
Background: White / Dark background
Border Radius: 12px
Padding: 24px
Shadow: 0 4px 6px rgba(0,0,0,0.1)
Hover: 
  - Shadow increases (0 20px 25px rgba(0,0,0,0.15))
  - Transform: translateY(-2px)
  - Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
Border: 1px solid rgba(200,200,200,0.2)
```

#### Tag/Badge
```css
Background: rgba(192, 132, 252, 0.1)
Text: Purple, 12px, semibold
Padding: 6px 12px
Border Radius: 20px
```

### Input Fields

#### Text Input
```css
Border: 1px solid medium-gray
Padding: 12px 16px
Border Radius: 8px
Font: Body, 16px
Focus: 
  - Border color: Purple
  - Box shadow: 0 0 0 3px rgba(192,132,252,0.1)
  - Transition: 150ms ease-out
Placeholder: Light gray
```

#### Textarea
```css
Border: 1px solid medium-gray
Padding: 12px 16px
Border Radius: 8px
Min Height: 120px
Font: Body, 16px
Focus: Same as text input
```

### Navigation

#### Header
```css
Height: 64px
Background: White / Dark with slight transparency
Sticky: position fixed, top 0, z-index 40
Padding: 16px 24px
Display: Flex, space-between align
Backdrop: blur(10px), semi-transparent
```

#### Mobile Menu
```css
Position: Fixed
Inset: 64px 0 0 0
Background: White
Z-index: 30
Animation: slideIn from left, 200ms ease-out
```

#### Breadcrumb
```css
Font: Small, medium-gray
Separator: " / "
Active: darker gray, semibold
Hover: underline
```

---

## Animations & Transitions

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Entrance animations |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |

### Common Animations

#### Page Transition
```css
Duration: 300ms
Easing: ease-out
Opacity: 0 → 1
Transform: translateY(10px) → translateY(0)
```

#### Hover Effect (Cards)
```css
Duration: 300ms
Easing: ease-in-out
Transform: translateY(-4px)
Box-shadow: increase
```

#### Glow Animation (Profile)
```css
Duration: 3s
Easing: ease-in-out
Loop: infinite
Effect: Pulsing box-shadow with purple accent
```

#### SVG Stroke Animation
```css
Duration: 850ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Effect: stroke-dasharray animation (drawing effect)
```

### Micro-interactions

- **Button Press**: 50ms scale down (0.98), then scale back up
- **Input Focus**: 150ms border color change + shadow glow
- **Link Hover**: 200ms underline animation
- **Tooltip**: 150ms fade in, 100ms fade out
- **Menu Open/Close**: 200ms slide + fade

---

## Responsive Breakpoints

| Breakpoint | Width | Device |
|------------|-------|--------|
| `mobile` | 320px - 640px | iPhone, small phones |
| `tablet` | 641px - 1024px | iPad, tablets |
| `desktop` | 1025px+ | Laptop, desktop |

### Grid Layouts

| Breakpoint | Columns | Gap | Padding |
|------------|---------|-----|---------|
| Mobile | 1 column | 16px | 16px |
| Tablet | 2 columns | 24px | 24px |
| Desktop | 3 columns (projects), 2 columns (research) | 32px | 32px-48px |

---

## Glassmorphism Effect

```css
Background: rgba(255, 255, 255, 0.8) / rgba(0, 0, 0, 0.1)
Backdrop Filter: blur(10px)
Border: 1px solid rgba(255, 255, 255, 0.2)
Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
```

### Usage
- Chat panel background
- Modal overlays
- Premium cards
- Navigation headers

---

## Accessibility Standards

### Color Contrast
- **WCAG AA:** Minimum 4.5:1 for text
- **WCAG AAA:** Minimum 7:1 for text
- **Status:** All text colors meet AA standards

### Interactive Elements
- **Minimum touch target:** 44px × 44px (mobile)
- **Focus indicator:** 2px outline, purple color
- **Focus visibility:** Always visible on keyboard navigation

### Motion & Animation
- **Reduced motion support:** All animations respect `prefers-reduced-motion` media query
- **Animation duration:** Max 300ms for transitions
- **Vestibular motion:** Avoid parallax, diagonal scrolling

### Typography
- **Dynamic Type:** Text scales with system settings
- **Line height:** Minimum 1.5 for body text
- **Font size:** Minimum 16px on mobile

---

## Icons

### Library
- **Source:** Lucide React
- **Size variants:** 16px, 20px, 24px, 32px, 48px
- **Stroke width:** 2px (standard)
- **Color:** Inherits from parent text color or explicit fill

### Common Icons

| Icon | Usage |
|------|-------|
| `ArrowRight` | CTAs, next actions |
| `ArrowLeft` | Back navigation |
| `Mail` | Email contact |
| `Linkedin` | Social link |
| `Github` | Code repository |
| `Sparkles` | AI/Featured content |
| `Play` | Video/demo trigger |
| `Menu` | Mobile navigation |
| `X` | Close, dismiss |
| `ChevronDown` | Expand/collapse |

---

## Dark Mode

### Dark Theme Colors

| Element | Light | Dark |
|---------|-------|------|
| Background | `#FFFFFF` | `#0F172A` |
| Surface | `#F9FAFB` | `#1E293B` |
| Text Primary | `#1F2937` | `#F1F5F9` |
| Text Secondary | `#6B7280` | `#94A3B8` |
| Border | `#E5E7EB` | `#334155` |

### Implementation
- CSS media query: `@media (prefers-color-scheme: dark)`
- Applied to root `:root` variables
- All colors have light/dark variants

---

## Content Guidelines

### Writing Style

- **Tone:** Professional but conversational
- **Clarity:** Prioritize specificity over eloquence
- **Metrics:** Always quantify impact when possible
- **Voice:** Active voice, second person ("you can...") where appropriate

### Case Study Structure

1. **Challenge** - Problem statement (1-2 sentences)
2. **Research** - Methodology and insights (2-3 paragraphs)
3. **Solution** - Design response with specifics (2-3 paragraphs)
4. **Validation** - Testing, metrics, user feedback (1-2 paragraphs)
5. **Impact** - Key outcomes and learning (1 paragraph)

### Formatting

- **Bold** for emphasis on key metrics
- **Links** in emerald/teal for calls-to-action
- **Lists** for scannable information
- **Code blocks** for technical details (monospace font)
- **Blockquotes** for user quotes

---

## Imagery & Media

### Screenshot Guidelines

- **File format:** PNG (transparency), JPG (photos)
- **Dimensions:** Scale to content width (max 1200px)
- **Compression:** Optimized for web (<200KB per image)
- **Alt text:** Descriptive for accessibility
- **Captions:** Optional, placed below media

### Video & Demos

- **Format:** MP4 with H.264 codec
- **Duration:** 15-60 seconds preferred
- **Autoplay:** Muted only, no audio by default
- **Thumbnail:** High-contrast still frame

### Figma Embeds

- **Aspect ratio:** 16:9 or 1:1 depending on content
- **Framing:** Zoom to specific artboards
- **Interaction:** Allow prototype mode if available

---

## Component Library (Code Examples)

### React/JSX Patterns

#### Button Component
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
  Primary Action
</button>
```

#### Card Component
```jsx
<div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
  {/* Content */}
</div>
```

#### Tag Component
```jsx
<span className="px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">
  Design
</span>
```

---

## Performance Considerations

- **CSS-in-JS:** Tailwind CSS with PostCSS
- **Image optimization:** Cloudinary or similar CDN
- **Lazy loading:** Images below the fold use native lazy loading
- **Code splitting:** React pages loaded on demand
- **Animation performance:** Use `transform` and `opacity` for 60fps animations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-18 | Initial design system documentation |

---

## Designer & Developer Notes

- Maintain consistent spacing using the spacing scale
- Use the easing functions for all transitions
- Test color contrast against WCAG AA standards
- Respect `prefers-reduced-motion` for all users
- Always provide alternative text for images
- Use semantic HTML for accessibility
- Keep components modular and reusable
