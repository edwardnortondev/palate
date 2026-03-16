---
name: palate-check
description: Run typecheck, unit tests, and E2E tests for the Palate app. Use when verifying changes are safe.
disable-model-invocation: true
---

Run the full Palate verification pipeline. Report results for each step.

## Current State
- Branch: !`git branch --show-current`
- Uncommitted changes: !`git status --short`

## Steps

1. **TypeScript type check**
   Run `cd /Users/edwardnorton/Development/palate && pnpm typecheck` and report any type errors.

2. **Unit tests (Vitest)**
   Run `cd /Users/edwardnorton/Development/palate && pnpm test:unit` and report pass/fail counts.

3. **E2E tests (Playwright)**
   Check if the dev server is running at localhost:3000. If not, tell the user to start it with `pnpm dev`.
   If it is running, run `cd /Users/edwardnorton/Development/palate && pnpm test:e2e` and report results.

## Output

Summarize results in a table:

| Check | Status | Details |
|-------|--------|---------|
| Typecheck | pass/fail | error count or clean |
| Unit tests | pass/fail | X passed, Y failed |
| E2E tests | pass/fail/skipped | X passed, Y failed |

If any step fails, show the relevant error output and suggest fixes.
