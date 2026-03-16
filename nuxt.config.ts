import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {},
  },

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  devtools: { enabled: true },
  typescript: { strict: true },
})
