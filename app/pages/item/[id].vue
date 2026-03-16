<script setup lang="ts">
import type { Item } from '../../../shared/types'
import { useItemsStore } from '../../stores/items'

const route = useRoute()
const itemsStore = useItemsStore()
const router = useRouter()

const { data: item, error } = await useFetch<Item>(`/api/items/${route.params.id}`)

useHead(() => ({ title: item.value?.title ? `${item.value.title} — Palate` : 'Palate' }))

async function handleDelete() {
  if (!item.value) return
  await itemsStore.deleteItem(item.value.id)
  router.push('/')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div v-if="error" class="py-24 text-center text-sm" style="color: var(--color-text-tertiary);">
    Item not found.
  </div>

  <div v-else-if="item" class="max-w-2xl mx-auto">
    <!-- Back -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-xs mb-8"
      style="color: var(--color-text-tertiary); transition: color 100ms ease;"
      @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-text-primary)'"
      @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-tertiary)'"
    >
      ← archive
    </NuxtLink>

    <!-- Image -->
    <div
      v-if="item.imageUrl"
      class="overflow-hidden mb-8"
      style="border-radius: var(--radius-lg); background-color: var(--color-bg-secondary);"
    >
      <NuxtImg
        :src="item.imageUrl"
        :alt="item.title ?? ''"
        class="w-full object-cover"
      />
    </div>

    <!-- Quote display -->
    <blockquote
      v-else-if="item.type === 'quote'"
      class="text-2xl leading-relaxed mb-8 pl-6"
      style="color: var(--color-text-primary); border-left: 2px solid var(--color-border-default); font-weight: 400;"
    >
      "{{ item.content }}"
    </blockquote>

    <!-- Meta -->
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1
            v-if="item.title"
            class="text-xl leading-tight"
            style="font-weight: 600; color: var(--color-text-primary); letter-spacing: -0.01em;"
          >
            {{ item.title }}
          </h1>
          <p v-if="item.description" class="text-sm mt-1" style="color: var(--color-text-secondary);">
            {{ item.description }}
          </p>
        </div>

        <!-- Type badge -->
        <span
          class="shrink-0 text-xs font-medium mt-1"
          style="color: var(--color-text-tertiary); letter-spacing: 0.02em;"
        >
          {{ item.type }}
        </span>
      </div>

      <!-- Source link -->
      <a
        v-if="item.sourceUrl"
        :href="item.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-xs underline underline-offset-2 truncate"
        style="color: var(--color-text-tertiary); transition: color 100ms ease;"
        @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-text-secondary)'"
        @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-tertiary)'"
      >
        {{ item.sourceUrl }}
      </a>

      <!-- Notes -->
      <p
        v-if="item.notes"
        class="text-sm leading-relaxed p-4"
        style="color: var(--color-text-secondary); background-color: var(--color-bg-secondary); border-radius: var(--radius-md);"
      >
        {{ item.notes }}
      </p>

      <!-- Tags -->
      <div v-if="item.tags.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          class="text-xs px-3 py-1"
          style="color: var(--color-text-secondary); background-color: var(--color-bg-secondary); border-radius: 9999px; letter-spacing: 0.02em;"
        >
          {{ tag.name }}
        </span>
      </div>

      <!-- Saved date + actions -->
      <div
        class="flex items-center justify-between pt-4"
        style="border-top: 1px solid var(--color-border-default);"
      >
        <span class="text-xs" style="color: var(--color-text-tertiary);">
          Saved {{ formatDate(item.savedAt) }}
        </span>
        <button
          class="text-xs"
          style="color: var(--color-text-tertiary); transition: color 100ms ease;"
          @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-error)'"
          @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-tertiary)'"
          @click="handleDelete"
        >
          remove
        </button>
      </div>
    </div>
  </div>
</template>
