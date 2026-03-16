---
title: Architecture
description: How Palate is structured — Nuxt 4, Nitro, Pinia, Drizzle.
---

# Architecture

## Overview

Palate is a single Nuxt 4 application. The frontend, API, and server-side logic all live in one repo. There is no separate backend service.

```
palate/
├── app/          # Nuxt 4 frontend (Vue, Pinia, Tailwind)
├── server/       # Nitro API routes and server utilities
├── shared/       # Types shared across app and server
└── db/           # Drizzle schema and migrations
```

## Nuxt 4 conventions

Nuxt 4 introduces the `app/` directory as the primary location for frontend code. This separates application code from server code clearly.

| Directory          | Purpose                                 |
| ------------------ | --------------------------------------- |
| `app/pages/`       | File-based routing                      |
| `app/components/`  | Vue components                          |
| `app/layouts/`     | Page layout wrappers                    |
| `app/composables/` | Reusable Vue composables                |
| `app/stores/`      | Pinia state stores                      |
| `app/assets/css/`  | Global CSS (Tailwind entry point)       |
| `server/api/`      | Nitro API route handlers                |
| `server/utils/`    | Server-only utilities (DB, mock data)   |
| `shared/types/`    | Types accessible in both app and server |

Auto-imports apply to both `app/` and `server/`. Components, composables, and utilities are available without explicit imports.

## Nitro API

All API routes are defined in `server/api/` using Nitro's file-based routing. Each file exports a `defineEventHandler` handler.

Route files map directly to URL paths:

| File                              | Route                   |
| --------------------------------- | ----------------------- |
| `server/api/items/index.get.ts`   | `GET /api/items`        |
| `server/api/items/index.post.ts`  | `POST /api/items`       |
| `server/api/items/[id].get.ts`    | `GET /api/items/:id`    |
| `server/api/items/[id].delete.ts` | `DELETE /api/items/:id` |
| `server/api/tags/index.get.ts`    | `GET /api/tags`         |

There is no Express, no Nest.js, no separate server process. Nitro handles all of this.

## Shared types

`shared/types/index.ts` is the single source of truth for types used on both the client and server. Nuxt 4 makes this directory available in both contexts without any configuration.

Key types defined there: `Item`, `Tag`, `ItemType`, `CreateItemInput`.

Because both sides import from the same file, the API contract is enforced by TypeScript across the boundary.

## Mock mode vs DB mode

The app has two data modes, controlled by whether a `DATABASE_URL` is set.

**Mock mode** (default):

- `server/utils/mock-data.ts` exports an in-memory array of sample items and tags
- API routes import from `mock-data.ts` and operate on this array
- No database required
- Changes do not persist between server restarts

**DB mode**:

- `server/utils/db.ts` initialises a Drizzle ORM client connected to PostgreSQL via `DATABASE_URL`
- API routes import from `db.ts` and execute real queries
- The schema in `db/schema/index.ts` defines all tables

Switching between modes is a matter of which utility the route handlers import. The plan is to consolidate this behind a service layer as the app matures.

## Tailwind CSS v4

Palate uses Tailwind CSS v4 with the CSS-first configuration model. There is no `tailwind.config.js`.

All configuration — design tokens, custom properties, theme values — is defined in `app/assets/css/main.css` using the `@theme` directive:

```css
@import 'tailwindcss';

@theme {
  --color-bg-primary: #f5f3f0;
  --color-bg-secondary: #edeae5;
  --color-accent: #d4600c;
  --font-family-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  /* ... */
}
```

The `@tailwindcss/vite` plugin handles the build integration. Utility classes are generated from these token definitions.

## State management

Pinia manages all client-side state. Two stores exist:

- **`items.ts`** — the full item collection, loading state, active filters, and CRUD actions
- **`tags.ts`** — the tag list, used for the filter UI and the save form

Stores call the Nitro API via `$fetch`. No direct DB access from the client.

## Deployment

Palate will be deployed to **void.cloud**, an early-access Cloudflare-backed hosting platform built around Vite-native projects. Nuxt 4 is a supported target.

The deployment model is a single command push. The Nitro server output is deployed as a Cloudflare Worker; static assets go to Cloudflare's CDN. No separate server to manage.
