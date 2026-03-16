---
title: Standards
description: Coding conventions and style rules for the Palate codebase.
---

# Standards

Conventions that apply across the entire codebase. Follow these consistently — they exist to keep the project legible as a solo build over a long timeframe.

---

## TypeScript

- **Strict mode is on.** Do not disable it.
- **No `any`.** If you cannot type something, use `unknown` and narrow it.
- **Explicit return types on functions** that are not trivially inferred — especially event handlers and composables.
- Types that cross the app/server boundary belong in `shared/types/index.ts`. Do not define the same shape twice.

---

## File and directory naming

| Thing           | Convention                  | Example                          |
| --------------- | --------------------------- | -------------------------------- |
| Vue components  | `PascalCase`                | `ItemCard.vue`                   |
| Pinia stores    | `camelCase` filename        | `items.ts`, `tags.ts`            |
| API route files | Nitro file-route convention | `index.get.ts`, `[id].delete.ts` |
| Directories     | `kebab-case`                | `item-detail/`                   |

---

## API routes

All server routes use Nitro's `defineEventHandler`:

```ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // ...
})
```

Use Nitro's built-in utilities rather than accessing raw Node.js objects:

| Task                | Utility                                |
| ------------------- | -------------------------------------- |
| Read query string   | `getQuery(event)`                      |
| Read request body   | `readBody(event)`                      |
| Read route param    | `getRouterParam(event, 'key')`         |
| Throw HTTP error    | `createError({ statusCode, message })` |
| Set response status | `setResponseStatus(event, 201)`        |

---

## CSS

- **Tailwind v4 utility classes only.** No handwritten CSS rules for layout or visual styling.
- **No inline styles.** `style="..."` on elements is not allowed.
- **Design tokens live in `@theme`** inside `app/assets/css/main.css`. If you need a new colour, spacing value, or font — add it there, not as a hardcoded value.
- **No `tailwind.config.js`.** Configuration is CSS-first via `@theme`.

---

## State management

- **Pinia stores only.** Client-side state lives in `app/stores/`.
- **No prop drilling beyond 2 levels.** If a value needs to travel more than 2 components deep, put it in a store.
- **No Vuex.** No `provide`/`inject` for app-wide state.
- Stores call `$fetch` directly against the Nitro API.

---

## Components

- One component per file.
- Components use `<script setup lang="ts">`.
- Props are typed with `defineProps<{...}>()`.
- Emits are typed with `defineEmits<{...}>()`.
- Keep components under ~150 lines. Split if larger.

---

## Comments

Write comments that explain _why_, not _what_. If the code says what it does clearly, a comment restating it adds noise.
