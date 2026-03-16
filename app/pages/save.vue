<script setup lang="ts">
import type { ItemType, CreateItemInput } from '../../shared/types'
import { useItemsStore } from '../stores/items'

useHead({ title: 'Save — Palate' })

const itemsStore = useItemsStore()
const router = useRouter()
const saving = ref(false)
const error = ref<string | null>(null)

const types: { label: string; value: ItemType }[] = [
  { label: 'image', value: 'image' },
  { label: 'link', value: 'link' },
  { label: 'quote', value: 'quote' },
  { label: 'film', value: 'film' },
  { label: 'music', value: 'music' },
  { label: 'place', value: 'place' },
  { label: 'fashion', value: 'fashion' },
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

const inputStyle = 'width: 100%; font-size: 0.875rem; border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; color: var(--color-text-primary); background-color: #FFFFFF; transition: border-color 100ms ease;'
</script>

<template>
  <div class="max-w-lg mx-auto">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-xs mb-8"
      style="color: var(--color-text-tertiary); transition: color 100ms ease;"
      @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-text-primary)'"
      @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-tertiary)'"
    >
      ← archive
    </NuxtLink>

    <h1 class="text-2xl mb-8" style="font-weight: 600; color: var(--color-text-primary); letter-spacing: -0.01em;">
      Save something
    </h1>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Type -->
      <div>
        <label class="block text-xs font-medium mb-2" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          type
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="t in types"
            :key="t.value"
            type="button"
            class="text-xs px-3 py-1.5"
            :style="{
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: form.type === t.value ? 'var(--color-bg-inverse)' : 'var(--color-border-default)',
              backgroundColor: form.type === t.value ? 'var(--color-bg-inverse)' : '#FFFFFF',
              color: form.type === t.value ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
              fontWeight: form.type === t.value ? '500' : '400',
              transition: 'all 100ms ease',
            }"
            @click="form.type = t.value"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          title
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="What is this?"
          :style="inputStyle"
          class="focus:outline-none"
        >
      </div>

      <!-- Quote content (shown only for quote type) -->
      <div v-if="form.type === 'quote'">
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          quote
        </label>
        <textarea
          v-model="form.content"
          rows="3"
          placeholder="The words themselves…"
          :style="inputStyle + ' resize: none;'"
          class="focus:outline-none"
        />
      </div>

      <!-- Image URL -->
      <div v-if="['image', 'film', 'place', 'fashion'].includes(form.type)">
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          image url
        </label>
        <input
          v-model="form.imageUrl"
          type="url"
          placeholder="https://…"
          :style="inputStyle"
          class="focus:outline-none"
        >
      </div>

      <!-- Source URL -->
      <div v-if="form.type !== 'quote'">
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          source url
        </label>
        <input
          v-model="form.sourceUrl"
          type="url"
          placeholder="https://…"
          :style="inputStyle"
          class="focus:outline-none"
        >
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          notes
        </label>
        <textarea
          v-model="form.notes"
          rows="3"
          placeholder="Why does this move you?"
          :style="inputStyle + ' resize: none;'"
          class="focus:outline-none"
        />
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-xs font-medium mb-1.5" style="color: var(--color-text-secondary); letter-spacing: 0.02em;">
          tags
        </label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="form.tagInput"
            type="text"
            placeholder="add a tag…"
            :style="inputStyle + ' flex: 1;'"
            class="focus:outline-none"
            @keydown.enter.prevent="addTag"
          >
          <button
            type="button"
            class="text-sm px-3 py-2"
            style="background-color: var(--color-bg-secondary); color: var(--color-text-secondary); border-radius: var(--radius-md); transition: background-color 100ms ease;"
            @click="addTag"
          >
            add
          </button>
        </div>
        <div v-if="form.tagNames?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in form.tagNames"
            :key="tag"
            class="inline-flex items-center gap-1 text-xs px-2.5 py-1"
            style="background-color: var(--color-bg-secondary); color: var(--color-text-secondary); border-radius: 9999px;"
          >
            {{ tag }}
            <button
              type="button"
              style="color: var(--color-text-tertiary); transition: color 100ms ease;"
              @mouseenter="($event.target as HTMLElement).style.color = 'var(--color-text-primary)'"
              @mouseleave="($event.target as HTMLElement).style.color = 'var(--color-text-tertiary)'"
              @click="removeTag(tag)"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Error -->
      <p v-if="error" class="text-xs" style="color: var(--color-error);">
        {{ error }}
      </p>

      <!-- Submit -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="saving"
          class="text-sm px-5 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          style="font-weight: 500; background-color: var(--color-bg-inverse); color: var(--color-text-inverse); border-radius: var(--radius-md); transition: opacity 100ms ease;"
        >
          {{ saving ? 'saving…' : 'save to archive' }}
        </button>
      </div>
    </form>
  </div>
</template>
