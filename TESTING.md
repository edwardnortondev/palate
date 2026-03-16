# Testing Strategy

Palate uses a two-tier testing approach: unit tests with Vitest and end-to-end tests with Playwright.

## Running Tests

```bash
# Run all tests (unit + e2e)
pnpm test

# Run unit tests only
pnpm test:unit

# Run e2e tests only (requires dev server at localhost:3000)
pnpm test:e2e
```

The Nuxt dev server must be running for E2E tests:

```bash
pnpm dev        # start dev server
pnpm test:e2e   # in another terminal
```

## Unit Tests (Vitest + @nuxt/test-utils)

**Location:** `tests/unit/`

Unit tests run in a simulated Nuxt environment using `@nuxt/test-utils` with `happy-dom`. This gives access to Nuxt auto-imports (`ref`, `$fetch`, etc.) and Pinia stores without a real browser.

### What to test

- **Pinia stores** (`tests/unit/stores/`) — Test state mutations, actions, and API interactions. Use `registerEndpoint` from `@nuxt/test-utils/runtime` to mock API responses.
- **Type exports** (`tests/unit/types.test.ts`) — Verify shared types are properly exported with `expectTypeOf`.

### Patterns

Mock API endpoints in `beforeEach`:

```ts
import { registerEndpoint } from '@nuxt/test-utils/runtime'

beforeEach(() => {
  registerEndpoint('/api/items', {
    method: 'GET',
    handler: () => ({ items: [...], total: 2, page: 1, perPage: 20 }),
  })
})
```

Reset store state in `beforeEach` to isolate tests:

```ts
const store = useItemsStore()
store.items = []
store.total = 0
```

### Configuration

`vitest.config.ts` — Uses `@nuxt/test-utils/config` with `happy-dom` as the DOM environment.

## E2E Tests (Playwright)

**Location:** `tests/e2e/`

E2E tests run against the live dev server with a real Chromium browser.

### What to test

- Page loads and content visibility
- Filter interactions (type filters, tag filters)
- Search functionality
- Navigation between pages
- Form submission and redirects
- Delete actions and redirects

### Patterns

Wait for content before asserting:

```ts
await page.goto('/')
await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()
```

Use exact text matching when needed to avoid ambiguity:

```ts
await expect(page.getByText('braun', { exact: true })).toBeVisible()
```

For actions that trigger navigation, use generous timeouts:

```ts
await expect(page).toHaveURL('/', { timeout: 15000 })
```

### Important notes

- The app uses in-memory mock data. POST and DELETE operations persist in memory for the duration of the server process. If tests mutate data, order matters.
- Tests run serially (`workers: 1`) to avoid mock data race conditions.
- Only Chromium is configured. Add Firefox/WebKit projects to `playwright.config.ts` if needed.

### Configuration

`playwright.config.ts` — Targets `http://localhost:3000`, single worker, Chromium only.

## Adding New Tests

1. **Store logic** — Add to `tests/unit/stores/`. Mock endpoints, test state changes.
2. **New pages/features** — Add E2E tests to `tests/e2e/`. Test the user-visible behavior.
3. **Shared utilities/types** — Add unit tests to `tests/unit/`.
