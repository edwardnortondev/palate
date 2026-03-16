import { describe, it, expect, beforeEach } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useTagsStore } from '../../../app/stores/tags'
import type { TagsResponse } from '../../../shared/types'

describe('tags store', () => {
  beforeEach(() => {
    registerEndpoint('/api/tags', {
      method: 'GET',
      handler: () => ({
        tags: [
          { id: 't1', name: 'design', slug: 'design', count: 5 },
          { id: 't2', name: 'architecture', slug: 'architecture', count: 3 },
        ],
      } satisfies TagsResponse),
    })
  })

  it('fetchTags loads tags from API', async () => {
    const store = useTagsStore()
    await store.fetchTags()

    expect(store.tags).toHaveLength(2)
    expect(store.tags[0].name).toBe('design')
    expect(store.tags[0].count).toBe(5)
    expect(store.tags[1].name).toBe('architecture')
  })
})
