<script setup lang="ts">
import type { Item } from '../../../shared/types'

defineProps<{ items: Item[] }>()
</script>

<template>
  <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
    <div
      v-for="item in items"
      :key="item.id"
      class="break-inside-avoid mb-6"
    >
      <ItemCard :item="item" />
    </div>
  </div>
</template>
