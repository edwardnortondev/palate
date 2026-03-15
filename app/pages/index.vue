<script setup lang="ts">
import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()

useHead({ title: 'Palate — Your taste archive' })
</script>

<template>
  <div>
    <FilterBar />

    <!-- Loading -->
    <div v-if="itemsStore.loading" class="flex justify-center py-24 text-stone-400 text-sm">
      Loading…
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!itemsStore.items.length"
      class="flex flex-col items-center justify-center py-32 text-center"
    >
      <p class="font-serif text-xl text-stone-600 mb-2">Your archive is empty.</p>
      <p class="text-sm text-stone-400 mb-6">Save the things that move you.</p>
      <NuxtLink
        to="/save"
        class="text-sm font-medium px-4 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-700 transition-colors"
      >
        Save something
      </NuxtLink>
    </div>

    <!-- Grid -->
    <ItemGrid v-else :items="itemsStore.items" />
  </div>
</template>
