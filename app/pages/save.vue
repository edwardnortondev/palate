<script setup lang="ts">
import type { ItemType, CreateItemInput } from '../../shared/types'
import { useItemsStore } from '../stores/items'

useHead({ title: 'Save — Palate' })

const itemsStore = useItemsStore()
const router = useRouter()
const saving = ref(false)
const error = ref<string | null>(null)

const types: { label: string; value: ItemType }[] = [
  { label: 'Image', value: 'image' },
  { label: 'Link', value: 'link' },
  { label: 'Quote', value: 'quote' },
  { label: 'Film', value: 'film' },
  { label: 'Music', value: 'music' },
  { label: 'Place', value: 'place' },
  { label: 'Fashion', value: 'fashion' },
]

const form = reactive<CreateItemInput & { tagInput: string }>({
  type: 'image',
  title: '',
  description: '',
  imageUrl: '',
  sourceUrl: '',
  content: '',
  notes: '',
  tagNames: [],
  tagInput: '',
})

function addTag() {
  const tag = form.tagInput.trim().toLowerCase()
  if (tag && !form.tagNames!.includes(tag)) {
    form.tagNames!.push(tag)
  }
  form.tagInput = ''
}

function removeTag(tag: string) {
  form.tagNames = form.tagNames!.filter(t => t !== tag)
}

async function handleSubmit() {
  saving.value = true
  error.value = null

  try {
    const { tagInput, ...input } = form
    await itemsStore.saveItem(input)
    router.push('/')
  }
  catch {
    error.value = 'Failed to save. Please try again.'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 mb-8 transition-colors"
    >
      ← Archive
    </NuxtLink>

    <h1 class="font-serif text-2xl text-stone-900 mb-8">
      Save something
    </h1>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Type -->
      <div>
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Type</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="t in types"
            :key="t.value"
            type="button"
            class="text-xs px-3 py-1.5 rounded-full border transition-colors"
            :class="form.type === t.value
              ? 'bg-stone-800 text-stone-50 border-stone-800'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'"
            @click="form.type = t.value"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">
          Title
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="What is this?"
          class="w-full text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
      </div>

      <!-- Quote content (shown only for quote type) -->
      <div v-if="form.type === 'quote'">
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">Quote</label>
        <textarea
          v-model="form.content"
          rows="3"
          placeholder="The words themselves…"
          class="w-full text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 resize-none font-serif"
        />
      </div>

      <!-- Image URL -->
      <div v-if="['image', 'film', 'place', 'fashion'].includes(form.type)">
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">Image URL</label>
        <input
          v-model="form.imageUrl"
          type="url"
          placeholder="https://…"
          class="w-full text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
      </div>

      <!-- Source URL -->
      <div v-if="form.type !== 'quote'">
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">Source URL</label>
        <input
          v-model="form.sourceUrl"
          type="url"
          placeholder="https://…"
          class="w-full text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">Notes</label>
        <textarea
          v-model="form.notes"
          rows="3"
          placeholder="Why does this move you?"
          class="w-full text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 resize-none"
        />
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">Tags</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="form.tagInput"
            type="text"
            placeholder="Add a tag…"
            class="flex-1 text-sm border border-stone-200 rounded-md px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
            @keydown.enter.prevent="addTag"
          >
          <button
            type="button"
            class="text-sm px-3 py-2 bg-stone-100 text-stone-600 rounded-md hover:bg-stone-200 transition-colors"
            @click="addTag"
          >
            Add
          </button>
        </div>
        <div v-if="form.tagNames?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in form.tagNames"
            :key="tag"
            class="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 rounded-full px-2.5 py-1"
          >
            {{ tag }}
            <button
              type="button"
              class="text-stone-400 hover:text-stone-700"
              @click="removeTag(tag)"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Error -->
      <p v-if="error" class="text-xs text-red-500">
        {{ error }}
      </p>

      <!-- Submit -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="saving"
          class="text-sm font-medium px-5 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {{ saving ? 'Saving…' : 'Save to archive' }}
        </button>
      </div>
    </form>
  </div>
</template>
