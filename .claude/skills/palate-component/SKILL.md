---
name: palate-component
description: Scaffold a new Vue component following Palate conventions (Nuxt 4, Tailwind v4, Dieter Rams aesthetic). Use when creating new components.
disable-model-invocation: true
---

Create a new Vue component for the Palate app: $ARGUMENTS

## Before Writing

1. Read `STYLE_GUIDE.md` for design conventions.
2. Read `BEST_PRACTICES.md` for stack patterns.
3. Read `app/assets/css/main.css` for available design tokens.
4. Look at existing components in `app/components/` for the established patterns.

## Component Conventions

- Use `<script setup lang="ts">` with Composition API.
- Use semantic design tokens from `@theme` for all colors, radii, shadows, and spacing.
- Use Tailwind utility classes, never inline styles.
- Props should be typed with `defineProps<{ ... }>()`.
- Emits should be typed with `defineEmits<{ ... }>()`.
- Keep components small and focused. Extract sub-components if needed.
- Place in the appropriate subdirectory under `app/components/` (e.g., `items/`, `layout/`).

## Design Rules (Dieter Rams Aesthetic)

- Tight border radii: `rounded-sm` (2px) to `rounded-xl` (8px) max.
- Warm neutral palette from design tokens. No bright or saturated colors except the Braun-orange accent.
- Minimal shadows: `shadow-xs`, `shadow-sm`, `shadow-md` only.
- Lowercase labels. Light font weights for headings.
- Generous whitespace. Less is more.
- Focus states use the accent color ring.

## After Writing

1. Verify the component uses only design system tokens (no inline colors or default Tailwind palette).
2. Add a unit test if the component has logic (computed props, event handlers, store interactions).
3. Run `pnpm typecheck` to verify no type errors.
