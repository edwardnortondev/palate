import { MOCK_ITEMS } from '../../utils/mock-data'
import type { ItemsResponse } from '../../../shared/types'

export default defineEventHandler((event): ItemsResponse => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 20
  const type = query.type as string | undefined
  const tag = query.tag as string | undefined
  const search = query.search as string | undefined

  let items = [...MOCK_ITEMS]

  if (type) {
    items = items.filter(item => item.type === type)
  }

  if (tag) {
    items = items.filter(item => item.tags.some(t => t.slug === tag))
  }

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(item =>
      item.title?.toLowerCase().includes(q)
      || item.description?.toLowerCase().includes(q)
      || item.content?.toLowerCase().includes(q)
      || item.notes?.toLowerCase().includes(q)
      || item.tags.some(t => t.name.toLowerCase().includes(q)),
    )
  }

  const total = items.length
  const start = (page - 1) * perPage
  const paginated = items.slice(start, start + perPage)

  return { items: paginated, total, page, perPage }
})
