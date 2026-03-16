---
name: palate-conventions
description: Palate project coding conventions and design system rules. Apply automatically when writing or reviewing code.
user-invocable: false
---

## Stack

- Nuxt 4 (Vue 3, Composition API, TypeScript strict)
- Tailwind CSS v4 (CSS-first config with @theme)
- Drizzle ORM (PostgreSQL)
- Pinia 3 (composition API stores)
- Vitest + Playwright for testing

## Code Style

- `<script setup lang="ts">` for all Vue components.
- Composition API only. No Options API.
- Auto-imports: do not manually import `ref`, `computed`, `watch`, `$fetch`, `useRoute`, `navigateTo`, etc.
- Stores use `defineStore('name', () => { ... })` setup syntax.
- Server routes use `defineEventHandler`.
- Shared types live in `shared/types/index.ts`.

## Design System

- All colors, radii, shadows, and fonts come from `@theme` tokens in `app/assets/css/main.css`.
- Never use inline hex colors, `rgb()`, or default Tailwind palette classes (`bg-red-500`).
- Border radii: 2-8px only (`rounded-sm` through `rounded-xl`). Never `rounded-full` on containers.
- Shadows: `shadow-xs`, `shadow-sm`, `shadow-md` only.
- Typography: lowercase UI labels, light font weights for headings, Inter font family.
- Accent color (Braun-orange `#D4600C`) is for interactive elements and focus states only.

## File Organization

- Components: `app/components/<domain>/` (auto-imported, no path prefix)
- Pages: `app/pages/`
- Stores: `app/stores/`
- Layouts: `app/layouts/`
- API routes: `server/api/<resource>/`
- Server utilities: `server/utils/` (auto-imported in server context)
- Database schema: `db/schema/`
- Shared types: `shared/types/`
- Unit tests: `tests/unit/`
- E2E tests: `tests/e2e/`

## Testing

- Mock API endpoints with `registerEndpoint` from `@nuxt/test-utils/runtime`.
- Reset store state in `beforeEach`.
- E2E tests use Playwright with auto-waiting assertions. No hard waits.
- Prefer `data-testid`, `getByRole`, `getByText` over CSS selectors.
