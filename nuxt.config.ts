export default defineNuxtConfig({
  // app: {
  //   pageTransition: {
  //     name: 'fade',
  //     mode: 'out-in' // default
  //   },
  //   layoutTransition: {
  //     name: 'slide',
  //     mode: 'out-in' // default
  //   }
  // },
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
  ],
  plugins: [
    '@/src/lib/axios.ts',
    '@/src/lib/gsap.ts',
  ],
  css: ['@/src/assets/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000/api', // Replace with your base URL
    },
  },
  compatibilityDate: '2024-12-03',
});