<script setup lang="ts">
import type { ItemType } from '../../../shared/types'
import { useItemsStore } from '../../stores/items'
import { useTagsStore } from '../../stores/tags'

const itemsStore = useItemsStore()
const tagsStore = useTagsStore()

const types: { label: string; value: ItemType | null }[] = [
  { label: 'all', value: null },
  { label: 'images', value: 'image' },
  { label: 'quotes', value: 'quote' },
  { label: 'links', value: 'link' },
  { label: 'films', value: 'film' },
  { label: 'music', value: 'music' },
  { label: 'places', value: 'place' },
  { label: 'fashion', value: 'fashion' },
]
</script>

<template>
  <div class="flex flex-col gap-4 mb-8">
    <!-- Type filters -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="t in types"
        :key="t.label"
        class="text-xs px-3 py-1.5"
        :style="{
          borderRadius: 'var(--radius-md)',
          border: '1px solid',
          borderColor: itemsStore.filterType === t.value ? 'var(--color-bg-inverse)' : 'var(--color-border-default)',
          backgroundColor: itemsStore.filterType === t.value ? 'var(--color-bg-inverse)' : '#FFFFFF',
          color: itemsStore.filterType === t.value ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
          fontWeight: itemsStore.filterType === t.value ? '500' : '400',
          transition: 'all 100ms ease',
        }"
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
        class="text-xs px-2.5 py-1"
        :style="{
          borderRadius: 'var(--radius-sm)',
          border: '1px solid',
          borderColor: itemsStore.filterTag === tag.slug ? 'var(--color-bg-inverse)' : 'var(--color-border-default)',
          backgroundColor: itemsStore.filterTag === tag.slug ? 'var(--color-bg-inverse)' : 'var(--color-bg-primary)',
          color: itemsStore.filterTag === tag.slug ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
          fontWeight: itemsStore.filterTag === tag.slug ? '500' : '400',
          transition: 'all 100ms ease',
          letterSpacing: '0.02em',
        }"
        @click="itemsStore.setTagFilter(itemsStore.filterTag === tag.slug ? null : tag.slug)"
      >
        {{ tag.name }}
        <span style="color: var(--color-text-tertiary); margin-left: 2px;">{{ tag.count }}</span>
      </button>
    </div>
  </div>
</template>
