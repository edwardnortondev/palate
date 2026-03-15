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
  <div class="min-h-screen bg-stone-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
