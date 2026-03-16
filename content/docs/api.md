---
title: API Routes
description: Reference for all Nitro API endpoints.
---

# API Routes

All routes are Nitro event handlers living under `server/api/`. They are available at `/api/*` and consumed by the Pinia stores via `$fetch`.

In mock mode, handlers operate on the in-memory array from `server/utils/mock-data.ts`. In DB mode, they query PostgreSQL via Drizzle.

---

## Items

### `GET /api/items`

Returns all items for the current user.

**Query parameters:**

| Param  | Type       | Description                  |
| ------ | ---------- | ---------------------------- |
| `type` | `ItemType` | Filter by item type          |
| `tag`  | `string`   | Filter by tag name           |
| `q`    | `string`   | Search title and description |

**Response:**

```ts
Item[]
```

**Example:**

```bash
GET /api/items?type=film&tag=japanese
```

---

### `POST /api/items`

Create a new item.

**Request body:**

```ts
{
  type: ItemType        // required
  title: string         // required
  description?: string
  url?: string
  image_url?: string
  metadata?: Record<string, unknown>
  tags?: string[]       // tag names — created if they don't exist
}
```

**Response:** The created `Item` object.

**Status codes:**

- `201` — created
- `400` — validation error

---

### `GET /api/items/:id`

Returns a single item by ID.

**Response:** `Item`

**Status codes:**

- `200` — found
- `404` — not found

---

### `DELETE /api/items/:id`

Deletes an item by ID. Also removes the corresponding `item_tags` rows.

**Response:** `{ success: true }`

**Status codes:**

- `200` — deleted
- `404` — not found

---

## Tags

### `GET /api/tags`

Returns all tags for the current user, with item counts.

**Response:**

```ts
Array<{
  id: string
  name: string
  count: number // number of items with this tag
}>
```

---

## Error responses

All error responses follow this shape:

```ts
{
  statusCode: number
  message: string
}
```

Thrown via Nitro's `createError` utility:

```ts
throw createError({ statusCode: 404, message: 'Item not found' })
```

## Handler pattern

All handlers follow the same structure:

```ts
// server/api/items/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // ...
  return items
})
```

No Express middleware, no class decorators. Nitro's built-in utilities (`getQuery`, `readBody`, `getRouterParam`, `createError`) cover everything needed.
