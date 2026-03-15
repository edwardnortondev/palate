import { MOCK_ITEMS } from '../../utils/mock-data'
import type { Item } from '../../../shared/types'

export default defineEventHandler((event): Item => {
  const id = getRouterParam(event, 'id')
  const item = MOCK_ITEMS.find(i => i.id === id)

  if (!item) {
    throw createError({ statusCode: 404, message: 'Item not found' })
  }

  return item
})
