<script setup lang="ts">
import type { Item } from '../../../shared/types'

const props = defineProps<{ item: Item }>()

const typeLabel: Record<string, string> = {
  image: 'image',
  link: 'link',
  quote: 'quote',
  film: 'film',
  music: 'music',
  place: 'place',
  fashion: 'fashion',
}
</script>

<template>
  <NuxtLink
    :to="`/item/${item.id}`"
    class="group block overflow-hidden"
    style="background-color: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--color-border-default); box-shadow: var(--shadow-xs); transition: box-shadow 100ms ease, border-color 100ms ease;"
    @mouseenter="($event.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; ($event.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-strong)'"
    @mouseleave="($event.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)'; ($event.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-default)'"
  >
    <!-- Image (if present) -->
    <div v-if="item.imageUrl" class="aspect-[4/3] overflow-hidden" style="background-color: var(--color-bg-secondary);">
      <NuxtImg
        :src="item.imageUrl"
        :alt="item.title ?? ''"
        class="w-full h-full object-cover group-hover:scale-[1.02]"
        style="transition: transform 350ms ease; border-radius: var(--radius-xl) var(--radius-xl) 0 0;"
        loading="lazy"
      />
    </div>

    <!-- Quote card (no image) -->
    <div
      v-else-if="item.type === 'quote'"
      class="p-6 min-h-[120px] flex items-center"
      style="background-color: var(--color-bg-secondary);"
    >
      <blockquote class="text-base leading-relaxed" style="color: var(--color-text-secondary);">
        "{{ item.content }}"
      </blockquote>
    </div>

    <!-- Link / Music / other (no image) -->
    <div
      v-else
      class="p-6 min-h-[80px] flex items-center"
      style="background-color: var(--color-bg-secondary);"
    >
      <span class="text-xs font-medium" style="color: var(--color-text-tertiary); letter-spacing: 0.02em;">
        {{ typeLabel[item.type] ?? item.type }}
      </span>
    </div>

    <!-- Meta -->
    <div class="px-4 py-3">
      <p v-if="item.title" class="text-sm font-medium truncate leading-snug" style="color: var(--color-text-primary);">
        {{ item.title }}
      </p>
      <p v-if="item.description" class="text-xs mt-0.5 truncate" style="color: var(--color-text-secondary);">
        {{ item.description }}
      </p>
      <!-- Tags -->
      <div v-if="item.tags.length" class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="tag in item.tags.slice(0, 3)"
          :key="tag.id"
          class="text-xs px-1.5 py-0.5"
          style="color: var(--color-text-tertiary); background-color: var(--color-bg-secondary); border-radius: var(--radius-sm); letter-spacing: 0.02em;"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
