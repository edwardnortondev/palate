<script setup lang="ts">
import { useItemsStore } from '../../stores/items'

const itemsStore = useItemsStore()
const route = useRoute()

const searchInput = ref('')

function onSearch() {
  itemsStore.setSearch(searchInput.value)
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
      <!-- Wordmark -->
      <NuxtLink to="/" class="font-serif text-lg text-stone-900 tracking-tight shrink-0">
        Palate
      </NuxtLink>

      <!-- Search -->
      <div class="flex-1 max-w-sm">
        <form @submit.prevent="onSearch">
          <input
            v-model="searchInput"
            type="search"
            placeholder="Search your archive…"
            class="w-full text-sm bg-stone-100 border-0 rounded-md px-3 py-1.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
          >
        </form>
      </div>

      <div class="flex-1" />

      <!-- Save button -->
      <NuxtLink
        to="/save"
        class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
      >
        + Save
      </NuxtLink>
    </div>
  </header>
</template>
