export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  builder: 'vite',
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxtjs/eslint-module'
  ],

  css: ['@/src/assets/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000/api', // Replace with your base URL
    },
  },
  plugins: ['@/src/lib/axios.ts'],
  compatibilityDate: '2024-12-03',
});