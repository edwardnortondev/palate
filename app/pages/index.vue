<script setup lang="ts">
import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()

useHead({ title: 'Palate — Your taste archive' })
</script>

<template>
  <div>
    <FilterBar />

    <!-- Loading -->
    <div v-if="itemsStore.loading" class="flex justify-center py-24 text-sm" style="color: var(--color-text-tertiary);">
      Loading…
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!itemsStore.items.length"
      class="flex flex-col items-center justify-center py-32 text-center"
    >
      <p class="text-xl mb-2" style="color: var(--color-text-secondary); font-weight: 600; letter-spacing: -0.01em;">
        Your archive is empty.
      </p>
      <p class="text-sm mb-6" style="color: var(--color-text-tertiary);">
        Save the things that move you.
      </p>
      <NuxtLink
        to="/save"
        class="text-sm px-5 py-2"
        style="font-weight: 500; background-color: var(--color-bg-inverse); color: var(--color-text-inverse); border-radius: var(--radius-md); transition: opacity 100ms ease;"
      >
        save something
      </NuxtLink>
    </div>

    <!-- Grid -->
    <ItemGrid v-else :items="itemsStore.items" />
  </div>
</template>
