# Palate Style Guide

A developer reference for building the Palate UI. Every decision here descends from
Dieter Rams' ten principles for good design and the visual language he established
at Braun from 1955 to 1995.

---

## Design Philosophy

> "Less, but better." — Dieter Rams

Rams' work at Braun placed **function above beauty**. Color tells the user something.
Typography stays out of the way. Space gives content room to breathe. Nothing is
decorative — every element earns its place.

### Guiding Principles (applied to Palate)

| Rams Principle | Palate Application |
|---|---|
| Innovative | Use modern web platform features (View Transitions, CSS layers) when they serve users |
| Useful | Every screen answers: what can I do here? |
| Aesthetic | Beauty through proportion, rhythm, and restraint — not ornament |
| Understandable | Self-explanatory UI; no tutorial required |
| Unobtrusive | The archive content is the hero, not the chrome |
| Honest | No fake loading states, no inflated counts, no dark patterns |
| Long-lasting | Neutral palette and classic type that won't date |
| Thorough | Consistent down to focus rings, scrollbar styling, and error states |
| Environmentally conscious | Minimal JS, fast loads, respect battery and bandwidth |
| As little design as possible | Strip to essentials. When in doubt, remove. |

---

## Color Palette

Derived from Braun product colorways — predominantly achromatic with purposeful
accent color. Braun products used neutral blacks, greys, and off-whites as their
base, reserving color for functional signals.

### Semantic Tokens (CSS custom properties)

```css
:root {
  /* --- Surface & Background --- */
  --color-bg-primary:      #F5F3F0;   /* warm off-white, like Braun DR04 casings */
  --color-bg-secondary:    #EDEAE5;   /* slightly deeper warm grey */
  --color-bg-tertiary:     #E1DDD7;   /* card/panel backgrounds */
  --color-bg-inverse:      #2A2522;   /* dark surface, warm-tinted black */

  /* --- Text --- */
  --color-text-primary:    #1C1917;   /* near-black, warm undertone */
  --color-text-secondary:  #57534E;   /* muted body copy */
  --color-text-tertiary:   #A8A29E;   /* captions, timestamps, placeholders */
  --color-text-inverse:    #F5F3F0;   /* text on dark surfaces */

  /* --- Border & Divider --- */
  --color-border-default:  #D6D3CE;   /* subtle, warm grey */
  --color-border-strong:   #A8A29E;   /* emphasized dividers */

  /* --- Accent (functional signal, Braun-orange) --- */
  --color-accent:          #D4600C;   /* inspired by Braun ET 66 / DR06 orange */
  --color-accent-hover:    #B8520A;
  --color-accent-subtle:   #FFF1E6;   /* tinted bg for accent contexts */

  /* --- Status (used sparingly, per Braun convention) --- */
  --color-success:         #5A7A34;   /* muted olive-green */
  --color-warning:         #C07A1A;   /* amber, not yellow */
  --color-error:           #B33B30;   /* Braun red — restrained, not alarming */

  /* --- Interactive --- */
  --color-focus-ring:      #D4600C;   /* accent color, 2px offset */
}
```

### Dark Mode

Invert the surface scale; keep accent consistent. Dark mode uses the inverse
surface as primary and works upward through desaturated warm greys.

```css
[data-theme="dark"] {
  --color-bg-primary:      #1C1917;
  --color-bg-secondary:    #292524;
  --color-bg-tertiary:     #3B3835;
  --color-bg-inverse:      #F5F3F0;

  --color-text-primary:    #F5F3F0;
  --color-text-secondary:  #A8A29E;
  --color-text-tertiary:   #78716C;
  --color-text-inverse:    #1C1917;

  --color-border-default:  #44403C;
  --color-border-strong:   #78716C;

  --color-accent-subtle:   #2E1A0A;
}
```

### Usage Rules

- **No gratuitous color.** If a color doesn't communicate status, hierarchy, or
  interaction, it should be grey.
- **Accent is reserved** for primary actions, active states, and the single most
  important element on screen.
- **Status colors appear only with status meaning** (toasts, validation, badges).

---

## Typography

Braun products used **Akzidenz-Grotesk** — a neutral, geometric sans-serif that
stays invisible. For the web, we use **Inter** as our primary face: it was designed
for screens, supports variable font axes, and shares the same rational geometry.

### Font Stack

```css
:root {
  --font-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}
```

Load Inter as a variable font (`wght` axis 400–700). No italics needed — use
weight changes for emphasis instead.

### Type Scale

A **1.250 ratio** (major third) starting from a 16px base. This produces a compact,
information-dense scale appropriate for an archive UI.

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `--text-xs` | 12px / 0.75rem | 400 | 1.5 | Captions, metadata, timestamps |
| `--text-sm` | 14px / 0.875rem | 400 | 1.5 | Secondary labels, helper text |
| `--text-base` | 16px / 1rem | 400 | 1.6 | Body copy, form inputs |
| `--text-md` | 18px / 1.125rem | 500 | 1.5 | Subheadings, card titles |
| `--text-lg` | 20px / 1.25rem | 600 | 1.4 | Section headings |
| `--text-xl` | 24px / 1.5rem | 600 | 1.3 | Page titles |
| `--text-2xl` | 30px / 1.875rem | 700 | 1.2 | Hero / feature headings |

### Typography Rules

- **All lowercase** for navigation and labels (following Braun's all-lowercase
  convention with Akzidenz-Grotesk).
- **Sentence case** for headings and body text.
- **Never all-caps** except for very short badges (1-2 words max).
- **Letter-spacing:** -0.01em for headings (>=`--text-lg`), 0 for body, +0.02em
  for `--text-xs`.
- **Max line width:** 65ch for body text, 45ch for captions.

---

## Spacing Scale

An **8px base unit** (0.5rem) with a consistent scale. Rams' layouts are defined by
precise, mathematical spacing — never arbitrary.

```css
:root {
  --space-0:    0;
  --space-1:    4px;    /* 0.25rem — tight internal padding */
  --space-2:    8px;    /* 0.5rem  — base unit */
  --space-3:    12px;   /* 0.75rem */
  --space-4:    16px;   /* 1rem    — default padding */
  --space-5:    20px;   /* 1.25rem */
  --space-6:    24px;   /* 1.5rem  — card padding */
  --space-8:    32px;   /* 2rem    — section gaps */
  --space-10:   40px;   /* 2.5rem */
  --space-12:   48px;   /* 3rem    — major section breaks */
  --space-16:   64px;   /* 4rem    — page-level margins */
  --space-20:   80px;   /* 5rem    — hero spacing */
}
```

### Spacing Rules

- Use `--space-6` (24px) as default padding inside cards and panels.
- Use `--space-8` (32px) between sibling sections.
- Use `--space-4` (16px) between related elements (label + input, icon + text).
- Use `--space-2` (8px) as minimum internal gap (e.g., between list items).

---

## Border Radius

Braun products had crisp, engineered edges — not rounded, not sharp. Subtle radii
that feel machined.

```css
:root {
  --radius-none: 0;
  --radius-sm:   2px;    /* inputs, badges */
  --radius-md:   4px;    /* cards, panels, buttons */
  --radius-lg:   6px;    /* modals, larger containers */
  --radius-xl:   8px;    /* image thumbnails */
  --radius-full: 9999px; /* pills, avatars only */
}
```

**Default to `--radius-md` (4px).** Avoid large, bubbly radii. The UI should feel
precise, not playful.

---

## Shadows

Shadows are minimal and warm-tinted. Braun products used physical form and material
contrast rather than heavy shadows. Our shadows suggest subtle elevation only where
needed.

```css
:root {
  --shadow-xs:  0 1px 2px rgba(28, 25, 23, 0.04);
  --shadow-sm:  0 1px 3px rgba(28, 25, 23, 0.06),
                0 1px 2px rgba(28, 25, 23, 0.04);
  --shadow-md:  0 4px 8px rgba(28, 25, 23, 0.06),
                0 2px 4px rgba(28, 25, 23, 0.04);
  --shadow-lg:  0 8px 24px rgba(28, 25, 23, 0.08),
                0 4px 8px rgba(28, 25, 23, 0.04);
  --shadow-xl:  0 16px 48px rgba(28, 25, 23, 0.10),
                0 8px 16px rgba(28, 25, 23, 0.04);
}
```

### Shadow Rules

- Cards at rest: `--shadow-xs` or no shadow (use border instead).
- Cards on hover: `--shadow-sm`.
- Dropdowns, popovers: `--shadow-md`.
- Modals, dialogs: `--shadow-lg`.
- **Never use colored shadows or glows.**

---

## Transitions & Motion

Rams described good design as unobtrusive. Motion should be felt, not seen —
quick, purposeful, and never bouncy.

```css
:root {
  --duration-fast:   100ms;  /* hover states, focus rings */
  --duration-normal: 200ms;  /* expand/collapse, opacity changes */
  --duration-slow:   350ms;  /* page transitions, modals enter/exit */

  --ease-default:    cubic-bezier(0.25, 0.1, 0.25, 1.0);  /* ease-out variant */
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
}
```

### Motion Rules

- All interactive elements get `transition: all var(--duration-fast) var(--ease-default)`.
- **No spring/bounce easing.** Movement is damped and mechanical, like a
  well-engineered dial.
- **Respect `prefers-reduced-motion`:** disable all non-essential transitions.
- Entry animations use opacity + subtle translateY (max 8px). No scale, no rotate.

---

## Layout

### Grid

Use a **12-column grid** with a `24px` gutter (`--space-6`). Max content width:
`1120px`. Side margins collapse to `--space-4` on mobile.

```css
.container {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: var(--space-6);
}
```

### Card Pattern

The card is the primary content unit in Palate (each taste entry is a card).

```
┌──────────────────────────────────┐
│  [image / media]                 │   ← full-bleed, --radius-xl on image
│                                  │
│  Title of Entry                  │   ← --text-md, --space-4 padding-top
│  category · date                 │   ← --text-xs, --color-text-tertiary
│                                  │
│  Brief description or note...    │   ← --text-sm, --color-text-secondary
│                                  │
│  [tag] [tag]                     │   ← --text-xs, --radius-full pills
└──────────────────────────────────┘
     ↑ --radius-md, --shadow-xs, border: 1px solid var(--color-border-default)
       padding: --space-6
```

---

## Iconography

- Use a **single icon set** — prefer Phosphor Icons (light weight, 1.5px stroke).
- Icons are `20px` at default size, `16px` for compact contexts.
- Icon color inherits `currentColor`. Never use multicolor icons.
- Reserve filled variants for active/selected states only.

---

## Interactive States

| State | Treatment |
|---|---|
| Default | Base colors as defined above |
| Hover | Darken surface by one step; e.g., `--color-bg-secondary` on a `--color-bg-primary` element |
| Active/Pressed | Darken by two steps |
| Focus | `2px solid var(--color-focus-ring)` with `2px` offset, no outline on `:focus` (only `:focus-visible`) |
| Disabled | 40% opacity, `cursor: not-allowed`, no hover effect |
| Selected | Accent background (`--color-accent-subtle`) + accent border |

---

## Component Tokens (quick reference)

```css
/* Buttons */
--btn-height:          40px;
--btn-padding-x:       var(--space-5);
--btn-font-size:       var(--text-sm);
--btn-font-weight:     500;
--btn-radius:          var(--radius-md);

/* Inputs */
--input-height:        40px;
--input-padding-x:     var(--space-3);
--input-border:        1px solid var(--color-border-default);
--input-radius:        var(--radius-sm);
--input-bg:            #FFFFFF;

/* Toast / Notification */
--toast-radius:        var(--radius-md);
--toast-shadow:        var(--shadow-md);
--toast-padding:       var(--space-4) var(--space-5);
```

---

## Do / Don't

| Do | Don't |
|---|---|
| Use warm greys from the palette | Use cool blue-greys or pure #808080 |
| Let whitespace do the work | Fill every pixel with content |
| One accent color on screen at a time | Rainbow of colors competing for attention |
| Subtle 1px borders to define edges | Heavy borders or colored outlines |
| Lowercase nav labels | ALL CAPS NAVIGATION |
| 4px border radius | 16px+ bubbly corners |
| Quick, invisible transitions | Bouncy spring animations |
| Phosphor light icons, single weight | Mixed icon sets or emoji as icons |

---

## Sources & References

- Dieter Rams' 10 Principles for Good Design — [Design Museum](https://designmuseum.org/discover-design/all-stories/what-is-good-design-a-quick-look-at-dieter-rams-ten-principles)
- Braun Colour Choices — [Braun Audio](https://www.braun-audio.com/en-GB/stories/design/braun-colour-choices/)
- Dieter Rams Braun CSS Palette — [Xavi Esteve / GitHub](https://gist.github.com/luckyshot/5abf48a396bc2b8d789d8b5199b97c8b)
- Braun Product Colour Palettes — [Smithographic](https://imjustcreative.com/dieter-rams-braun/2023/10/20)
- Rams Principles Applied to Digital — [UX Planet](https://uxplanet.org/applying-dieter-rams-design-principles-for-creating-compelling-digital-products-782b74a3d578)
- Braun Typography (Akzidenz-Grotesk) — [Fonts In Use](https://fontsinuse.com/designers/3001/dieter-rams)
