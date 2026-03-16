---
name: palate-screenshot
description: Take screenshots of all Palate app pages using Playwright to review visual state. Use after UI changes.
disable-model-invocation: true
---

Use Playwright to capture screenshots of the Palate app pages for visual review.

## Prerequisites

The dev server must be running at http://localhost:3000. If it is not, tell the user to start it with `pnpm dev`.

## Steps

1. Navigate to the **home page** (`/`) and wait for content to load. Take a screenshot.
2. Navigate to an **item detail page** (`/item/1` or the first available item link). Take a screenshot.
3. Navigate to the **save page** (`/save`). Take a screenshot.

Use the Playwright MCP tools (browser_navigate, browser_snapshot, browser_take_screenshot) to capture each page.

Set the viewport to 1280x800 for consistent captures.

## Output

Show each screenshot and note any visual issues:
- Layout problems (overflow, misalignment)
- Missing design tokens (raw colors, wrong radii)
- Broken images or empty states
- Accessibility concerns (contrast, focus indicators)

Reference STYLE_GUIDE.md conventions when noting issues.
