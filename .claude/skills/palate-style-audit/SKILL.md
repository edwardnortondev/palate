---
name: palate-style-audit
description: Audit Vue components against STYLE_GUIDE.md and design system conventions. Use to check design compliance.
disable-model-invocation: true
context: fork
agent: Explore
---

Audit the Palate codebase for design system compliance.

## Reference

Read `STYLE_GUIDE.md` and `app/assets/css/main.css` for the authoritative design tokens and conventions.

## Checks

Scan all `.vue` files in `app/` for these violations:

### 1. Inline Colors
Search for raw hex values (`#[0-9a-fA-F]{3,8}`), `rgb(`, `rgba(`, `hsl(` in template and style sections. All colors must use design tokens from `@theme` (e.g., `bg-bg-primary`, `text-accent`).

### 2. Incorrect Border Radii
Search for `rounded-full`, `rounded-2xl`, `rounded-3xl`, or any radius larger than `rounded-xl` (8px). The Braun aesthetic uses tight, machined radii (2-8px max).

### 3. Default Tailwind Palette
Search for default Tailwind color classes like `bg-red-500`, `text-blue-600`, `border-gray-300`, etc. All colors must come from the Palate design system tokens.

### 4. Typography Conventions
Check that UI labels use lowercase text (`lowercase` class or naturally lowercase text). Headings should use `font-light` or `font-normal`, never `font-bold` on large text.

### 5. Shadow Usage
Check that shadows use the design system tokens (`shadow-xs`, `shadow-sm`, `shadow-md`). No arbitrary shadow values.

### 6. Spacing Consistency
Check for consistent use of spacing scale. Flag any arbitrary spacing values that could use the design system's `spacing-page` token.

## Output

Report findings as a checklist:

- [ ] No inline colors
- [ ] Correct border radii (2-8px)
- [ ] No default Tailwind palette colors
- [ ] Typography follows conventions
- [ ] Shadows use design tokens
- [ ] Spacing is consistent

List specific violations with file paths and line numbers.
