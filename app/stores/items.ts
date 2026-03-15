import { defineStore } from 'pinia'
import type { Item, ItemType, CreateItemInput } from '../../shared/types'

export const useItemsStore = defineStore('items', () => {
  const items = ref<Item[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Active filters
  const filterType = ref<ItemType | null>(null)
  const filterTag = ref<string | null>(null)
  const searchQuery = ref('')

  async function fetchItems() {
    loading.value = true
    error.value = null

    try {
      const params: Record<string, string> = {}
      if (filterType.value) params.type = filterType.value
      if (filterTag.value) params.tag = filterTag.value
      if (searchQuery.value) params.search = searchQuery.value

      const data = await $fetch('/api/items', { params })
      items.value = data.items
      total.value = data.total
    }
    catch (e) {
      error.value = 'Failed to load items'
    }
    finally {
      loading.value = false
    }
  }

  async function saveItem(input: CreateItemInput) {
    const newItem = await $fetch('/api/items', {
      method: 'POST',
      body: input,
    })
    items.value.unshift(newItem)
    total.value++
    return newItem
  }

  async function deleteItem(id: string) {
    await $fetch(`/api/items/${id}`, { method: 'DELETE' })
    items.value = items.value.filter(i => i.id !== id)
    total.value--
  }

  function setFilter(type: ItemType | null) {
    filterType.value = type
    fetchItems()
  }

  function setTagFilter(slug: string | null) {
    filterTag.value = slug
    fetchItems()
  }

  function setSearch(q: string) {
    searchQuery.value = q
    fetchItems()
  }

  function clearFilters() {
    filterType.value = null
    filterTag.value = null
    searchQuery.value = ''
    fetchItems()
  }

  return {
    items,
    total,
    loading,
    error,
    filterType,
    filterTag,
    searchQuery,
    fetchItems,
    saveItem,
    deleteItem,
    setFilter,
    setTagFilter,
    setSearch,
    clearFilters,
  }
})
