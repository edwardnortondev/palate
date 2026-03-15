import { MOCK_ITEMS } from '../../utils/mock-data'
import type { CreateItemInput, Item } from '../../../shared/types'

export default defineEventHandler(async (event): Promise<Item> => {
  const body = await readBody<CreateItemInput>(event)

  const newItem: Item = {
    id: crypto.randomUUID(),
    type: body.type,
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    sourceUrl: body.sourceUrl,
    content: body.content,
    notes: body.notes,
    tags: (body.tagNames ?? []).map(name => ({
      id: crypto.randomUUID(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    })),
    savedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // In mock mode: prepend to in-memory array
  MOCK_ITEMS.unshift(newItem)

  return newItem
})
