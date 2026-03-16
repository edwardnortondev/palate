import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/unit/**/*.test.ts'],
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    coverage: {
      provider: 'v8',
      include: ['app/**/*.{ts,vue}', 'server/**/*.ts', 'shared/**/*.ts'],
      exclude: ['app/app.vue', 'app/layouts/**', '**/*.d.ts'],
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
    },
  },
})
