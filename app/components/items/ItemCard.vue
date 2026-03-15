<script setup lang="ts">
import type { Item } from '../../../shared/types'

const props = defineProps<{ item: Item }>()

const typeLabel: Record<string, string> = {
  image: 'Image',
  link: 'Link',
  quote: 'Quote',
  film: 'Film',
  music: 'Music',
  place: 'Place',
  fashion: 'Fashion',
}
</script>

<template>
  <NuxtLink
    :to="`/item/${item.id}`"
    class="group block bg-white rounded-lg overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all"
  >
    <!-- Image (if present) -->
    <div v-if="item.imageUrl" class="aspect-[4/3] overflow-hidden bg-stone-100">
      <NuxtImg
        :src="item.imageUrl"
        :alt="item.title ?? ''"
        class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Quote card (no image) -->
    <div
      v-else-if="item.type === 'quote'"
      class="p-5 min-h-[120px] flex items-center bg-stone-50"
    >
      <blockquote class="font-serif text-base text-stone-700 leading-relaxed">
        "{{ item.content }}"
      </blockquote>
    </div>

    <!-- Link / Music / other (no image) -->
    <div
      v-else
      class="p-5 min-h-[80px] flex items-center bg-stone-50"
    >
      <span class="text-xs font-medium text-stone-400 uppercase tracking-widest">
        {{ typeLabel[item.type] ?? item.type }}
      </span>
    </div>

    <!-- Meta -->
    <div class="px-4 py-3">
      <p v-if="item.title" class="text-sm font-medium text-stone-800 truncate leading-snug">
        {{ item.title }}
      </p>
      <p v-if="item.description" class="text-xs text-stone-500 mt-0.5 truncate">
        {{ item.description }}
      </p>
      <!-- Tags -->
      <div v-if="item.tags.length" class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="tag in item.tags.slice(0, 3)"
          :key="tag.id"
          class="text-xs text-stone-400 bg-stone-100 rounded px-1.5 py-0.5"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
