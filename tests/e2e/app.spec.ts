import { test, expect } from '@playwright/test'

// Mock data lives in server memory. The save and delete tests mutate it, so
// this suite must run against a freshly started dev server (`pnpm dev`).
// Tests run serially (workers: 1) to keep ordering predictable.

test.describe('Home page', () => {
  test('loads with mock items visible', async ({ page }) => {
    await page.goto('/')
    // Verify a cross-section of mock items render (these are never mutated by other tests)
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()
    await expect(page.locator('text=In the Mood for Love')).toBeVisible()
    await expect(page.locator('text=A Winged Victory for the Sullen')).toBeVisible()
  })

  test('shows header with palate wordmark', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header').getByRole('link', { name: 'palate' })).toBeVisible()
  })

  test('shows save button in header', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: '+ save' })).toBeVisible()
  })
})

test.describe('Type filters', () => {
  test('clicking Images filter shows only image items', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()

    await page.getByRole('button', { name: 'images' }).click()
    // Wait for filtered results
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()
    await expect(page.locator('text=Tadao Ando')).toBeVisible()
    await expect(page.locator('text=Isamu Noguchi Table')).toBeVisible()
    // Quote should not be visible
    await expect(page.locator('text=Good design is as little')).not.toBeVisible()
  })

  test('clicking All filter shows all items', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'images' }).click()
    await page.getByRole('button', { name: 'all' }).click()
    // All items should be visible again
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()
    await expect(page.locator('text=In the Mood for Love')).toBeVisible()
  })
})

test.describe('Tag filters', () => {
  test('clicking a tag filters items by that tag', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()

    // Click the 'melancholy' tag filter
    await page.locator('button', { hasText: 'melancholy' }).first().click()
    // Items with melancholy tag should be visible
    await expect(page.locator('text=In the Mood for Love')).toBeVisible()
    await expect(page.locator('text=A Winged Victory')).toBeVisible()
    // Items without melancholy tag should not be visible
    await expect(page.locator('text=Braun T3 Pocket Radio')).not.toBeVisible()
  })
})

test.describe('Search', () => {
  test('searching filters items by query', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()

    const searchInput = page.getByPlaceholder('search your archive')
    await searchInput.fill('Braun')
    await searchInput.press('Enter')

    await expect(page.locator('text=Braun T3 Pocket Radio')).toBeVisible()
    // Items that don't match "Braun" should be hidden
    await expect(page.locator('text=In the Mood for Love')).not.toBeVisible()
  })
})

test.describe('Item detail', () => {
  test('clicking an item card navigates to detail page', async ({ page }) => {
    await page.goto('/')
    await page.locator('text=Braun T3 Pocket Radio').click()
    await expect(page).toHaveURL(/\/item\/1/)
    await expect(page.locator('h1', { hasText: 'Braun T3 Pocket Radio' })).toBeVisible()
  })

  test('detail page shows item content', async ({ page }) => {
    await page.goto('/item/1')
    await expect(page.locator('h1', { hasText: 'Braun T3 Pocket Radio' })).toBeVisible()
    // Tags
    await expect(page.locator('text=industrial design')).toBeVisible()
    await expect(page.getByText('braun', { exact: true })).toBeVisible()
    // Notes
    await expect(page.locator('text=The proportions are perfect')).toBeVisible()
    // Type badge
    await expect(page.getByText('image', { exact: true })).toBeVisible()
  })

  test('detail page shows back link', async ({ page }) => {
    await page.goto('/item/1')
    await expect(page.locator('text=archive')).toBeVisible()
  })

  test('quote detail page shows quote content', async ({ page }) => {
    await page.goto('/item/2')
    await expect(page.locator('blockquote')).toContainText('Good design is as little design as possible')
  })
})

test.describe('Save page', () => {
  test('loads with form fields', async ({ page }) => {
    await page.goto('/save')
    await expect(page.locator('h1', { hasText: 'Save something' })).toBeVisible()
    // Type buttons
    await expect(page.getByRole('button', { name: 'image', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'quote', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'link', exact: true })).toBeVisible()
    // Title field
    await expect(page.getByPlaceholder('What is this?')).toBeVisible()
    // Notes field
    await expect(page.getByPlaceholder('Why does this move you?')).toBeVisible()
    // Submit button
    await expect(page.getByRole('button', { name: 'save to archive' })).toBeVisible()
  })

  test('form submits and new item appears in grid', async ({ page }) => {
    // Use a unique title to avoid collisions with prior runs
    const uniqueTitle = `E2E Test ${Date.now()}`

    await page.goto('/save')
    await page.waitForLoadState('networkidle')

    // Fill out form
    await page.getByPlaceholder('What is this?').fill(uniqueTitle)
    await page.getByPlaceholder('Why does this move you?').fill('Testing saves work.')

    // Submit and wait for navigation
    await page.getByRole('button', { name: 'save to archive' }).click()
    await expect(page).toHaveURL('/', { timeout: 15000 })

    // New item should be visible
    await expect(page.locator(`text=${uniqueTitle}`)).toBeVisible()
  })
})

test.describe('Delete', () => {
  test('delete button removes item and redirects home', async ({ page }) => {
    // Create a disposable item via the save form, then delete it.
    // This avoids depending on any specific mock item surviving prior runs.
    const disposableTitle = `Disposable ${Date.now()}`

    await page.goto('/save')
    await page.waitForLoadState('networkidle')
    await page.getByPlaceholder('What is this?').fill(disposableTitle)
    await page.getByRole('button', { name: 'save to archive' }).click()
    await expect(page).toHaveURL('/', { timeout: 15000 })

    // Click into the newly created item
    await page.locator(`text=${disposableTitle}`).click()
    await expect(page.locator('h1', { hasText: disposableTitle })).toBeVisible()

    // Delete it
    await page.getByRole('button', { name: 'remove' }).click()

    // Should redirect home
    await expect(page).toHaveURL('/', { timeout: 15000 })

    // Deleted item should not be visible
    await expect(page.locator(`text=${disposableTitle}`)).not.toBeVisible()
  })
})
