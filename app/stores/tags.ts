import { defineStore } from 'pinia'
import type { Tag } from '../../shared/types'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref<Tag[]>([])

  async function fetchTags() {
    const data = await $fetch('/api/tags')
    tags.value = data.tags
  }

  return { tags, fetchTags }
})
