# Palate Best Practices

Stack-specific patterns and conventions for the Palate project. Reference this when writing or reviewing code.

---

## Nuxt 4

### Directory Structure

Nuxt 4 separates app code from server code with a clear boundary:

```
app/           # Client-side: pages, components, layouts, stores, composables
server/        # Server-side: API routes, utils, middleware (Nitro)
shared/        # Shared between app and server: types, constants, validation
db/            # Database schema (Drizzle)
```

- `app/` is the source of truth for all client-side code. Pages, components, layouts, stores, composables, and assets all live here.
- `server/` contains Nitro server routes and utilities. Files in `server/utils/` are auto-imported within server context.
- `shared/` is for code used by both app and server (types, validation schemas, constants). Never import app or server code from shared.

### Auto-imports

Nuxt 4 auto-imports Vue APIs (`ref`, `computed`, `watch`), Nuxt composables (`$fetch`, `useRoute`, `navigateTo`), and files from `app/composables/` and `server/utils/`. Do not manually import these.

### API Routes

Server API routes follow the `server/api/<resource>/<params>.<method>.ts` convention:

```
server/api/items/index.get.ts    # GET /api/items
server/api/items/index.post.ts   # POST /api/items
server/api/items/[id].get.ts     # GET /api/items/:id
server/api/items/[id].delete.ts  # DELETE /api/items/:id
```

Each route exports a default `defineEventHandler`. Use `getQuery`, `readBody`, and `getRouterParam` for input. Return data directly (Nitro serializes it).

### Runtime Config

Access environment variables through `useRuntimeConfig()`, never `process.env` directly:

```ts
// server-side
const { databaseUrl } = useRuntimeConfig()

// client-side (only public values)
const { public: { apiBase } } = useRuntimeConfig()
```

---

## Tailwind CSS v4

### @theme for Design Tokens

All design tokens are defined in CSS using `@theme` in `app/assets/css/main.css`. This replaces `tailwind.config.js` entirely.

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #F5F3F0;
  --color-accent: #D4600C;
  --radius-md: 4px;
}
```

Tokens defined in `@theme` generate corresponding utility classes (e.g., `bg-bg-primary`, `text-accent`, `rounded-md`).

### When to Use @theme vs :root

- **@theme**: For tokens that should generate utility classes. This is the default for colors, spacing, radii, shadows, and fonts.
- **:root** or `@layer base`: For CSS custom properties that do not need utility classes (e.g., animation durations, z-index scales).

### Palette Conventions

- Use semantic color tokens (`bg-primary`, `text-secondary`, `border-default`) instead of raw hex values.
- Never use inline colors or Tailwind's default palette (`bg-red-500`). All colors come from the Palate design system.
- Radii are intentionally tight (2-8px) to match the Braun/Dieter Rams aesthetic. Do not use `rounded-full` or large radii on containers.

### Gradient Syntax

Tailwind v4 renamed gradient utilities: use `bg-linear-to-*` instead of `bg-gradient-to-*`.

---

## Drizzle ORM

### Schema Conventions

Schemas live in `db/schema/index.ts`. Follow these patterns:

- Use `uuid` primary keys with `.defaultRandom()`.
- Use `snake_case` for database column names, `camelCase` for TypeScript field names (Drizzle handles the mapping).
- Always include `createdAt` and `updatedAt` timestamps with `.defaultNow()`.
- Define indexes for columns used in WHERE clauses and foreign key lookups.
- Use `references(() => table.column, { onDelete: 'cascade' })` for foreign keys.

### Relations

Define relations separately from tables using `relations()`:

```ts
export const itemsRelations = relations(items, ({ one, many }) => ({
  user: one(users, { fields: [items.userId], references: [users.id] }),
  itemTags: many(itemTags),
}))
```

Relations enable the relational query API (`db.query.items.findMany({ with: { itemTags: true } })`).

### Query Patterns

- **Simple queries**: Use the SQL-like API (`db.select().from(items).where(eq(items.id, id))`).
- **Nested/relational queries**: Use the relational API (`db.query.items.findMany({ with: { ... } })`).
- **Filtering**: Compose conditions with `and()` / `or()` from `drizzle-orm`.
- **Pagination**: Use `.limit()` and `.offset()`.

### Database Access

The database client is initialized in `server/utils/db.ts` and auto-imported in server routes. Never create database connections outside of server context.

---

## Pinia Stores

### Composition API Pattern

All stores use the setup/composition syntax:

```ts
export const useItemsStore = defineStore('items', () => {
  // State
  const items = ref<Item[]>([])
  const loading = ref(false)

  // Getters (computed)
  const itemCount = computed(() => items.value.length)

  // Actions (functions)
  async function fetchItems() { ... }

  return { items, loading, itemCount, fetchItems }
})
```

### Conventions

- Name stores with `use<Name>Store` prefix.
- Use `ref()` for state, `computed()` for derived state, plain functions for actions.
- Keep API calls inside store actions, not in components.
- Handle loading and error states within the store.
- Use `$fetch` (Nuxt's built-in) for API calls, not `axios` or `fetch`.
- Reset state in test `beforeEach` blocks to isolate tests.

### Accessing Stores in Components

```ts
const store = useItemsStore()

// For template reactivity when destructuring:
const { items, loading } = storeToRefs(store)
```

Use `storeToRefs()` when destructuring reactive state. Actions can be destructured directly.

---

## Testing

### Unit Tests (Vitest)

- Location: `tests/unit/`
- Environment: `@nuxt/test-utils` with `happy-dom`
- Mock API endpoints with `registerEndpoint` from `@nuxt/test-utils/runtime`
- Test stores by exercising actions and asserting state changes
- Use `expectTypeOf` for type-level assertions on shared types

### E2E Tests (Playwright)

- Location: `tests/e2e/`
- Runs against live dev server at `localhost:3000`
- Use stable locators: prefer `data-testid`, `getByRole`, `getByText` over CSS selectors
- Never use hard waits (`page.waitForTimeout`). Use Playwright's built-in auto-waiting via `expect(...).toBeVisible()` and similar assertions
- Tests run serially (single worker) because the app uses in-memory mock data
- Test user-visible behavior, not implementation details

### Test Organization

```
tests/
  unit/
    stores/        # Pinia store tests
    types.test.ts  # Shared type export tests
  e2e/
    app.spec.ts    # Full app E2E flows
```

### Running Tests

```bash
pnpm test:unit    # Vitest unit tests
pnpm test:e2e     # Playwright E2E (dev server must be running)
pnpm test         # Both sequentially
pnpm typecheck    # TypeScript type checking
```

---

## General Conventions

- **TypeScript strict mode** is enabled. No `any` types.
- **Shared types** go in `shared/types/index.ts` and are used by both app and server.
- **Components** are auto-imported without path prefix (`pathPrefix: false` in nuxt.config).
- **Layouts** use the default layout in `app/layouts/default.vue`.
- **Images** use the `@nuxt/image` module with `<NuxtImg>` component.
- **No inline styles or colors**. All visual properties use design tokens from the Tailwind @theme.
