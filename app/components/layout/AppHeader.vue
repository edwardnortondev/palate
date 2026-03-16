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
  <header
    class="sticky top-0 z-50 backdrop-blur-sm"
    style="background-color: rgba(245, 243, 240, 0.9); border-bottom: 1px solid var(--color-border-default);"
  >
    <div class="mx-auto px-6 h-14 flex items-center gap-6" style="max-width: 1120px;">
      <!-- Wordmark -->
      <NuxtLink
        to="/"
        class="text-base shrink-0"
        style="font-weight: 600; color: var(--color-text-primary); letter-spacing: -0.01em;"
      >
        palate
      </NuxtLink>

      <!-- Search -->
      <div class="flex-1 max-w-sm">
        <form @submit.prevent="onSearch">
          <input
            v-model="searchInput"
            type="search"
            placeholder="search your archive…"
            class="w-full text-sm px-3 py-1.5 focus:outline-none"
            style="background-color: var(--color-bg-secondary); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); color: var(--color-text-primary); transition: border-color 100ms ease;"
          >
        </form>
      </div>

      <div class="flex-1" />

      <!-- Save button -->
      <NuxtLink
        to="/save"
        class="text-sm"
        style="font-weight: 500; color: var(--color-text-secondary); transition: color 100ms ease;"
        @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-text-primary)'"
        @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-secondary)'"
      >
        + save
      </NuxtLink>
    </div>
  </header>
</template>
