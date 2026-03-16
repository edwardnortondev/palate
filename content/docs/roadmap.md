---
title: Roadmap
description: What's done, what's next, and what's on the backburner.
---

# Roadmap

Current status: scaffold complete, Braun/Rams design system applied, TDD pipeline in place.

---

## Done

- [x] Project init (Nuxt 4, TypeScript, Tailwind v4)
- [x] Drizzle schema (users, items, tags, item_tags, sessions)
- [x] Mock data layer with 8 sample items
- [x] API routes: `GET/POST /api/items`, `GET/DELETE /api/items/[id]`, `GET /api/tags`
- [x] Pinia stores: items, tags
- [x] Shared types (`Item`, `Tag`, `ItemType`, `CreateItemInput`)
- [x] Core UI: layout, masonry grid, item detail view, save form
- [x] Braun/Dieter Rams design system (warm neutrals, semantic tokens, lowercase labels)
- [x] Vitest unit tests (16) + Playwright E2E tests (14)
- [x] Project documentation (CLAUDE.md, STYLE_GUIDE.md, TESTING.md, BEST_PRACTICES.md)
- [x] Claude Code skills (palate-check, palate-screenshot, palate-style-audit, palate-component)
- [x] Integrated docs via Nuxt Content (you're reading them)

---

## Next up

- [ ] Auth — session-based, simple. No OAuth for MVP. Login, logout, session cookie.
- [ ] Real DB connection — swap mock data for Drizzle queries in the API handlers
- [ ] Image upload — store to object storage (provider TBD), write `image_url` to item
- [ ] Taste portrait — surface patterns from accumulated tags, show what you reach for most

---

## Backburner

These are planned but not blocking the MVP:

- [ ] Browser extension (WXT) — save to Palate directly from any page
- [ ] Payments (Paddle) — if Palate becomes a product; no SaaS features built until needed
- [ ] void.cloud deployment config — Nuxt 4 build targeting Cloudflare Workers via void.cloud

---

## Not planned

- Social features of any kind
- Public profiles or sharing
- Algorithm-driven recommendations
- Mobile app (the web app should be sufficient on mobile)
