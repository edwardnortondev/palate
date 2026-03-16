# Palate — Agent Rules

Palate is a private taste archive — a single-page Nuxt 4 app where users save images, quotes, links, films, music, places, and fashion items they love. The aesthetic is Dieter Rams / Braun: warm neutrals, functional minimalism, nothing decorative.

## Stack

- **Framework:** Nuxt 4 (Vue 3, Nitro, file-based routing)
- **State:** Pinia stores in `app/stores/`
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme` in `app/assets/css/main.css`)
- **Database:** PostgreSQL via Drizzle ORM (schema in `db/schema/index.ts`)
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Types:** Shared across app/server in `shared/types/index.ts`
- **Package manager:** pnpm

## Project structure

```
palate/
  app/                  # Nuxt 4 frontend
    assets/css/main.css # Tailwind entry + design tokens (@theme)
    components/         # Vue components (auto-imported, pathPrefix: false)
      layout/           # AppHeader.vue
      items/            # ItemCard.vue, ItemGrid.vue, FilterBar.vue
    layouts/            # default.vue (seeds stores on mount)
    pages/              # index.vue, save.vue, item/[id].vue
    stores/             # items.ts, tags.ts (Pinia)
    composables/        # Reusable Vue composables
    app.vue             # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
  server/
    api/                # Nitro route handlers (file-based)
      items/            # index.get.ts, index.post.ts, [id].get.ts, [id].delete.ts
      tags/             # index.get.ts
    utils/              # db.ts (Drizzle client), mock-data.ts (in-memory fixtures)
  shared/types/         # index.ts — single source of truth for Item, Tag, ItemType, etc.
  db/
    schema/index.ts     # Drizzle table definitions (users, items, tags, itemTags, sessions)
    migrations/         # Drizzle-kit generated migrations
  tests/
    unit/               # Vitest tests (stores, types)
    e2e/                # Playwright tests (user-visible behavior)
```

## Commands

```bash
pnpm dev              # Start dev server at localhost:3000
pnpm build            # Production build
pnpm typecheck        # Run nuxt typecheck
pnpm test             # Run all tests (vitest + playwright)
pnpm test:unit        # Unit tests only (vitest)
pnpm test:e2e         # E2E tests only (requires dev server running)
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run Drizzle migrations
```

## Mock mode vs DB mode

By default, the app runs in **mock mode** — API routes import from `server/utils/mock-data.ts` and operate on an in-memory array. No database required. Set `DATABASE_URL` to switch to real PostgreSQL via Drizzle.

Mock data mutates in memory. POST/DELETE persist until the server restarts.

## Code conventions

### TypeScript
- Strict mode is on. Never disable it.
- Never use `any`. Use `unknown` and narrow.
- Types shared between app and server go in `shared/types/index.ts`. Never duplicate type definitions.

### Vue components
- Always use `<script setup lang="ts">`.
- Type props with `defineProps<{...}>()`, emits with `defineEmits<{...}>()`.
- Keep components under ~150 lines. Split if larger.
- One component per file.

### Imports
- Nuxt auto-imports components, composables, and Nitro utilities. Do not manually import these (e.g., `ref`, `computed`, `useRoute`, `$fetch`, `defineEventHandler`, `getQuery`).
- Explicitly import: third-party packages, `shared/types`, Pinia stores, and types from `shared/`.
- No barrel files. Import directly from the source file.

### File naming
- Vue components: `PascalCase.vue` (e.g., `ItemCard.vue`)
- Pinia stores: `camelCase.ts` (e.g., `items.ts`)
- API routes: Nitro convention (e.g., `index.get.ts`, `[id].delete.ts`)
- Directories: `kebab-case`

### API routes
- Use `defineEventHandler` from Nitro. No Express, no Nest.js.
- Use Nitro utilities: `getQuery()`, `readBody()`, `getRouterParam()`, `createError()`, `setResponseStatus()`.
- Return typed responses matching `shared/types/` interfaces.

### State management
- All client state lives in Pinia stores (`app/stores/`).
- Stores call `$fetch` against the Nitro API. No direct DB access from the client.
- No Vuex. No `provide`/`inject` for app-wide state.
- No prop drilling beyond 2 levels — use a store.

## Styling rules

### Tailwind CSS v4
- All design tokens are defined in `app/assets/css/main.css` under `@theme`. There is no `tailwind.config.js`.
- Use Tailwind utility classes for all layout and visual styling.
- When a design token exists (e.g., `--color-bg-primary`, `--color-accent`, `--radius-md`), use it via Tailwind classes like `bg-bg-primary`, `text-accent`, `rounded-md`. Reference `@theme` tokens, not hardcoded values.
- To add a new token, add it to `@theme` in `main.css`.

### Design system (Dieter Rams / Braun)
The full design system is documented in `STYLE_GUIDE.md`. Key rules:

- **Colors:** Warm neutrals (off-whites, warm greys, warm blacks). Accent is Braun-orange (`#D4600C`), reserved for primary actions and active states only. No gratuitous color.
- **Typography:** Inter variable font. Lowercase for nav labels. Sentence case for headings. Never all-caps except very short badges.
- **Spacing:** 8px base unit. Use the spacing scale (`--space-2` through `--space-20`).
- **Border radius:** Default `4px` (`--radius-md`). Crisp, not bubbly. No large rounded corners.
- **Shadows:** Warm-tinted, minimal. Cards at rest use `--shadow-xs` or border only. No colored shadows or glows.
- **Motion:** Fast (100ms) for hover/focus, 200ms for expand/collapse, 350ms for page transitions. No spring/bounce easing. Respect `prefers-reduced-motion`.
- **Icons:** Phosphor Icons (light weight, 1.5px stroke). 20px default, 16px compact. Single color via `currentColor`.
- **Focus:** `:focus-visible` only (not `:focus`). 2px solid accent ring with 2px offset.

### What NOT to do with styling
- No inline `style="..."` attributes. Use Tailwind classes and design tokens.
- No cool blue-greys or pure greys. Use warm-tinted greys from the palette.
- No bouncy/spring animations.
- No mixed icon sets or emoji as icons.
- No 16px+ border radius (bubbly corners).

## Testing

### Unit tests (Vitest)
- Location: `tests/unit/`
- Config: `vitest.config.ts` (uses `@nuxt/test-utils/config` with `happy-dom`)
- Mock API endpoints with `registerEndpoint` from `@nuxt/test-utils/runtime`
- Reset store state in `beforeEach` to isolate tests
- Test stores, composables, types, and utilities

### E2E tests (Playwright)
- Location: `tests/e2e/`
- Config: `playwright.config.ts` (Chromium only, single worker, serial execution)
- Requires dev server running at `localhost:3000`
- Tests run serially (`workers: 1`) because mock data is shared in-memory
- Use generous timeouts for navigation assertions (up to 15000ms)
- Test user-visible behavior: page loads, filter interactions, search, form submission, navigation

### Adding tests
- New store logic: add to `tests/unit/stores/`
- New pages/features: add E2E tests to `tests/e2e/`
- New utilities/types: add unit tests to `tests/unit/`

## Database schema

Tables defined in `db/schema/index.ts`:
- `users` — id, email, passwordHash, timestamps
- `items` — id, userId, type, title, description, imageUrl, sourceUrl, content, notes, timestamps
- `tags` — id, userId, name, slug, createdAt
- `item_tags` — join table (itemId, tagId composite PK)
- `sessions` — id, userId, token, expiresAt, createdAt

All IDs are UUIDs. Cascade deletes are set on foreign keys.

## Data types

```ts
type ItemType = 'image' | 'link' | 'quote' | 'film' | 'music' | 'place' | 'fashion'

interface Item {
  id: string
  type: ItemType
  title?: string
  description?: string
  imageUrl?: string
  sourceUrl?: string
  content?: string
  notes?: string
  tags: Tag[]
  savedAt: string   // ISO date string
  updatedAt: string
}

interface Tag { id: string; name: string; slug: string; count?: number }
```

## API routes

| Method | Path | Handler file | Description |
|--------|------|-------------|-------------|
| GET | `/api/items` | `index.get.ts` | List items (supports `type`, `tag`, `search`, `page`, `perPage` query params) |
| POST | `/api/items` | `index.post.ts` | Create item (body: `CreateItemInput`) |
| GET | `/api/items/:id` | `[id].get.ts` | Get single item |
| DELETE | `/api/items/:id` | `[id].delete.ts` | Delete item (returns 204) |
| GET | `/api/tags` | `index.get.ts` | List all tags with item counts, sorted by count desc |

## Documentation

VitePress docs live in `/Users/edwardnorton/Development/palate-docs/` (separate repo). Contains architecture overview, API reference, database docs, standards, and roadmap.

## Comments

Write comments that explain *why*, not *what*. If the code is clear, don't add a comment restating it.
