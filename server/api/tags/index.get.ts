import { MOCK_ITEMS } from '../../utils/mock-data'
import type { TagsResponse } from '../../../shared/types'

export default defineEventHandler((): TagsResponse => {
  const tagMap = new Map<string, { id: string; name: string; slug: string; count: number }>()

  for (const item of MOCK_ITEMS) {
    for (const tag of item.tags) {
      const existing = tagMap.get(tag.slug)
      if (existing) {
        existing.count++
      }
      else {
        tagMap.set(tag.slug, { ...tag, count: 1 })
      }
    }
  }

  const tags = Array.from(tagMap.values())
    .sort((a, b) => b.count - a.count)

  return { tags }
})
