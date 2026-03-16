---
title: Database
description: PostgreSQL schema, Drizzle ORM setup, and migrations.
---

# Database

## Overview

Palate uses **PostgreSQL** with **Drizzle ORM**. The schema is defined in TypeScript at `db/schema/index.ts`. Migrations are generated and run via the Drizzle Kit CLI.

The app does not require a database to run — see [Mock mode](/docs/architecture#mock-mode-vs-db-mode) for details.

## Schema

### `users`

Palate is a single-user app. The `users` table exists to support the auth session model and future multi-device use.

| Column          | Type           | Notes                                    |
| --------------- | -------------- | ---------------------------------------- |
| `id`            | `uuid`         | Primary key, default `gen_random_uuid()` |
| `email`         | `varchar(255)` | Unique                                   |
| `password_hash` | `text`         | Hashed with bcrypt                       |
| `created_at`    | `timestamp`    | Default `now()`                          |

### `items`

The core table. One row per saved item.

| Column        | Type           | Notes                                      |
| ------------- | -------------- | ------------------------------------------ |
| `id`          | `uuid`         | Primary key                                |
| `user_id`     | `uuid`         | FK to `users.id`                           |
| `type`        | `item_type`    | Enum: see below                            |
| `title`       | `varchar(255)` | Required                                   |
| `description` | `text`         | Optional                                   |
| `url`         | `text`         | Optional — source URL                      |
| `image_url`   | `text`         | Optional — stored image                    |
| `metadata`    | `jsonb`        | Type-specific extras (e.g. director, year) |
| `created_at`  | `timestamp`    | Default `now()`                            |
| `updated_at`  | `timestamp`    | Updated on write                           |

### `tags`

A flat list of tags per user.

| Column    | Type           | Notes            |
| --------- | -------------- | ---------------- |
| `id`      | `uuid`         | Primary key      |
| `user_id` | `uuid`         | FK to `users.id` |
| `name`    | `varchar(100)` | Unique per user  |

### `item_tags`

Join table linking items to tags. Many-to-many.

| Column    | Type   | Notes            |
| --------- | ------ | ---------------- |
| `item_id` | `uuid` | FK to `items.id` |
| `tag_id`  | `uuid` | FK to `tags.id`  |

Primary key is `(item_id, tag_id)`.

### `sessions`

Session-based auth. No JWT, no OAuth.

| Column       | Type        | Notes                |
| ------------ | ----------- | -------------------- |
| `id`         | `uuid`      | Primary key          |
| `user_id`    | `uuid`      | FK to `users.id`     |
| `token`      | `text`      | Unique session token |
| `expires_at` | `timestamp` | Session expiry       |
| `created_at` | `timestamp` | Default `now()`      |

## `item_type` enum

```
image | link | quote | film | music | place | fashion
```

Defined as a Postgres native enum via Drizzle's `pgEnum`.

## Relations

```
users ──< items ──< item_tags >── tags
users ──< tags
users ──< sessions
```

All foreign keys cascade on delete.

## Drizzle config

`drizzle.config.ts` at the project root points to the schema and sets the output directory for migrations:

```ts
export default defineConfig({
  schema: './db/schema/index.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

## Migrations workflow

```bash
# After changing db/schema/index.ts:
pnpm db:generate   # Generates a new SQL migration file in db/migrations/

# Apply migrations to the connected database:
pnpm db:migrate

# Inspect data interactively:
pnpm db:studio
```

Never edit generated migration files by hand. If you need to undo a migration, write a new one.
