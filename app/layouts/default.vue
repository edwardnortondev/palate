<script setup lang="ts">
import { useItemsStore } from '../stores/items'
import { useTagsStore } from '../stores/tags'

const itemsStore = useItemsStore()
const tagsStore = useTagsStore()

// Seed data on first layout mount
onMounted(() => {
  itemsStore.fetchItems()
  tagsStore.fetchTags()
})
</script>

<template>
  <div class="min-h-screen" style="background-color: var(--color-bg-primary);">
    <AppHeader />
    <main class="mx-auto px-6 py-8" style="max-width: 1120px;">
      <slot />
    </main>
  </div>
</template>
