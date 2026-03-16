---
title: Getting Started
description: How to set up and run Palate locally.
---

# Getting Started

## Prerequisites

- **Node.js** 22 or later
- **pnpm** (preferred package manager)
- **PostgreSQL** — optional for initial exploration; the app runs on mock data by default

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url> palate
cd palate
pnpm install
```

## Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The only required variable for DB mode is:

```
DATABASE_URL=postgresql://user:password@localhost:5432/palate
```

You do not need to set this to run the app. See [Mock mode](#mock-mode) below.

## Running locally

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Mock mode

The app currently runs entirely on mock data. No database connection is required to explore the UI or develop against the API.

Mock data lives in `server/utils/mock-data.ts` and provides 8 sample items across several types (image, quote, film, music, place). The API routes consume this data when no real DB is configured.

This means you can clone the repo, run `pnpm dev`, and have a fully functional UI immediately.

## Database setup

When you are ready to connect a real PostgreSQL database:

**1. Generate migrations from the Drizzle schema:**

```bash
pnpm db:generate
```

**2. Run migrations against your database:**

```bash
pnpm db:migrate
```

**3. Open Drizzle Studio to inspect your data:**

```bash
pnpm db:studio
```

Drizzle Studio will be available at `https://local.drizzle.studio`.

## Scripts reference

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | Start the Nuxt development server            |
| `pnpm build`       | Build for production                         |
| `pnpm preview`     | Preview the production build                 |
| `pnpm db:generate` | Generate Drizzle migration files from schema |
| `pnpm db:migrate`  | Run pending migrations                       |
| `pnpm db:studio`   | Open Drizzle Studio                          |
