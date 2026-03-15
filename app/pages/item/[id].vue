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
  <div v-if="error" class="py-24 text-center text-stone-400 text-sm">
    Item not found.
  </div>

  <div v-else-if="item" class="max-w-2xl mx-auto">
    <!-- Back -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 mb-8 transition-colors"
    >
      ← Archive
    </NuxtLink>

    <!-- Image -->
    <div v-if="item.imageUrl" class="rounded-lg overflow-hidden mb-8 bg-stone-100">
      <NuxtImg
        :src="item.imageUrl"
        :alt="item.title ?? ''"
        class="w-full object-cover"
      />
    </div>

    <!-- Quote display -->
    <blockquote
      v-else-if="item.type === 'quote'"
      class="font-serif text-2xl text-stone-800 leading-relaxed mb-8 border-l-2 border-stone-200 pl-6"
    >
      "{{ item.content }}"
    </blockquote>

    <!-- Meta -->
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 v-if="item.title" class="text-xl font-medium text-stone-900 leading-tight">
            {{ item.title }}
          </h1>
          <p v-if="item.description" class="text-sm text-stone-500 mt-1">
            {{ item.description }}
          </p>
        </div>

        <!-- Type badge -->
        <span class="shrink-0 text-xs uppercase tracking-widest text-stone-400 font-medium mt-1">
          {{ item.type }}
        </span>
      </div>

      <!-- Source link -->
      <a
        v-if="item.sourceUrl"
        :href="item.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 truncate transition-colors"
      >
        {{ item.sourceUrl }}
      </a>

      <!-- Notes -->
      <p v-if="item.notes" class="text-sm text-stone-600 leading-relaxed bg-stone-50 rounded-md p-4">
        {{ item.notes }}
      </p>

      <!-- Tags -->
      <div v-if="item.tags.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          class="text-xs text-stone-500 bg-stone-100 rounded-full px-3 py-1"
        >
          {{ tag.name }}
        </span>
      </div>

      <!-- Saved date + actions -->
      <div class="flex items-center justify-between pt-4 border-t border-stone-100">
        <span class="text-xs text-stone-400">
          Saved {{ formatDate(item.savedAt) }}
        </span>
        <button
          class="text-xs text-stone-400 hover:text-red-500 transition-colors"
          @click="handleDelete"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
