<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: navItems } = await useAsyncData('docs-nav', () => {
  return queryCollection('docs').order('title', 'ASC').all()
})

useHead({
  title: page.value?.title ? `${page.value.title} — palate docs` : 'palate docs',
})
</script>

<template>
  <div class="min-h-screen bg-bg-primary text-text-primary">
    <header
      class="sticky top-0 z-10 border-b border-border-default bg-bg-primary/95 backdrop-blur-sm"
    >
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <NuxtLink
          to="/"
          class="text-sm font-medium tracking-tight text-text-secondary hover:text-text-primary"
        >
          palate
        </NuxtLink>
        <span class="text-xs tracking-wide text-text-tertiary">docs</span>
      </div>
    </header>

    <div class="mx-auto flex max-w-6xl gap-10 px-6 py-10">
      <aside class="hidden w-48 shrink-0 md:block">
        <nav class="sticky top-24 space-y-1">
          <NuxtLink
            to="/docs"
            class="block rounded-md px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
            active-class="bg-bg-secondary text-text-primary font-medium"
          >
            overview
          </NuxtLink>
          <template v-if="navItems">
            <NuxtLink
              v-for="item in navItems.filter((i) => i.path !== '/docs')"
              :key="item.path"
              :to="item.path"
              class="block rounded-md px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
              active-class="bg-bg-secondary text-text-primary font-medium"
            >
              {{ item.title?.toLowerCase() }}
            </NuxtLink>
          </template>
        </nav>
      </aside>

      <main class="min-w-0 flex-1">
        <article v-if="page" class="prose-palate">
          <ContentRenderer :value="page" />
        </article>
        <div v-else class="py-20 text-center text-text-tertiary">
          <p class="text-lg">page not found</p>
          <NuxtLink
            to="/docs"
            class="mt-4 inline-block text-sm text-accent hover:text-accent-hover"
          >
            back to docs
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>
