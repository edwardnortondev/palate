import { MOCK_ITEMS } from '../../utils/mock-data'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const index = MOCK_ITEMS.findIndex(i => i.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, message: 'Item not found' })
  }

  MOCK_ITEMS.splice(index, 1)
  setResponseStatus(event, 204)
  return null
})
