import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useItemsStore } from '../../../app/stores/items'
import type { Item, ItemsResponse } from '../../../shared/types'

const mockItems: Item[] = [
  {
    id: '1',
    type: 'image',
    title: 'Test Image',
    tags: [{ id: 't1', name: 'design', slug: 'design' }],
    savedAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    type: 'quote',
    title: 'Test Quote',
    content: 'Less is more',
    tags: [{ id: 't2', name: 'philosophy', slug: 'philosophy' }],
    savedAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
]

describe('items store', () => {
  beforeEach(() => {
    registerEndpoint('/api/items', {
      method: 'GET',
      handler: () => ({
        items: mockItems,
        total: mockItems.length,
        page: 1,
        perPage: 20,
      } satisfies ItemsResponse),
    })

    registerEndpoint('/api/items', {
      method: 'POST',
      handler: () => ({
        id: '99',
        type: 'link',
        title: 'New Link',
        tags: [],
        savedAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-03-01T00:00:00Z',
      } satisfies Item),
    })

    registerEndpoint('/api/items/1', {
      method: 'DELETE',
      handler: () => null,
    })

    // Reset store state
    const store = useItemsStore()
    store.items = []
    store.total = 0
    store.filterType = null
    store.filterTag = null
    store.searchQuery = ''
    store.error = null
  })

  it('fetchItems loads items from API', async () => {
    const store = useItemsStore()
    await store.fetchItems()

    expect(store.items).toHaveLength(2)
    expect(store.total).toBe(2)
    expect(store.items[0].title).toBe('Test Image')
  })

  it('fetchItems sets loading state', async () => {
    const store = useItemsStore()
    expect(store.loading).toBe(false)

    const promise = store.fetchItems()
    expect(store.loading).toBe(true)

    await promise
    expect(store.loading).toBe(false)
  })

  it('saveItem adds item to store', async () => {
    const store = useItemsStore()
    store.items = [...mockItems]
    store.total = mockItems.length

    const result = await store.saveItem({
      type: 'link',
      title: 'New Link',
    })

    expect(result.id).toBe('99')
    expect(store.items[0].id).toBe('99')
    expect(store.total).toBe(3)
  })

  it('deleteItem removes item from store', async () => {
    const store = useItemsStore()
    store.items = [...mockItems]
    store.total = mockItems.length

    await store.deleteItem('1')

    expect(store.items).toHaveLength(1)
    expect(store.items[0].id).toBe('2')
    expect(store.total).toBe(1)
  })

  it('setFilter updates filterType', () => {
    const store = useItemsStore()
    store.setFilter('image')
    expect(store.filterType).toBe('image')
  })

  it('setFilter with null clears filterType', () => {
    const store = useItemsStore()
    store.filterType = 'image'
    store.setFilter(null)
    expect(store.filterType).toBeNull()
  })

  it('setTagFilter updates filterTag', () => {
    const store = useItemsStore()
    store.setTagFilter('design')
    expect(store.filterTag).toBe('design')
  })

  it('setSearch updates searchQuery', () => {
    const store = useItemsStore()
    store.setSearch('test')
    expect(store.searchQuery).toBe('test')
  })

  it('clearFilters resets all filters', () => {
    const store = useItemsStore()
    store.filterType = 'image'
    store.filterTag = 'design'
    store.searchQuery = 'test'

    store.clearFilters()

    expect(store.filterType).toBeNull()
    expect(store.filterTag).toBeNull()
    expect(store.searchQuery).toBe('')
  })
})
