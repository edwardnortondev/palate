<script setup lang="ts">
import type { ItemType } from '../../../shared/types'
import { useItemsStore } from '../../stores/items'
import { useTagsStore } from '../../stores/tags'

const itemsStore = useItemsStore()
const tagsStore = useTagsStore()

const types: { label: string; value: ItemType | null }[] = [
  { label: 'All', value: null },
  { label: 'Images', value: 'image' },
  { label: 'Quotes', value: 'quote' },
  { label: 'Links', value: 'link' },
  { label: 'Films', value: 'film' },
  { label: 'Music', value: 'music' },
  { label: 'Places', value: 'place' },
  { label: 'Fashion', value: 'fashion' },
]
</script>

<template>
  <div class="flex flex-col gap-4 mb-8">
    <!-- Type filters -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="t in types"
        :key="t.label"
        class="text-xs px-3 py-1.5 rounded-full border transition-colors"
        :class="itemsStore.filterType === t.value
          ? 'bg-stone-800 text-stone-50 border-stone-800'
          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'"
        @click="itemsStore.setFilter(t.value)"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- Top tags -->
    <div v-if="tagsStore.tags.length" class="flex flex-wrap gap-2">
      <button
        v-for="tag in tagsStore.tags.slice(0, 12)"
        :key="tag.slug"
        class="text-xs px-2.5 py-1 rounded border transition-colors"
        :class="itemsStore.filterTag === tag.slug
          ? 'bg-stone-800 text-stone-50 border-stone-800'
          : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-stone-400'"
        @click="itemsStore.setTagFilter(itemsStore.filterTag === tag.slug ? null : tag.slug)"
      >
        {{ tag.name }}
        <span class="text-stone-400 ml-0.5">{{ tag.count }}</span>
      </button>
    </div>
  </div>
</template>
